import { Metadata } from "next";
import PageHeading from "@/components/Text/PageHeading";
import { cn } from "@/lib/utils/utils";
import ScrollToTop from "@/components/ui/ScrollToTop/ScrollToTop";
import * as React from "react";

export const metadata: Metadata = {
  title: "Контакты",
};

export const revalidate = false;

const PlatformContactsInfoPage = () => {
  return (
    <>
      <ScrollToTop />
      <div className="flex flex-col w-full h-full">
        <div className="w-full">
          {/*Page Heading*/}
          <div className="w-full flex flex-row items-center justify-between max-lg:hidden lg:px-[1.5rem] lg:mt-[1.2rem] mb-[0.4rem]">
            <PageHeading text="Контакты" classnames="mb-0" />
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
                Как связаться с нами
              </h2>
              <div className="flex flex-col gap-[0.5rem] text-slate-700 max-md:text-[0.9rem]">
                <p>Мы открыты к сотрудничеству!</p>
                <p>
                  {" "}
                  По всем вопросам просьба писать в офис на e-mail:{" "}
                  <a
                    href="mailto:office@radiohit.by"
                    className="text-mainAccent"
                  >
                    office@radiohit.by
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlatformContactsInfoPage;
