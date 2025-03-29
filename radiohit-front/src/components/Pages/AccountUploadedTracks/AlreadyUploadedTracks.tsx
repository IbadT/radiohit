'use client';

import * as React from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  getArtistUploadedSongs,
  getRadioDownloadedTracks,
} from '@/lib/appwrite/db_services/songs.db.service';
import Image from 'next/image';
import { ListMusic, Loader2, Pause } from 'lucide-react';
import { usePlayer } from '@/lib/hooks/usePlayer';
import { useGlobalAudioPlayer } from 'react-use-audio-player';
import DeleteDialog from '@/components/Pages/AccountUploadedTracks/DeleteDialog';
import { cn } from '@/lib/utils/utils';
import { Badge } from '@/components/ui/Badge/badge';
import Link from 'next/link';
import AudioAnimation from '@/components/SingleElements/AudioAnimation';

const AlreadyUploadedTracks = ({ userAccount }) => {
  const { setSingleTrackData, singleTrackData, isAudioLoading, stopped } = usePlayer();
  const { playing, paused } = useGlobalAudioPlayer();

  const { isLoading, isError, data, error, refetch } = useQuery({
    queryKey: ['artistUploadedTracks'],
    queryFn: async () => {
      return await getArtistUploadedSongs(userAccount.$id, 50);
    },
  });

  //Get song uploaded Date
  const convertUTCtoLocalDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString();
  };

  return (
    <>
      <div className="mb-[1.5rem] mt-[1rem] flex flex-col rounded-2xl border-[1px] border-mainBorderColor bg-white p-[1rem] max-lg:mt-0 max-lg:mt-[1rem] max-lg:flex-col max-md:mt-0">
        {!isLoading && !data && (
          <div className="flex h-[70vh] w-full flex-col items-center justify-center text-slate-400">
            <ListMusic size={50} strokeWidth={2} />
            <p className="mt-[1rem] text-[1.2rem] font-[400] lg:pl-[0.5rem]">
              У вас нет загруженных треков
            </p>
          </div>
        )}
        {isLoading && (
          <div className="h-70vh flex h-[60vh] w-full flex-col items-center justify-center">
            <Loader2 className="h-10 w-10 animate-spin text-slate-400" strokeWidth={1} />
            <p className="mt-[0.5rem] text-[1rem] text-slate-400">Загрузка треков...</p>
          </div>
        )}
        {!isLoading &&
          data &&
          data.documents.map((song, index) => {
            return (
              <div
                key={song.$id}
                className={cn(
                  singleTrackData && singleTrackData.trackURL == song.trackURL
                    ? 'bg-fuchsia-50'
                    : '',
                  'flex w-full flex-row items-center justify-between rounded-2xl px-[1rem] py-[0.6rem] transition-colors duration-300 hover:bg-gray-100 max-md:mt-0 max-md:px-[0.5rem]',
                )}
              >
                <div
                  className="flex w-full cursor-pointer flex-row items-center"
                  onMouseUp={() => setSingleTrackData(song)}
                >
                  <p className="mr-[1rem] text-slate-500">#{index + 1}</p>
                  <div
                    className={cn(
                      'relative mr-[1rem] h-[3rem] w-[3rem] overflow-hidden rounded-xl bg-gray-300',
                      singleTrackData && singleTrackData.trackURL == song.trackURL
                        ? 'bg-white'
                        : '',
                    )}
                  >
                    {singleTrackData && singleTrackData.trackURL == song.trackURL && playing && (
                      <AudioAnimation className="z-[2]" fill={undefined} svgClassName={undefined} />
                    )}
                    {singleTrackData &&
                      singleTrackData.trackURL == song.trackURL &&
                      isAudioLoading && (
                        <div className="mx-auto flex h-full w-full flex-col items-center justify-center align-middle">
                          <Loader2
                            strokeWidth={1}
                            className="!z-[2] h-[1.5rem] w-[1.5rem] animate-spin text-mainAccent"
                          />
                        </div>
                      )}

                    {singleTrackData && singleTrackData.trackURL == song.trackURL && stopped && (
                      <Image
                        src={song.trackImageURL}
                        alt="avatar"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority
                        className="h-full w-full bg-cover object-cover"
                      />
                    )}
                    {singleTrackData &&
                      singleTrackData.trackURL == song.trackURL &&
                      paused &&
                      !stopped && (
                        <div className="mx-auto flex h-full w-full flex-col items-center justify-center align-middle">
                          <Pause strokeWidth={0} fill="#a21caf" className="z-[2] text-[#4B8EEF]" />
                        </div>
                      )}
                    {singleTrackData && singleTrackData.trackURL != song.trackURL && (
                      <Image
                        src={song.trackImageURL}
                        alt="avatar"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority
                        className="h-full w-full bg-cover object-cover"
                      />
                    )}
                    {!singleTrackData && (
                      <Image
                        src={song.trackImageURL}
                        alt="avatar"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority
                        className="h-full w-full bg-cover object-cover"
                      />
                    )}
                  </div>
                  <div className="flex flex-col">
                    <p className="text-[#131414]">{song.trackSongName}</p>
                    <Link
                      scroll={false}
                      href={`/artists/${song.$id}`}
                      className="pointer-events-none relative text-[0.8rem] text-[#ACACAD] transition-all duration-300 hover:text-mainAccent hover:underline"
                    >
                      {song.trackArtistName}
                    </Link>
                  </div>
                </div>

                <div className="flex w-[50%] flex-row whitespace-nowrap text-[0.9rem] text-slate-500 max-lg:hidden">
                  <p>Загружен: {convertUTCtoLocalDate(song.$createdAt)}</p>
                </div>

                <div className="flex flex-row items-center">
                  <div className="mr-[3rem] flex w-[10rem] justify-start max-md:hidden">
                    {song.isApproved && (
                      <Badge
                        variant="green"
                        className="whitespace-nowrap border-green-500 bg-green-200 text-green-600"
                      >
                        Одобрен
                      </Badge>
                    )}
                    {!song.isApproved && !song.alreadyModerated && (
                      <Badge
                        variant="green"
                        className="whitespace-nowrap border-orange-300 bg-orange-100 text-orange-500"
                      >
                        На модерации
                      </Badge>
                    )}

                    {!song.isApproved && song.alreadyModerated && (
                      <Badge className="whitespace-nowrap border-red-300 bg-red-100 text-red-500">
                        Отклонён
                      </Badge>
                    )}
                  </div>
                  <DeleteDialog
                    trackID={song.$id}
                    refetch={refetch}
                    songImageID={song.trackImageID}
                    songFileID={song.trackFileID}
                    artistID={song.trackArtistID}
                  />
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default AlreadyUploadedTracks;
