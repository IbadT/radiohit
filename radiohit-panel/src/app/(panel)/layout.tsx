import DesktopSidebarNav from "@/components/Layouts/MainLayout/SidebarNav";
import GlobalHeader from "@/components/Layouts/MainLayout/GlobalHeader";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="desktop-content flex flex-row w-full max-w-[1920px] m-auto max-[1200px]:hidden">
      <DesktopSidebarNav />
      <div className="w-full">
        <GlobalHeader />
        <main className="w-full bg-layoutBG px-[2rem] pb-[1.5rem] pt-[2rem]">{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;
