import { Metadata } from "next";
import PageHeading from "@/components/Text/PageHeading";
import { cn } from "@/lib/utils/utils";
import ScrollToTop from "@/components/ui/ScrollToTop/ScrollToTop";

export const metadata: Metadata = {
  title: "Информация о проекте",
};

export const revalidate = false;

const AboutPage = () => {
  return (
    <>
      <ScrollToTop />
      <div className="flex flex-col w-full h-full">
        <div className="w-full">
          {/*Page Heading*/}
          <div className="w-full flex flex-row items-center justify-between max-lg:hidden lg:px-[1.5rem] lg:mt-[1.2rem] mb-[0.4rem]">
            <PageHeading text="О проекте" classnames="mb-0" />
            <p className="text-[0.9rem] text-slate-400 transition-colors duration-300 hover:text-mainAccent">
              Информация
            </p>
          </div>

          {/*Content*/}
          <div className="lg:pl-[1.5rem] lg:pt-[0.2rem] mb-[1.8rem] max-[1200px]:mx-[1rem] max-[1200px]:!pl-[0]">
            {/*Card*/}
            <div className="flex flex-col bg-white border-[1px] border-mainBorderColor rounded-2xl py-[1.1rem] px-[1.5rem] max-md:px-[1rem] max-md:py-[0.9rem] mb-[1.5rem] max-lg:mb-[1rem]">
              <h2
                className={cn(
                  "text-[#373738] font-[600] text-[1.1rem] mb-[0.6rem]"
                )}
              >
                Информация о проекте
              </h2>
              <div className="flex flex-col gap-[1rem] text-slate-700 max-md:text-[0.9rem]">
                <p>
                  Радиохит.бай – это музыкальный портал и онлайн-радиостанция, в
                  эфире которой звучат только белорусские песни. На нашем сайте
                  вы всегда найдете актуальные новости белорусской музыкальной
                  индустрии и сможете отправить на рассмотрение свою песню для
                  эфира всех радиостанций Беларуси! Мы стремимся быть в курсе
                  музыкальных событий, чтобы наши слушатели и посетители сайта
                  всегда оставались в курсе новостей. Постоянно следим за
                  музыкальными событиями и рассказываем о грядущих релизах,
                  концертах и других событиях, которые интересны нашей
                  аудитории.
                </p>
                <p>
                  С помощью radiohit.by все артисты, в том числе и начинающие,
                  могут раскрыть свой потенциал и заявить о себе. У нас нет
                  ограничений - мы приветствуем разнообразие жанров и стилей
                  музыки. Уверены, что каждый артист может найти своего
                  слушателя именно здесь. Платформа дает шанс для самовыражения
                  и креативного роста, где каждый талант будет услышан.
                </p>
                <p>
                  Кроме того, радиохит.бай предоставляет возможность отправить
                  заявку на рассмотрение, чтобы ваш трек получил возможность
                  попасть в эфир всех радиостанций Беларуси. Процесс отправки
                  песен максимально прост и удобен: заполните анкету на нашем
                  сайте, загрузите свой трек - он будет рассмотрен нашей
                  командой, после чего мы свяжемся с вами.
                </p>
                <p>
                  Наша цель - стать надежным партнером для артистов, помогая им
                  развивать свой музыкальный талант и благодаря партнерам,
                  достигать новых вершин по модели «360 градусов»!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
