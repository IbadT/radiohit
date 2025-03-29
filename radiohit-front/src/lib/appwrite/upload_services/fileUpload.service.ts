import { ID, Permission, UploadProgress, Role } from "appwrite";
import appwriteSDKProvider from "@/lib/appwrite/common/appwrite.client";

const { storage } = appwriteSDKProvider;

//Upload file to storage
export async function uploadFileToBucket(
  bucketId: string,
  senderId: string,
  file: File,
  onProgress?: (progress: UploadProgress) => void
) {
  try {
    return await storage?.createFile(
      bucketId,
      ID.unique(),
      file,
      [Permission.write(Role.user(senderId)), Permission.read(Role.any())],
      onProgress
    );
  } catch (error) {
    return console.log(error);
  }
}

//Upload file to storage without permissions
export async function uploadFileToBucketAnonymous(
    bucketId: string,
    file: File,
    onProgress?: (progress: UploadProgress) => void
) {
  try {
    return await storage?.createFile(
        bucketId,
        ID.unique(),
        file,
        [Permission.read(Role.any())],
        onProgress
    );
  } catch (error) {
    return console.log(error);
  }
}
