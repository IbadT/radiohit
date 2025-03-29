import HomePageInner from "@/components/Pages/HomePage/HomePageInner";
import {Suspense} from "react";
import { headers } from 'next/headers';
import HomeLoadingSkeleton from "@/components/LoadingSkeletons/Home/HomeLoadingSkeleton";

export const revalidate = 60

const Home = async () => {
  const headersList = await headers();
    //Get device user-agent info
    const userAgent = headersList.get("user-agent");

    //Check if its mobile device
    const isMobileView = userAgent!.match(
        /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
    );
  return (
    <div className="flex flex-col w-full h-full">
      <div className="w-full">
        <Suspense fallback={<HomeLoadingSkeleton/>}>
          <HomePageInner isMobileView={isMobileView}/>
        </Suspense>
      </div>
    </div>
  );
}
export default Home
