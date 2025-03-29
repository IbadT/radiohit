import { headers } from 'next/headers';
import MobileLayout from '@/components/Layouts/main/MobileLayout/MobileLayout';
import DesktopLayout from '@/components/Layouts/main/DesktopLayout/DesktopLayout';


interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = async ({ children }: MainLayoutProps) => {
  const headersList = await headers();
  const currentUserAgent = headersList.get('user-agent');

  const isMobileView = currentUserAgent!.match(
    /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i,
  );

  if (isMobileView) {
    return <MobileLayout>{children}</MobileLayout>;
  }

  return <DesktopLayout isMobileView={isMobileView}>{children}</DesktopLayout>;
};

export default MainLayout;
