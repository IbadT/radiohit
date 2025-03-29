import {
  CalendarClock,
  Clock4,
  MapPin,
  MoveLeft,
  MoveRight,
  Smartphone,
} from "lucide-react";
import Image from "next/image";
import CustomMdx from "@/components/CustomMDX/CustomMdx";
import Link from "next/link";
import ScrollToTop from "@/components/ui/ScrollToTop/ScrollToTop";

const EventsDetailsPage = ({ singleEvent, nextPost, prevPost }) => {
  const createdDate = new Date(singleEvent.$createdAt).toLocaleDateString();

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
                  href="/events"
                  className="transition-opacity duration-300 hover:opacity-80"
                >
                  <CalendarClock />
                </Link>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-mainAccent to-background/100 md:to-background/40 z-[1] w-full h-full opacity-50 transition-opacity duration-300" />

            <Image
              src={singleEvent.imageURL}
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
                <h2 className="text-[1.6rem] leading-relaxed font-[600] !leading-10 mb-[0.8rem] max-md:text-[1.2rem] max-md:!leading-7">
                  {singleEvent.title}
                </h2>

                <div className="flex flex-col mb-[0.8rem] rounded-2xl bg-gray-100 px-[1rem] py-[2rem] min-[1200px]:max-[1300px]:text-[0.7rem] min-[1300px]:max-[1440px]:text-[0.8rem] max-md:px-[1rem] max-md:py-[1.5rem]">
                  <div className="flex flex-row justify-between items-center max-md:flex-col max-md:items-start max-md:gap-[1rem] max-md:text-[1rem]">
                    <div className="flex flex-row items-center gap-[0.5rem]">
                      <CalendarClock size={22} className="max-md:hidden" />
                      <p>Дата Мероприятия:</p>
                      <p className="font-[500] text-mainAccent">
                        {singleEvent.eventDate}
                      </p>
                    </div>

                    <div className="flex flex-row items-center gap-[0.5rem]">
                      <Clock4 size={20} className="max-md:hidden" />
                      <p>Начало в:</p>
                      <p className="font-[500] text-mainAccent">
                        {singleEvent.eventTime}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-row justify-between items-center mt-[1rem] max-md:text-[1rem] max-md:flex-col max-md:items-start">
                    <div className="flex flex-row items-center gap-[0.5rem] max-md:flex-col">
                      <MapPin size={21} className="max-md:hidden" />
                      <p className="max-md:hidden">Адрес:</p>
                      <p className="font-[500] max-md:font-[400] text-mainAccent">
                        {singleEvent.eventAddress}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-row justify-between items-center mt-[1rem]">
                    <div className="flex flex-row items-center gap-[0.5rem]">
                      <Smartphone size={21} className="max-md:hidden" />
                      <p className="max-md:hidden">Контакты:</p>
                      <div className="flex flex-row items-center gap-[1rem] max-md:flex-col max-md:text-center max-md:w-full max-md:justify-center">
                        {/*eventContactPhones*/}
                        {singleEvent.eventContactPhones &&
                          singleEvent.eventContactPhones.map((phone, index) => {
                            return (
                              <p
                                key={`${index}_phone`}
                                className="font-[500] text-mainAccent"
                              >
                                {phone}
                              </p>
                            );
                          })}
                      </div>
                      {/*<p className='font-[500] text-mainAccent'>{singleEvent.eventAddress}</p>*/}
                    </div>
                  </div>
                </div>

                <div className="flex flex-row justify-between max-md:text-[1rem]">
                  <div className="text-slate-600">
                    <CustomMdx source={singleEvent.description} />
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
          <Link
            scroll={false}
            href={`/events/${prevPost.$id}`}
            className="w-full group text-white text-right"
          >
            <div className="relative h-[10rem] w-full rounded-2xl overflow-hidden bg-mainAccent">
              <div className="relative flex flex-col w-full p-[1.5rem] z-[2] h-full justify-between">
                <h2 className="text-[1.2rem] leading-relaxed font-[600] line-clamp-2 !leading-6 mb-[1rem] transition-all duration-300 group-hover:mb-[1.5rem] max-md:text-[1.2rem] max-md:!leading-7 min-[1200px]:max-[1440px]:text-[0.9rem] min-[1200px]:max-[1440px]:!leading-5">
                  {prevPost.title}
                </h2>
                <div className="flex flex-row w-full gap-[0.5rem] justify-end">
                  <MoveLeft strokeWidth={1} />
                  <p className="whitespace-nowrap min-[1200px]:max-[1440px]:text-[0.9rem]">
                    Предыдущее событие
                  </p>
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
          <Link
            scroll={false}
            href={`/events/${nextPost.$id}`}
            className="w-full group text-white"
          >
            <div className="relative h-[10rem] w-full rounded-2xl overflow-hidden bg-mainAccent">
              <div className="relative flex flex-col w-full p-[1.5rem] z-[2] h-full justify-between">
                <h2 className="text-[1.2rem] leading-relaxed font-[600] line-clamp-2 !leading-6 mb-[1rem] transition-all duration-300 group-hover:mb-[1.5rem] max-md:text-[1.2rem] max-md:!leading-7 min-[1200px]:max-[1440px]:text-[0.9rem] min-[1200px]:max-[1440px]:!leading-5">
                  {nextPost.title}
                </h2>
                <div className="flex flex-row w-full gap-[0.5rem]">
                  <p className="whitespace-nowrap min-[1200px]:max-[1440px]:text-[0.9rem]">
                    Следующее событие
                  </p>
                  <MoveRight strokeWidth={1} />
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

export default EventsDetailsPage;
