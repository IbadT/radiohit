import {MoveLeft, MoveRight, Newspaper} from "lucide-react";
import Image from "next/image";
import CustomMdx from "@/components/CustomMDX/CustomMdx";
import Link from "next/link";
import ScrollToTop from "@/components/ui/ScrollToTop/ScrollToTop";

const NewsDetailsPage = ({ singleNews, nextPost, prevPost }) => {
  const createdDate = new Date(singleNews.$createdAt).toLocaleDateString();

  return (
    <>
      <ScrollToTop/>
      <div className="lg:pl-[1.5rem] lg:pt-[1.6rem] mb-[1.8rem] max-[1200px]:mx-[1rem] max-[1200px]:!pl-[0]">
        <div className="flex flex-col bg-white border-[1px] border-mainBorderColor rounded-3xl p-[1rem] h-auto">
          {/*Image with text*/}
          <div className="relative w-full h-[22vw] max-xl:h-[24rem] max-md:h-[16rem] overflow-hidden rounded-2xl group bg-gray-200">
            <div className="relative flex flex-col w-full p-[1.5rem] z-[2] h-full justify-between">
              <div className="text-white w-full flex justify-between items-center">
                <p className="">{createdDate}</p>
                <Link
                    scroll={false}
                  href="/news"
                  className="transition-opacity duration-300 hover:opacity-80"
                >
                  <Newspaper />
                </Link>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-mainAccent to-background/100 md:to-background/40 z-[1] w-full h-full opacity-50 transition-opacity duration-300" />

            <Image
              src={singleNews.imageURL}
              alt="news_image"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
              className="w-full h-full bg-cover object-cover z-[0] grayscale-0 transition-all duration-300"
            />
          </div>

          <div className="relative px-[2.5rem] z-[3] top-[-5rem] max-md:top-0 h-auto max-md:px-0">
            <div className="bg-white rounded-2xl p-[2rem] max-w-[800px] mx-auto max-md:px-[0.5rem] max-md:pt-[1.2rem] max-md:pb-0">
              <div className="flex flex-col">
                <h2 className="text-[1.6rem] leading-relaxed font-[600] !leading-10 mb-[1rem] max-md:text-[1.2rem] max-md:!leading-7">
                  {singleNews.title}
                </h2>
                <div className="flex flex-row justify-between max-md:text-[1rem]">
                  <div className="text-slate-600">
                    <CustomMdx source={singleNews.description} />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/*Prev Next Posts*/}
      <div className="w-full flex flex-row justify-between items-center gap-[2rem] relative mb-[4rem] pl-[2.5rem] pr-[1rem] max-xl:px-[1rem] max-md:hidden">
        {prevPost && (
            <Link href={`/news/${prevPost.$id}`} className="w-full group text-white text-right" scroll={false}>
              <div className="relative h-[10rem] w-full rounded-2xl overflow-hidden bg-mainAccent">
                <div className="relative flex flex-col w-full p-[1.5rem] z-[2] h-full justify-between">
                  <h2 className="text-[1.2rem] leading-relaxed font-[600] line-clamp-2 !leading-6 mb-[1rem] transition-all duration-300 group-hover:mb-[1.5rem] max-md:text-[1.2rem] max-md:!leading-7 min-[1200px]:max-[1440px]:text-[0.9rem] min-[1200px]:max-[1440px]:!leading-5">
                    {prevPost.title}
                  </h2>
                  <div className='flex flex-row w-full gap-[0.5rem] justify-end'>
                    <MoveLeft strokeWidth={1}/>
                    <p className='whitespace-nowrap min-[1200px]:max-[1440px]:text-[0.9rem]'>Предыдущая новость</p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-mainAccent to-background/100 md:to-background/40 z-[1] w-full h-full group-hover:opacity-50 transition-opacity duration-300" />
                <Image
                    src={prevPost.imageURL}
                    alt="news_image"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority
                    className="w-full h-full bg-cover object-cover z-[0] grayscale group-hover:grayscale-0 transition-all duration-300"
                />
              </div>
            </Link>
        )}
        {nextPost && (
            <Link href={`/news/${nextPost.$id}`} className="w-full group text-white" scroll={false}>
              <div className="relative h-[10rem] w-full rounded-2xl overflow-hidden bg-mainAccent">
                <div className="relative flex flex-col w-full p-[1.5rem] z-[2] h-full justify-between">
                  <h2 className="text-[1.2rem] leading-relaxed font-[600] line-clamp-2 !leading-6 mb-[1rem] transition-all duration-300 group-hover:mb-[1.5rem] max-md:text-[1.2rem] max-md:!leading-7 min-[1200px]:max-[1440px]:text-[0.9rem] min-[1200px]:max-[1440px]:!leading-5">
                    {nextPost.title}
                  </h2>
                  <div className='flex flex-row w-full gap-[0.5rem]'>
                    <p className='whitespace-nowrap min-[1200px]:max-[1440px]:text-[0.9rem]'>Следующая новость</p>
                    <MoveRight strokeWidth={1}/>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-mainAccent to-background/100 md:to-background/40 z-[1] w-full h-full group-hover:opacity-50 transition-opacity duration-300" />
                <Image
                    src={nextPost.imageURL}
                    alt="news_image"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority
                    className="w-full h-full bg-cover object-cover z-[0] grayscale group-hover:grayscale-0 transition-all duration-300"
                />
              </div>
            </Link>
        )}
      </div>
    </>
  );
};

export default NewsDetailsPage;
