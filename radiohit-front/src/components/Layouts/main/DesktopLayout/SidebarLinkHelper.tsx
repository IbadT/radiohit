"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";

const SidebarLinkHelper = ({ url, title, icon, onClick }) => {
  const pathname = usePathname();

  //Check if link active
  const activeLink = (url: string, pathname: string) => {
    if (url.length > 2 && pathname.includes(url))
      return "text-mainAccent border-r-[3px] bg-fuchsia-50 rounded-l-xl";
    if (url.length == 1 && pathname.length == 1)
      return "text-mainAccent border-r-[3px] bg-fuchsia-50 rounded-l-xl";
    return "hover:translate-x-[4px] hover:bg-fuchsia-50 mr-[2rem] rounded-xl text-[#575759]";
  };

  return (
    <Link
      onClick={onClick}
      scroll={false}
      href={`${url}`}
      className={`font-[400] flex flex-row items-center text-[1rem] px-[10px] py-[4px] my-[4px] transition-all duration-300 hover:text-mainAccent border-r-mainAccent 
      ${activeLink(url, pathname)} 
    `}
    >
      <span className="pr-[0.5rem] ">{icon}</span>
      {title}
    </Link>
  );
};

export default SidebarLinkHelper;
