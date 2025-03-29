import { Metadata } from "next";
import PageHeading from "@/components/Text/PageHeading";
import { cn } from "@/lib/utils/utils";
import ScrollToTop from "@/components/ui/ScrollToTop/ScrollToTop";

export const metadata: Metadata = {
  title: "Цифровая дистрибуция",
};

export const revalidate = false;

const ArtistDigitalDistributionInfoPage = () => {
  return (
    <>
      <ScrollToTop />
      <div className="flex flex-col w-full h-full">
        <div className="w-full">
          {/*Page Heading*/}
          <div className="w-full flex flex-row items-center justify-between max-lg:hidden lg:px-[1.5rem] lg:mt-[1.2rem] mb-[0.4rem]">
            <PageHeading text="Цифровая дистрибуция" classnames="mb-0" />
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
                Цифровоя дистрибуция треков
              </h2>
              <div className="flex flex-col gap-[1rem] text-slate-700 max-md:text-[0.9rem]">
                <p>
                  Цифровая дистрибуция стала неотъемлемой частью современной
                  музыкальной индустрии. Теперь артисты могут быстро и просто
                  донести свое творчество до слушателей со всего Мира,
                  продвинуть треки с помощью редакторских плейлистов и
                  уникальных алгоритмов стриминговых платформ, своевременно
                  получать аналитику и отчетность по прослушиваниям по каждой
                  музыкальной площадке, а также монетизировать свое творчество.
                </p>
                <p>
                  В современных реалиях даже начинающий артист без
                  дополнительного бюджета может ярко заявить о себе и получить
                  признание благодаря размещению своих треков на музыкальных
                  сервисах, таких как Яндекс Музыка, VK Музыка, Spotify, Apple
                  Music, Deezer и многих других.
                </p>
                <p>
                  Подготовка артиста перед размещением песни играет ключевую
                  роль в успешной цифровой дистрибуции. Вот наши рекомендации,
                  чтобы обеспечить эффективное сотрудничество:
                </p>
                <ul className="flex flex-col gap-[8px] pt-[5px]">
                  <li>
                    1.{" "}
                    <b>
                      Отправляйте трек не позднее, чем за 21 день до
                      запланированной даты релиза
                    </b>
                    , чтобы обеспечить достаточно времени на процесс прохождения
                    модерации и питчинга.
                  </li>
                  <li>
                    2. <b>Подготовьте</b> информативный и цепляющий{" "}
                    <b>пресс-релиз</b>. Он важен для презентации вашего трека
                    редакторам стриминговых сервисов, которые принимают решение,
                    поддерживать ли вашу музыку. , чтобы обеспечить достаточно
                    времени на процесс прохождения модерации и питчинга.
                  </li>
                  <li>
                    3. Подготовьте <b>видеошот</b>, который можно разместить на
                    стриминговых платформах для привлечения внимания новой
                    аудитории.
                  </li>
                  <li>
                    4. Используйте функцию <b>пресейва</b>, чтобы заранее
                    подогреть интерес аудитории перед официальным релизом вашего
                    трека. Это способствует более активной реакции на вашу
                    музыку сразу же после ее появления на стриминговых
                    площадках.
                  </li>
                  <li>
                    5.{" "}
                    <b>
                      Активно продвигайте релиз на своих социальных
                      медиа-платформах
                    </b>
                    , таких как Instagram, TikTok, ВКонтакте и YouTube,
                    используя различные трендовые механики: публикация
                    сниппетов, показ закулисных моментов подготовки к релизу,
                    процесс создания музыки, запись трека, история написания
                    песни, ее вдохновение и многое другое. Это позволит
                    подогреть интерес аудитории к вашему треку.
                  </li>
                  <p>
                    Благодаря нашим партнерам, мы предоставляем возможность
                    белорусским артистам оказаться на популярных стриминговых
                    платформах, а также звучать как онлайн, так и в эфире
                    белорусских радиостанций. Наш опыт и экспертность помогут
                    вашему творчеству достичь новых высот.
                  </p>
                  <p className="font-bold pt-[10px]">
                    По вопросам сотрудничества Вы можете связаться по e-mail: <a href="mailto:digital@muzmedia.by" className="text-mainAccent">digital@muzmedia.by</a>
                  </p>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArtistDigitalDistributionInfoPage;
