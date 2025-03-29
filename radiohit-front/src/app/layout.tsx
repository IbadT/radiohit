import '../styles/globals.css';
import { Metadata, Viewport } from 'next';
import { sfProDisplayFont } from '@/lib/utils/fonts';
import TopLoader from '@/components/TopLoader/TopLoader';
import { Toaster } from '@/components/ui/Toaster/toaster';
import AudioPlayer from '@/components/AudioPlayer/AudioPlayer';
import { headers } from 'next/headers';
import ReactQueryWrapper from '@/components/wrappers/ReactQueryWrapper';

export const metadata: Metadata = {
  title: {
    template: '%s | RadioHit.by',
    default: 'RadioHit.by - Радиопортал дистрибуции музыки', // a default is required when creating a template
  },
  description:
    'Музыкальный портал дистрибуции музыки. Слушайте музыку, ставьте оценки, делитесь впечатлениями',
  keywords: [
    'Radiohit.by',
    'Radiohit',
    'Слушать музыку онлайн',
    'Продвижение исполнителей',
    'Песни для радио',
    'Музыка для ротаций на радио',
  ],
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
  const headersList = await headers();
  //Get device user-agent info
  const userAgent = headersList.get('user-agent');

  //Check if its mobile device
  const isMobileView = userAgent!.match(
    /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i,
  );

  return (
    <html lang="ru">
      <head>


      <script async src="https://www.googletagmanager.com/gtag/js?id=G-4P3MVB7B92"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-4P3MVB7B92');
            `,
          }}
        />


      <script
          dangerouslySetInnerHTML={{
            __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-NVZGNRLL');
            `,
          }}
        />


        {/* Скрипт Яндекс.Метрики */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();
              for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
              k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
              (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
          
              ym(100598735, "init", {
                  clickmap:true,
                  trackLinks:true,
                  accurateTrackBounce:true,
                  webvisor:true
              });
            `,
          }}
        />



        {/* Скрипт Гугл Аналитики */}
        {/* <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`}
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXXXXXXX');
            `,
          }}
        /> */}
      
      </head>
      <body
        // className={`${sfProDisplayFont.variable} font-mainFont ${isMobileView && 'bg-layoutBG'}`}
        className={`${sfProDisplayFont.variable} font-mainFont ${isMobileView ? 'bg-layoutBG' : ''}`}

      >

        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-NVZGNRLL"
            height="0" 
            width="0" 
            style={{display:'none', visibility:'hidden'}}
          ></iframe>
        </noscript>

        <noscript>
          <div>
            <img 
            src="https://mc.yandex.ru/watch/100598735" 
            style={{ position: 'absolute', left: '-9999px' }}
            alt="" />
          </div>
        </noscript>

        <TopLoader />
        <ReactQueryWrapper>{children}</ReactQueryWrapper>
        <AudioPlayer isMobile={isMobileView} />
        <Toaster />
      </body>
    </html>
  );
};

export default RootLayout;