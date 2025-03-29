import appwriteSDKProvider from "@/lib/appwrite/common/appwrite.client";
import { ServerConfig } from "@/lib/utils/server_config";

const { account, database } = appwriteSDKProvider;

export async function loginUser(email: string, password: string): Promise<any> {
  try {
    return await account.createEmailPasswordSession(email, password);
  } catch (error) {
    console.log("Login error: ", error.message);
  }
}

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

export function logoutUser(): Promise<any> {
  return account.deleteSession("current");
}
