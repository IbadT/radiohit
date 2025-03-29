import MainSearch from "@/components/Search/MainSearch";
import DynamicHeaderButtons from "@/components/Layouts/main/DesktopLayout/DynamicHeaderButtons";
import BreadCrumbsGlobal from "@/components/BreadCrumbs/BreadCrumbs";
import { Separator } from "@/components/ui/Separator/separator";

const DesktopHeader = () => {
    return (
        <header className="border-b-[1px] border-b-mainBorderColor bg-white">
            <div className="flex flex-row justify-between px-[1.5rem] py-[1.5rem] items-center">

                <div className="w-full flex flex-row justify-between items-center">
                    <BreadCrumbsGlobal />
                    <MainSearch buttonVariant={'searchAlternative'}/>
                </div>

                <div className="flex flex-row justify-end items-center">
                    <Separator
                        orientation="vertical"
                        className="mx-[1.8rem] h-10 w-[2px] bg-gray-200"
                    />
                    <DynamicHeaderButtons />
                </div>
            </div>
        </header>
    );
};
export default DesktopHeader;



