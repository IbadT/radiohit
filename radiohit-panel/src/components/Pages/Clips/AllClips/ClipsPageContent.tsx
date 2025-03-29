import Link from "next/link";
import {buttonVariants} from "@/components/Buttons/Button";
import {cn} from "@/lib/utils/utils";
import {Plus} from "lucide-react";
import ClipsPageQuery from "@/components/Pages/Clips/AllClips/ClipsPageQuery";

const ClipsPageContent = () => {
    return (
        <div className='w-full h-full flex flex-col'>
            {/*Page Header*/}
            <div className='flex flex-row w-full items-center justify-between'>
                <p className='font-[500] text-[1.4rem] pl-[0.5rem]'>Все клипы</p>
                <Link href='/clips/add-new-clip' className={cn(buttonVariants({variant: 'topPageButtonAlternative'}), 'flex flex-row items-center gap-[0.5rem]')}>Добавить клип <Plus strokeWidth={1.5} size={20}/></Link>
            </div>

            {/*Page Content*/}
            <div className='w-full mt-[1.2rem]'>
                    <ClipsPageQuery/>
            </div>
        </div>
    )
}
export default ClipsPageContent
