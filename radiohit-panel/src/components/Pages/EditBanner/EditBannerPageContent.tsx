import { cn } from "@/lib/utils/utils";
import { MoveRight } from "lucide-react";
import React from "react";
import EditBannerPageContentInner from "@/components/Pages/EditBanner/EditBannerPageContentInner";
import {getHomeBanner} from "@/lib/appwrite/db_services/banner.db.service";

const EditBannerPageContent = async () => {
    const poster = await getHomeBanner();

    return (
    <div className="w-full h-full flex flex-col">
      {/*Page Header*/}
      <div className="flex flex-row w-full items-center justify-between">
        <p className="font-[500] text-[1.4rem] pl-[0.5rem]">Редактировать баннер</p>
        <a
          href="https://radiohit.by"
          target='_blank'
          className={cn(
            "flex flex-row items-center gap-[0.5rem] text-gray-500 text-[0.9rem] transition-colors duration-300 hover:text-fuchsia-700"
          )}
        >
          Баннер на главной
          <MoveRight strokeWidth={1.5} size={18} />
        </a>
      </div>

      {/*Page Content*/}
      <div className="w-full mt-[1.2rem]">
            <EditBannerPageContentInner poster={poster}/>
      </div>
    </div>
  );
};
export default EditBannerPageContent;
