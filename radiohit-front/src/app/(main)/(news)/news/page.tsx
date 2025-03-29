import { Metadata } from "next";
import PageHeading from "@/components/Text/PageHeading";
import NewsPageInner from "@/components/Pages/NewsPage/NewsPageInner";
import ScrollToTop from "@/components/ui/ScrollToTop/ScrollToTop";

export const revalidate = 200;

export const metadata: Metadata = {
  title: "Новости",
};

const NewsPage = () => {
  return (
    <>
      <ScrollToTop />
      <div className="flex flex-col w-full h-full">
        <div className="w-full">
          {/*Page Heading*/}
          <div className="w-full flex flex-row items-center justify-between max-lg:hidden lg:px-[1.5rem] lg:mt-[1.2rem] mb-[0.4rem]">
            <PageHeading text="Новости" classnames="mb-0" />
            <p className="text-[0.9rem] text-slate-400 transition-colors duration-300 hover:text-mainAccent">
              Последние новости
            </p>
          </div>
          {/*Content*/}
          <div className="lg:pl-[1.5rem] lg:pt-[0.2rem] mb-[1.8rem] max-[1200px]:mx-[1rem] max-[1200px]:!pl-[0]">
            <NewsPageInner />
          </div>
        </div>
      </div>
    </>
  );
};

export default NewsPage;
