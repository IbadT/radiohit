import Link from "next/link";
import { MoveRight, Newspaper } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils/utils";
import * as React from "react";

const HomeLastNews = ({ isMobile, lastNews }) => {
  return (
    <>
      {/*Desktop last news*/}
      {!isMobile && lastNews && (
        <div className="w-full grid grid-cols-2 grid-rows-2 gap-[1rem] max-xl:hidden">
          {lastNews.documents.map((post, index) => {
            const createdDate = new Date(post.$createdAt).toLocaleDateString("ru-RU");

            return (
              <Link
                href={`/news/${post.$id}`}
                key={post.$id}
                className={cn("", index == 0 && "row-span-3")}
                scroll={false}
              >
                <div
                  className={cn(
                    "relative w-full h-[25vw] max-xl:h-[24rem] max-md:h-[16rem] overflow-hidden rounded-2xl mb-[1.2rem] group bg-gray-400 transition-transform duration-300 md:hover:scale-[0.98]",
                    index != 0 &&
                      "h-[12vw] bg-white text-slate-600 border-mainBorderColor border-[1px] mb-[0]"
                  )}
                >
                  <div
                    className={cn(
                      `relative flex flex-col w-full p-[1.5rem] z-[2] h-full justify-between`,
                      index != 0 && "p-[1.2rem]"
                    )}
                  >
                    <div className={cn(`text-white w-full flex justify-end`)}>
                      <Newspaper className={cn(index != 0 && "w-[1.2rem]")} />
                    </div>
                    <div
                      className={cn(
                        `flex flex-col text-white`,
                        index != 0 && "text-white h-full justify-end"
                      )}
                    >
                      <h2
                        className={cn(
                          `text-[1.2vw] font-[600] line-clamp-3 !leading-7 mb-[1rem] transition-all duration-300 group-hover:mb-[1.5rem] max-md:text-[1.2rem] max-md:!leading-7) min-[1200px]:max-[1430px]:!leading-[20px] min-[1200px]:max-[1430px]:mb-[0.6rem] min-[1900px]:!leading-[2rem]`,
                          index != 0 &&
                            "text-[1vw] group-hover:mb-[1.2rem] !leading-6 font-[500] min-[1200px]:max-[1430px]:!leading-[16px] line-clamp-2"
                        )}
                      >
                        {post.title}
                      </h2>
                      <div
                        className={cn(
                          "flex flex-row justify-between max-md:text-[0.9rem] text-[1vw] items-center",
                          index != 0 && "text-[1vw] items-center"
                        )}
                      >
                        <p className="min-[1200px]:max-[1430px]:text-[0.8rem]">
                          {createdDate}
                        </p>
                        <div className="flex flex-row items-center gap-[0.5rem]">
                          <p>Читать новость</p>
                          <MoveRight />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-mainAccent to-background/100 md:to-background/40 z-[1] w-full h-full opacity-50 group-hover:opacity-30 transition-opacity duration-300" />

                  <Image
                    src={post.imageURL}
                    alt="news_image"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="w-full h-full bg-cover object-cover z-[0] grayscale-50 group-hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {/*Mobile last news*/}
      {isMobile && (
        <div className="flex flex-col bg-white border-[1px] border-mainBorderColor rounded-2xl pt-[1.1rem] pb-0 px-[1.5rem] max-md:px-[1rem] max-md:py-[0.9rem] mb-[1.5rem] max-lg:mb-[1rem] min-[1000px]:max-[1200px]:hidden">
          <div className="flex flex-row items-center mb-[1rem] justify-between">
            <h2 className={cn("text-[#373738] font-[600] text-[1.1rem]")}>
              Последние новости
            </h2>
            <Link
              href="/news"
              className="text-[0.85rem] text-[#A8A8A8] transition-colors duration-300 hover:text-mainAccent"
              scroll={false}
            >
              {isMobile ? "Все новости" : "Смотреть все новости"}
            </Link>
          </div>
          <div className="flex flex-col items-center w-full justify-between">
            {isMobile && lastNews && (
              <div className="w-full flex flex-col xl:hidden">
                {lastNews.documents.map((post, index) => {
                  const createdDate = new Date(
                    post.$createdAt
                  ).toLocaleDateString("ru-RU");

                  return (
                    <Link
                      href={`/news/${post.$id}`}
                      key={post.$id}
                      className={cn("", index == 0 && "row-span-3")}
                      scroll={false}
                    >
                      <div
                        className={cn(
                          "relative w-full h-[22vw] max-xl:h-[24rem] max-md:h-[16rem] overflow-hidden rounded-xl mb-[1.2rem] group bg-gray-100",
                          index == 2 && "mb-0"
                        )}
                      >
                        <div className="relative flex flex-col w-full p-[1.5rem] z-[2] h-full justify-between">
                          <div className="text-white w-full flex justify-end">
                            <Newspaper />
                          </div>
                          <div className="flex flex-col text-white">
                            <h2 className="text-[1.8rem] leading-relaxed font-[600] line-clamp-3 !leading-10 mb-[1rem] transition-all duration-300 group-hover:mb-[1.5rem] max-md:text-[1.1rem] max-md:!leading-6">
                              {post.title}
                            </h2>
                            <div className="flex flex-row justify-between max-md:text-[0.9rem]">
                              <p className="text-white">{createdDate}</p>
                              <div className="flex flex-row items-center gap-[0.5rem]">
                                <p>Читать новость</p>
                                <MoveRight />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-mainAccent to-background/100 md:to-background/40 z-[1] w-full h-full opacity-50 group-hover:opacity-30 transition-opacity duration-300" />

                        <Image
                          src={post.imageURL}
                          alt="news_image"
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          priority
                          className="w-full h-full bg-cover object-cover z-[0] grayscale-50 group-hover:grayscale-0 transition-all duration-300"
                        />
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}

            {/*If News data is empty*/}
            {!lastNews && isMobile && (
              <div className="flex flex-col justify-center w-full">
                <div className="w-full h-[10rem] max-md:h-[50vh] text-slate-400 flex flex-col items-center justify-center align-middle bg-white">
                  <Newspaper size={30} strokeWidth={2} />
                  <p className="font-[400] text-[1rem] lg:pl-[0.5rem] mt-[0.5rem]">
                    Нет новостей
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );

};
export default HomeLastNews;
