import GlobalFullLogo from "@/components/Logo/GlobalFullLogo";
import Link from "next/link";
import MobileMenu from "@/components/Layouts/main/MobileLayout/MobileMenu";
import DynamicMobileButtons from "@/components/Layouts/main/MobileLayout/DynamicMobileButtons";

const MobileHeader = () => {
  return (
    <header className="bg-white rounded-b-2xl h-[65px] z-[5] relative">
      <div className="fixed w-full z-[1]">
        <div className="bg-white rounded-b-2xl h-[65px] px-[1rem] min-[1000px]:max-[1200px]:px-[1rem] flex flex-row justify-between items-center align-middle justify-center">
        <MobileMenu />
          <Link href="/" scroll={false}>
            <GlobalFullLogo classnames="w-[8.5rem] relative top-[-1px]" />
          </Link>
          <div className='w-[38px] h-[38px]'>
          <DynamicMobileButtons />
          </div>
        </div>
      </div>
    </header>
  );
};
export default MobileHeader;
