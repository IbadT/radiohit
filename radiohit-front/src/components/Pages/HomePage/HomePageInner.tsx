import HomeSlider from "@/components/Pages/HomePage/HomeSlider";
import HomePopularTracksCard from "@/components/Pages/HomePage/HomePopularTracksCard";
import HomeLastNews from "@/components/Pages/HomePage/HomeLastNews";
import ScrollToTop from "@/components/ui/ScrollToTop/ScrollToTop";
import RadioBannerCard from "@/components/Cards/RadioBannerCards/RadioHitBannerCard";
// import { getTopArtists } from "@/lib/appwrite/db_services/artists.db.service";
import {
  getHomeSliderPosters,
  getLastClips,
  // getLastEvents,
  getLastNews,
  getTopSongs,
} from "@/lib/appwrite/db_services/home.db.service";
import HomeLastClipsCard from "@/components/Pages/HomePage/HomeLastClipsCard";
import HomeSuggestSongCard from "@/components/Pages/HomePage/HomeSuggestSongCard";
import SuperFmBannerCard from "@/components/Cards/RadioBannerCards/SuperFmBannerCard";
import DushevnoeRadioBannerCard from "@/components/Cards/RadioBannerCards/DushevnoeRadioBannerCard";

const HomePageInner = async ({ isMobileView }) => {
  //Get initial page data
  // const artistsData = await getTopArtists(6);
  const lastNews = await getLastNews(3);
  const poster = await getHomeSliderPosters();
  const popularSongs = await getTopSongs(10);
  // const lastEvents = await getLastEvents(5);
  const lastClips = await getLastClips(5);

  return (
    <>
      <ScrollToTop />
      <div className="flex flex-col w-full h-full">
        {/*Home content*/}
        <div className="lg:pt-[0.2rem] mb-[1.8rem]">
          {/*Home slider*/}
          <HomeSpacingWrapper>
            <HomeSlider poster={poster} />
          </HomeSpacingWrapper>

          {/*Radiohit Radio Card (display only on mobile devices)*/}
          <HomeSpacingWrapper>
            {isMobileView && <RadioBannerCard />}
          </HomeSpacingWrapper>

          {/*SuperFM Radio Card (display only on mobile devices)*/}
          <HomeSpacingWrapper>
            {isMobileView && <SuperFmBannerCard />}
          </HomeSpacingWrapper>

          {/*Dushevnoe Radio Card (display only on mobile devices)*/}
          <HomeSpacingWrapper>
            {isMobileView && <DushevnoeRadioBannerCard />}
          </HomeSpacingWrapper>

          {/*Last News*/}
          <HomeSpacingWrapper>
            <HomeLastNews isMobile={isMobileView} lastNews={lastNews} />
          </HomeSpacingWrapper>

          {/*Top Artists*/}
          {/*<HomeSpacingWrapper>*/}
          {/*  <TopArtistsHomeCard*/}
          {/*    artistsData={artistsData}*/}
          {/*    isMobileView={isMobileView}*/}
          {/*  />*/}
          {/*</HomeSpacingWrapper>*/}

          {/*Suggest Song to Radio*/}
          <HomeSpacingWrapper>
            <HomeSuggestSongCard />
          </HomeSpacingWrapper>

          {/*Last Clips*/}
          <HomeLastClipsCard
            lastClips={lastClips}
            isMobileView={isMobileView}
          />

          {/*Popular Tracks*/}
          <HomeSpacingWrapper>
            <HomePopularTracksCard popularSongs={popularSongs} />
          </HomeSpacingWrapper>

          {/*Last Events*/}
          {/*<HomeSpacingWrapper>*/}
          {/*  <HomeLastEventsCard lastEvents={lastEvents} />*/}
          {/*</HomeSpacingWrapper>*/}
        </div>
      </div>
    </>
  );
};

export default HomePageInner;

const HomeSpacingWrapper = ({ children }) => {
  return (
    <div className="lg:pl-[1.5rem] max-[1200px]:mx-[1rem] max-[1200px]:!pl-[0]">
      {children}
    </div>
  );
};
