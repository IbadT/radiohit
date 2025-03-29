import MobileHeader from "@/components/Layouts/main/MobileLayout/MobileHeader";
import Footer from "@/components/Footer/Footer";
import MainSearch from "@/components/Search/MainSearch";

interface MobileLayoutProps {
  children: React.ReactNode;
}

const MobileLayout = ({ children }: MobileLayoutProps) => {
  return (
    <>
      <MobileHeader />
      <div className="px-[1rem] my-[1.5rem]">
        <MainSearch buttonVariant={"search"} />
      </div>
      <main className="min-h-[50vh] bg-layoutBG">{children}</main>
      <Footer />
    </>
  );
};

export default MobileLayout;
