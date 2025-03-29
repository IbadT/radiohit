import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils/utils";

const HomeSlider = ({ poster }) => {
  const responsiveSizes =
    "min-[1200px]:h-[25vh] min-[1320px]:h-[30vh] min-[1410px]:h-[25vh] min-[1500px]:h-[30vh] min-[1900px]:h-[35vh] max-lg:h-[20rem] max-md:h-[10rem]";

  return (
    <>
      {poster && (
        <div className="mt-[1rem] mb-[1.5rem] w-full max-lg:mt-0 rounded-2xl overflow-hidden bg-[#e8e7e3] max-md:mb-[1rem]  transition-all duration-300 min-[1200px]:hover:scale-[0.98]">
          <Link href={`${poster.posterTargetURL}`} scroll={false}>
            <div
              className={cn(
                "w-full h-[35vh] relative rounded-2xl overflow-hidden",
                responsiveSizes
              )}
            >
              <div className="relative flex z-[1] py-[2rem] px-[4rem] flex flex-col h-full w-full justify-around max-md:px-[1.2rem]">
                {/*Poster Top Subtitle*/}
                <div className="flex flex-col">
                  <p
                    className="font-[500] line-clamp-1 max-md:text-[0.8rem] min-[1220px]:max-[1300px]:text-[0.8rem] min-[1900px]:text-[1.2rem]"
                    style={{
                      color: `${poster.topSubtitleColor}`,
                    }}
                  >
                    {poster.posterTopSubtitle}
                  </p>

                  {/*Poster Title*/}
                  <p
                    className="line-clamp-3 font-[600] text-[2.5rem] mt-[0.1vw] mb-[0.5rem] max-md:text-[1.4rem] min-[1220px]:max-[1300px]:text-[1.6rem] min-[1300px]:max-[1450px]:text-[2rem] min-[1900px]:text-[2.6rem]"
                    style={{
                      color: `${poster.titleColor}`,
                    }}
                  >
                    {poster.posterTitle}
                  </p>

                  {/*Poster Bottom Subtitle*/}
                  <p
                    className="line-clamp-3 w-[50%] max-md:hidden min-[1300px]:max-[1450px]:text-[0.9rem] min-[1220px]:max-[1300px]:text-[0.8rem] min-[1900px]:text-[1.3rem]"
                    style={{
                      color: `${poster.bottomSubtitleColor}`,
                    }}
                  >
                    {poster.posterBottomSubtitle}
                  </p>
                </div>
              </div>

              <Image
                src={poster.posterImageURL}
                alt="poster"
                fill
                quality={100}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
                className="w-full h-full bg-cover object-cover z-[0] transition-all duration-300 pointer-events-none saturate-150 backdrop-saturate-125"
              />
            </div>
          </Link>
        </div>
      )}
    </>
  );
};
export default HomeSlider;
