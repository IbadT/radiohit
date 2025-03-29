import Footer from "@/components/Footer/Footer";
import DesktopHeader from "@/components/Layouts/main/DesktopLayout/DesktopHeader";
import DesktopSidebarNav from "@/components/Layouts/main/DesktopLayout/DesktopSidebarNav";
import RightDesktopSidebar from "@/components/Layouts/main/DesktopLayout/RightDesktopSidebar";

interface DesktopLayoutProps {
  children: React.ReactNode;
  isMobileView: any;
}

const DesktopLayout = ({ children, isMobileView }: DesktopLayoutProps) => {
  return (
    <div className="desktop-content flex flex-row w-full max-w-[1920px] m-auto">
      <DesktopSidebarNav />
      <div className="w-full">
        <DesktopHeader />
        <main className="bg-layoutBG">
          <div className='flex flex-row w-full h-full min-h-[85vh] max-lg:min-h-screen'>
            {/*Center desktop content*/}
            <div className="center-desktop-content w-full">{children}</div>
            {/*Right Home Content*/}
            {!isMobileView && <RightDesktopSidebar />}
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
};

export default DesktopLayout;
