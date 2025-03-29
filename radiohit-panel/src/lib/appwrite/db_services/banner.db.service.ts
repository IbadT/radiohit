import appwriteSDKProvider from "@/lib/appwrite/common/appwrite.client";
import { ServerConfig } from "@/lib/utils/server_config";

const { database } = appwriteSDKProvider;

/*
  Get Home Banner
 */
export async function getHomeBanner() {
  return await database.getDocument(
    ServerConfig.dbID,
    ServerConfig.sliderPostersCollectionID,
    "64c8471e3443a10d0c2a"
  );
}


/*
  Update Home Banner
 */
export async function updateHomeBanner(
  posterTitle: string,
  posterTopSubtitle: string,
  posterBottomSubtitle: string,
  titleColor: string,
  topSubtitleColor: string,
  bottomSubtitleColor: string,
  posterTargetURL: string,
  imageID: string,
  imageURL: string
) {
  return await database.updateDocument(
    ServerConfig.dbID,
    ServerConfig.sliderPostersCollectionID,
    "64c8471e3443a10d0c2a",
    {
      posterImageURL: imageURL,
      posterImageID: imageID,
      posterTitle: posterTitle,
      posterTargetURL: posterTargetURL,
      posterTopSubtitle: posterTopSubtitle,
      posterBottomSubtitle: posterBottomSubtitle,
      topSubtitleColor: topSubtitleColor,
      bottomSubtitleColor: bottomSubtitleColor,
      titleColor: titleColor,
    }
  );
}
