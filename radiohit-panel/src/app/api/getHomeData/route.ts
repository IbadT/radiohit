import { NextResponse } from "next/server";
import { Query, Client, Users, Databases } from "node-appwrite";
import { ServerConfig } from "@/lib/utils/server_config";

const client = new Client();
const users = new Users(client);
const database = new Databases(client);

client
  .setEndpoint(ServerConfig.endpoint)
  .setProject(ServerConfig.project)
  .setKey(process.env.SERVER_MAIN_API_KEY);

//Get all users from users collection by loop through collection
async function getAllUsersLoop() {
  let allUsersDataArray = [];
  let continueFetch = true;

  let lastCursor = "";

  try {
    for (; continueFetch;) {
      if (lastCursor == "") {
        await database
          .listDocuments(ServerConfig.dbID, ServerConfig.usersCollectionID, [
            Query.offset(0),
            Query.limit(100),
            Query.notEqual("role", "radiohitAdmin")
          ])
          .then((res) => {
            allUsersDataArray.push(res);
            lastCursor = res.documents.at(res.documents.length - 1).$id;
          });
      } else {
        await database
          .listDocuments(ServerConfig.dbID, ServerConfig.usersCollectionID, [
            Query.cursorAfter(lastCursor),
            Query.limit(100),
            Query.notEqual("role", "radiohitAdmin")
          ])
          .then((res) => {
            allUsersDataArray.push(res);
            lastCursor = res.documents.at(res.documents.length - 1).$id;
          });
      }
    }
  } catch (error) {
    continueFetch = false;
    return allUsersDataArray;
  }
}

export async function GET(req: Request) {
  try {
    //Get current days in month
    const date = new Date();
    const currentMonth = date.getMonth();
    const currentYear = date.getFullYear();
    const limitDays = new Date(currentYear, currentMonth + 1, 0).getDate();

    const monthWithZero = date.toLocaleDateString("ru-RU", {
      month: "2-digit"
    });

    const queryToFindUsersByMonth = `${currentYear}-${monthWithZero}`;
    //   const queryToFindUsersByMonth = `2023-05`;

    //Get Users for last month
    const usersForLastMonth = await users.list([
      Query.limit(limitDays),
      Query.orderAsc("$createdAt"),
      Query.startsWith("$createdAt", queryToFindUsersByMonth)
    ]);

    //Get top Songs
    const topSongs = await database.listDocuments(
      ServerConfig.dbID,
      ServerConfig.songsCollectionID,
      [
        Query.limit(5),
        Query.equal("isApproved", true),
        Query.orderDesc("trackPopularity")
      ]
    );

    //Get top Artists
    const topArtists = await database.listDocuments(
      ServerConfig.dbID,
      ServerConfig.usersCollectionID,
      [
        Query.limit(5),
        Query.equal("role", "artist"),
        Query.orderDesc("artistRating")
      ]
    );

    //Get Songs that need moderation
    const songsNeedModeration = await database.listDocuments(
      ServerConfig.dbID,
      ServerConfig.songsCollectionID,
      [
        Query.offset(0),
        Query.limit(20),
        Query.equal("alreadyModerated", false),
        Query.equal("isSuggested", false),
        Query.orderDesc("$createdAt")
      ]
    );

    //Get Suggested Songs that need moderation
    const suggestedSongsNeedModeration = await database.listDocuments(
      ServerConfig.dbID,
      ServerConfig.songsCollectionID,
      [
        Query.offset(0),
        Query.limit(20),
        Query.equal("alreadyModerated", false),
        Query.equal("isSuggested", true),
        Query.orderDesc("$createdAt")
      ]
    );

    //Radio users top by downloads
    const radioUsersTopByDownloads = await database.listDocuments(
      ServerConfig.dbID,
      ServerConfig.usersCollectionID,
      [
        Query.limit(limitDays),
        Query.equal("role", "radio"),
        Query.orderAsc("downloadTracksID")
      ]
    );

    //Top songs by downloads
    const topSongsByDownloads = await database.listDocuments(
      ServerConfig.dbID,
      ServerConfig.songsCollectionID,
      [
        Query.orderAsc("whoDownloadIDandDateTime"),
        Query.equal("isApproved", true),
        Query.limit(limitDays)
      ]
    );

    //Get storage system status
    const storageSystemStatus = await fetch(
      "https://api.radiohit.by/v1/storage/buckets/6745e40b000208e6b501"
    )
      .then((res) => res.json())
      .then((data) => {
        return data.code !== 401;
      });

    //Get database system
    const databaseSystemStatus = await fetch(
      "https://api.radiohit.by/v1/databases/6745a44e0026f7000fd7"
    )
      .then((res) => res.json())
      .then((data) => {
        return data.code !== 401;
      });

    //Get database system
    const functionsSystemStatus = await fetch(
      "https://api.radiohit.by/v1/functions/"
    )
      .then((res) => res.json())
      .then((data) => {
        return data.code !== 401;
      });

    //All users in users collection
    const allUsersInUsersCollection = await getAllUsersLoop();

    return NextResponse.json({
      allUsersInUsersCollection,
      usersForLastMonth,
      topSongsByDownloads,
      radioUsersTopByDownloads,
      songsNeedModeration,
      suggestedSongsNeedModeration,
      topArtists,
      topSongs,
      limitDays,
      storageSystemStatus,
      databaseSystemStatus,
      functionsSystemStatus
    });
  } catch (err) {
    console.log(err.message);
    return NextResponse.json({ message: err.message, success: false });
  }
}
