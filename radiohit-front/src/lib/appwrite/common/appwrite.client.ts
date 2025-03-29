import { Account, Client as Appwrite, Databases, Storage } from "appwrite";
import { ServerConfig } from "@/lib/utils/server_config";

interface AppwriteClient {
    account: Account;
    database: Databases;
    storage?: Storage;
    client: Appwrite;
}

interface AppwriteSDK {
    sdk: AppwriteClient | null;
    provider: () => AppwriteClient;
}

const appwriteSDK: AppwriteSDK = {
    sdk: null,

    provider: () => {
        if (appwriteSDK.sdk) {
            return appwriteSDK.sdk;
        }
        const appwrite = new Appwrite();
        appwrite.setEndpoint(ServerConfig.endpoint).setProject(ServerConfig.project);
        const account = new Account(appwrite);
        const database = new Databases(appwrite);
        const storage = new Storage(appwrite);

        appwriteSDK.sdk = { client: appwrite, account, database, storage };
        return appwriteSDK.sdk;
    },
};

const appwriteSDKProvider = appwriteSDK.provider();

export default appwriteSDKProvider;
