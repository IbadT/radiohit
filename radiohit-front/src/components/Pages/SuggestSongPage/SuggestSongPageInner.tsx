import ScrollToTop from "@/components/ui/ScrollToTop/ScrollToTop";
import PageHeading from "@/components/Text/PageHeading";
import { cn } from "@/lib/utils/utils";
import SuggestSongForm from "@/components/Forms/SuggestSongForms/SuggestSongForm";

const SuggestSongPageInner = () => {
  return (
    <>
      <ScrollToTop />
      <div className="flex flex-col w-full h-full">
        <div className="w-full">
          {/*Page Heading*/}
          <div className="w-full flex flex-row items-center justify-between max-lg:hidden lg:px-[1.5rem] lg:mt-[1.2rem] mb-[0.4rem]">
            <PageHeading text="Отправить песню на радио" classnames="mb-0" />
            <p className="text-[0.9rem] text-slate-400 transition-colors duration-300 hover:text-mainAccent">
              Предложить трек
            </p>
          </div>

          {/*Content*/}
          <div className="lg:pl-[1.5rem] lg:pt-[0.2rem] mb-[1.8rem] max-[1200px]:mx-[1rem] max-[1200px]:!pl-[0]">
            {/*Card*/}
            <div className="flex flex-col bg-white border-[1px] border-mainBorderColor rounded-2xl py-[1.1rem] px-[1.5rem] max-md:px-[1rem] max-md:py-[0.9rem] mb-[1.5rem] max-lg:mb-[1rem]">
              <SuggestSongForm />
            </div>

            <div className="flex flex-col bg-white border-[1px] border-mainBorderColor rounded-2xl py-[1.1rem] px-[1.5rem] max-md:px-[1rem] max-md:py-[0.9rem] mb-[1.5rem] max-lg:mb-[1rem]">
              <h2
                className={cn(
                  "text-[#373738] font-[600] text-[1.1rem] mb-[0.6rem]"
                )}
              >
                Как отправить песню на радио
              </h2>
              <div className="flex flex-col gap-[1rem] text-slate-700 max-md:text-[0.9rem]">
                <p>
                  Хотите, чтобы ваш трек зазвучал на радиостанциях?
                  <br />У вас есть возможность подать заявку на рассмотрение,
                  для этого просто следуйте этим шагам:
                </p>
                <ul className="flex flex-col gap-[8px]">
                  <li className="font-[500]">
                    1. Заполните анкету, указав необходимые данные и следуя
                    инструкциям в форме.
                  </li>
                  <li className="font-[500]">
                    2. Приложите ваш файл с музыкальной композицией. Пожалуйста,
                    убедитесь, что ваш трек соответствует техническим
                    требованиям платформы. Технические требования также включают
                    соответствие радио-стандартам.
                  </li>
                  <li className="font-[500]">
                    3. Наши менеджеры свяжутся с вами для продолжения процедуры
                    и уточнения деталей.
                  </li>
                </ul>
                <p>
                  Обратите внимание, что треки, нарушающие законодательство
                  Республики Беларусь, не будут рассматриваться. Это включает в
                  себя любое содержание, которое пропагандирует наркотики,
                  алкоголь или другие запрещенные вещества.
                </p>
                <p>
                  Также не допускаются
                  треки, содержащие оскорбления, ненормативную лексику или
                  материалы, нарушающие права интеллектуальной собственности. Мы
                  стремимся поддерживать высокие стандарты и предоставлять нашей
                  аудитории качественную и безопасную музыкальную среду.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default SuggestSongPageInner;
