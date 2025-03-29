import Link from "next/link";
import {Separator} from "@/components/ui/Separator/separator";
import DynamicAccountFooterLinks from "@/components/Footer/DynamicAccountFooterLinks";

const Footer = () => {
  const currentDate = new Date().getFullYear();

  return (
    <footer className="px-[1.5rem] py-[1.5rem] bg-white border-t-[1px] border-mainBorderColor">
      <div className="grid grid-cols-4 max-md:grid-cols-1">
        {/*Info*/}
        <div className='flex flex-col justify-start max-md:mb-[1.2rem]'>
          <h2 className="font-[500] text-slate-500 text-[1.2rem] mb-[0.5rem]">Информация</h2>
          <div className='flex flex-col justify-start gap-[0.3rem] text-slate-600'>
            <Link href="/about" className="hover:text-mainAccent transition-colors duration-300 min-[1200px]:max-[1450px]:text-[0.9rem]" scroll={false}>
              О проекте
            </Link>
            <Link href="/how-to-upload-track" className="hover:text-mainAccent transition-colors duration-300 min-[1200px]:max-[1450px]:text-[0.9rem]" scroll={false}>
              Как загрузить трек
            </Link>
          </div>
        </div>

        {/*Users*/}
        <div className='flex flex-col justify-start max-md:mb-[1.2rem]'>
          <h2 className="font-[500] text-slate-500 text-[1.2rem] mb-[0.5rem]">Пользователям</h2>
          <div className='flex flex-col justify-start gap-[0.3rem] text-slate-600'>
            <DynamicAccountFooterLinks/>
          </div>
        </div>

        {/*Artists*/}
        <div className='flex flex-col justify-start max-md:mb-[1.2rem]'>
          <h2 className="font-[500] text-slate-500 text-[1.2rem] mb-[0.5rem]">Артистам</h2>
          <div className='flex flex-col justify-start gap-[0.3rem] text-slate-600'>
            <Link href="/digital-distribution" className="hover:text-mainAccent transition-colors duration-300 min-[1200px]:max-[1450px]:text-[0.9rem]" scroll={false}>
              Цифровая дистрибуция
            </Link>
            <Link href="/promotion-and-production" className="hover:text-mainAccent transition-colors duration-300 min-[1200px]:max-[1450px]:text-[0.9rem] min-[1200px]:max-[1450px]:text-[0.9rem]" scroll={false}>
              Продвижение и продюсирование
            </Link>
          </div>
        </div>
        {/*Radio*/}
        <div className='flex flex-col justify-start max-md:mb-[1.2rem]'>
          <h2 className="font-[500] text-slate-500 text-[1.2rem] mb-[0.5rem]">Сотрудничество</h2>
          <div className='flex flex-col justify-start gap-[0.3rem] text-slate-600'>
            <Link href="/contacts" className="hover:text-mainAccent transition-colors duration-300 min-[1200px]:max-[1450px]:text-[0.9rem]" scroll={false}>
              Контакты
            </Link>
            <Link href="/privacy-policy" className="hover:text-mainAccent transition-colors duration-300 min-[1200px]:max-[1450px]:text-[0.9rem]" scroll={false}>
              Политика конфиденциальности
            </Link>
          </div>
        </div>


      </div>

      <Separator orientation='horizontal' className='w-full my-[1.5rem]'/>
      <div className="flex flex-row items-center justify-between text-slate-600 max-lg:flex-col">
        <Link
          href="/"
          className="hover:text-mainAccent transition-colors duration-300"
          scroll={false}
        >
          © {currentDate} Radiohit.by
          <span className='max-md:hidden'> - Радиопортал дистрибуции музыки</span>
        </Link>
        <Link href="https://st-m.by/" target="_blank" className='hover:text-mainAccent transition-colors duration-300 max-lg:hidden' scroll={false}>
          Разработка портала - Стратегия Маркетинга
        </Link>
      </div>
    </footer>
  );
};
export default Footer;


