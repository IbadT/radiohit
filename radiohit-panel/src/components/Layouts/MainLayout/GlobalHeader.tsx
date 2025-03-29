import MainSearch from "@/components/Serach/HeaderSearch/MainSearch";
import HeaderElements from "@/components/Layouts/MainLayout/HeaderElements";

const GlobalHeader = () => {
  return (
      <header className='px-[1.5rem] pt-[1.5rem] bg-layoutBG overflow-hidden'>
        <div className="flex flex-row justify-between px-[1.5rem] py-[0.8rem] items-center bg-white rounded-xl border-[1px] border-mainBorderColor">
          <div className="w-full justify-start">
            <MainSearch />
          </div>
          <div className="flex flex-row items-center">

            <HeaderElements/>
          </div>
        </div>
      </header>
  );
};
export default GlobalHeader;
