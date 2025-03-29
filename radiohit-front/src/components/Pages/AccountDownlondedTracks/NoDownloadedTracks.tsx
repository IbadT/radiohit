import {Download,} from "lucide-react";


const NoDownloadedTracks = () => {
    return (
        <div className="text-slate-400 flex flex-col items-center justify-center align-middle bg-white border-[1px] border-mainBorderColor rounded-2xl p-[1rem] mt-[1rem] max-md:mt-[0] max-md:mb-0 max-lg:mt-0 max-lg:flex-col max-lg:mt-[1rem] mb-[1.5rem] h-[70vh]">
            <Download size={50} strokeWidth={2} />
            <p className="font-[400] text-[1.2rem] lg:pl-[0.5rem] mt-[1rem]">
                Нет скачанных треков
            </p>
        </div>
    );
}
export default NoDownloadedTracks
