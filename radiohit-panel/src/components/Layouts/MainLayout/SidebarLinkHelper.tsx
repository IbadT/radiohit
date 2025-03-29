"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";

const SidebarLinkHelper = ({ url, title, icon }) => {
  const pathname = usePathname();

  //Check if link active
  const activeLink = (url: string, pathname: string) => {
    if (url.length > 2 && pathname.includes(url))
      return "text-mainAccent bg-fuchsia-50 rounded-xl mr-[1rem] border-[1px] !border-fuchsia-300";
    if (url.length == 1 && pathname.length == 1)
      return "text-mainAccent bg-fuchsia-50 rounded-xl mr-[1rem] border-[1px] !border-fuchsia-300";
    return "hover:bg-fuchsia-50 mr-[1rem] rounded-xl text-[#747474] hover:text-mainAccent";
  };

  return (
      <Link
          scroll={false}
          href={`${url}`}
          className={`font-[400] flex flex-row items-center text-[1rem] pl-[15px] py-[10px] transition-all duration-300 hover:text-mainAccent border-[1px] border-white max-[1400px]:text-[0.9rem]
      ${activeLink(url, pathname)} 
    `}
      >
        <span className="pr-[0.5rem]">{icon}</span>
        {title}
      </Link>
  );
};

export default SidebarLinkHelper;
