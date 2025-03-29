import Link from "next/link";
import { Heart } from "lucide-react";
import * as React from "react";

const AccountNoFavoriteTracksShortCard = () => {
  return (
    <>
      <div className="flex flex-col bg-white border-[1px] border-mainBorderColor rounded-2xl p-[1rem] mt-[1rem] max-lg:mt-0 max-lg:flex-col max-lg:mt-[1rem]  max-md:mt-[1rem]">
        <div className="flex flex-row items-center justify-between mb-[1rem]">
          <p className="text-[#39383A] font-[500] text-[1.2rem] lg:pl-[0.5rem]">
            Избранные треки
          </p>
          <Link
              scroll={false}
            href="/account/favorites"
            className="text-[0.9rem] text-[#A8A8A8] transition-colors duration-300 hover:text-mainAccent items-center flex lg:pr-[0.5rem] max-md:hidden"
          >
            Весь список избранного
          </Link>
        </div>

        <div className="w-full h-[30vh] max-md:h-[50vh] text-slate-400 flex flex-col items-center justify-center align-middle bg-white">
          <Heart size={50} strokeWidth={2} />
          <p className="font-[400] text-[1.2rem] lg:pl-[0.5rem] mt-[1rem]">
            Нет избранных треков
          </p>
        </div>
      </div>
    </>
  );
};
export default AccountNoFavoriteTracksShortCard;
