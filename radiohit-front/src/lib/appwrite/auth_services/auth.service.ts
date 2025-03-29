import { ID } from "appwrite";
import appwriteSDKProvider from "@/lib/appwrite/common/appwrite.client";
import { ServerConfig } from "@/lib/utils/server_config";

//Provider
const { account, database } = appwriteSDKProvider;

//Register User
export function registerUser(
  email: string,
  password: string,
  name: string
): Promise<any> {
  try {
    return account.create(ID.unique(), email, password, name);
  } catch (error) {
    console.log("Register error: ", error.message);
  }
}

//Login existing user
export async function loginUser(email: string, password: string): Promise<any> {
  try {
    return await account.createEmailPasswordSession(email, password);
  } catch (error) {
    console.log("Login error: ", error.message);
  }
}

//Get user account
export async function getUserAccount() {
  try {
    return await account.get()
  } catch (error){
    console.log(error.message)
  }
}

//Get current user info
export async function getCurrentUser() {
  try {
    const userAccount = await account.get();
    const currentUserID = userAccount.$id;

    //Get user document
    const userDoc = await database.getDocument(
      ServerConfig.dbID,
      ServerConfig.usersCollectionID,
      currentUserID
    );
    return {
      userDocument: userDoc,
      userAccount: userAccount,
    };
  } catch (error) {
    console.log("Get user info error: ", error.message);
  }
}

//Delete current user session
export function logoutUser(): Promise<any> {
  return account.deleteSession("current");
}

//Update username by user
export function updateName(name: string): Promise<any> {
  return account.updateName(name);
}

//Get all user sessions list
export function getSessionsList() {
  return account.listSessions()
}

//Update user password
export function updatePassword(
  newPassword: string,
  oldPassword: string
): Promise<any> {
  return account.updatePassword(newPassword, oldPassword);
}
