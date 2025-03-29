import { NextRequest, NextResponse } from "next/server";

import {Client, Users, Databases} from "node-appwrite";
import { ServerConfig } from "@/lib/utils/server_config";

const client = new Client();
const users = new Users(client);
const database = new Databases(client);


client
  .setEndpoint(ServerConfig.endpoint)
  .setProject(ServerConfig.project)
  .setKey(process.env.SERVER_MAIN_API_KEY);

// Delete User from project by user id
export async function DELETE(req: NextRequest, props: { params: Promise<{ userId: string; }> }) {
  const params = await props.params;
  try {
    //Get user id
    const { userId } = params;

    // Check if user exists
    const userDoc = await database.getDocument(process.env.SERVER_DATABASE_ID, process.env.SERVER_USERS_COLLECTION_ID, userId);
    if(!userDoc) {
      return NextResponse.json({'User document': 'not found'});
    }

    //Check if user may perform this action
    const adminUserID = req.cookies.get('userId')?.value;
    if(!adminUserID) {
      return NextResponse.json({'Permission denied': 'unauthorized'});
    }

    const adminUserDoc = await database.getDocument(process.env.SERVER_DATABASE_ID, process.env.SERVER_USERS_COLLECTION_ID, adminUserID);
    if(!adminUserDoc) {
      return NextResponse.json({'Permission denied': 'unauthorized'});
    }

    // @ts-ignore
    if(adminUserDoc.role !== 'radiohitadmin') {
      return NextResponse.json({'Permission denied': 'unauthorized'});
    }


    // Delete user
    await users.delete(userId);

    return NextResponse.json({'deleted': true});
  } catch (e) {
    console.log(e)
  }
}