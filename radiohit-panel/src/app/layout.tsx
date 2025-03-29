import '@/styles/globals.css';
import { Metadata, Viewport } from 'next';
import { headers } from 'next/headers';
import { sfProDisplayFont } from '@/lib/utils/fonts';
import TopLoader from '@/components/TopLoader/TopLoader';
import { Toaster } from '@/components/ui/Toaster/toaster';
import RestrictMobile from '@/components/Layouts/RestrictMobile/RestrictMobile';
import AudioPlayer from '@/components/AudioPlayer/AudioPlayer';
import ReactQueryWrapper from '@/components/Wrappers/ReactQueryWrapper';

export const metadata: Metadata = {
  title: {
    template: '%s | RadioHit Panel',
    default: 'RadioHit Panel', // a default is required when creating a template
  },
};

export const viewport: Viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout = async ({ children }: RootLayoutProps) => {
  //Get headers
  const headersList = await headers();
  //Get device user-agent info
  const userAgent = headersList.get('user-agent');

  //Check if its mobile device
  const isMobileView = userAgent!.match(
    /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i,
  );

  //Restrict if is mobile device
  if (isMobileView) {
    return (
      <html lang="ru">
        <body className={`${sfProDisplayFont.variable} bg-layoutBG font-mainFont`}>
          <RestrictMobile />
        </body>
      </html>
    );
  }

  return (
    <html lang="ru">
      <body className={`${sfProDisplayFont.variable} bg-layoutBG font-mainFont`}>
        <TopLoader />
        <ReactQueryWrapper>{children}</ReactQueryWrapper>

        <AudioPlayer isMobile={isMobileView} />
        <Toaster />
      </body>
    </html>
  );
};

export default RootLayout;
