import ArtistDetailsCard from '@/components/Cards/ArtistDetailsCard/ArtistDetailsCard';
import ArtistDetailsUploadedTracksCard from '@/components/Cards/ArtistDetailsCard/ArtistDetailsUploadedTracksCard';
import ScrollToTop from '@/components/ui/ScrollToTop/ScrollToTop';
import * as React from 'react';

const ArtistDetailsPage = ({ artist }) => {
  return (
    <>
      <ScrollToTop />
      <div className="mb-[1.8rem] mt-[1rem] flex h-full w-full flex-col max-xl:p-[0] max-[1200px]:px-[1rem] max-lg:mt-[0] lg:pt-[0.2rem] xl:pl-[1.5rem]">
        <ArtistDetailsCard artist={artist} />
        <ArtistDetailsUploadedTracksCard artistID={artist.$id} />
      </div>
    </>
  );
};

export default ArtistDetailsPage;
