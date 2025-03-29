import localFont from "next/font/local";

export const sfProDisplayFont = localFont({
  src: [
    {
      path: "../../../public/assets/fonts/SFProDisplay/SF-Ultralight.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../../public/assets/fonts/SFProDisplay/SF-Thin.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../../public/assets/fonts/SFProDisplay/SF-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../../public/assets/fonts/SFProDisplay/SF-Regular.woff2",
      weight: "normal", // 400
      style: "normal",
    },
    {
      path: "../../../public/assets/fonts/SFProDisplay/SF-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../../public/assets/fonts/SFProDisplay/SF-Semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../../public/assets/fonts/SFProDisplay/SF-Semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../../public/assets/fonts/SFProDisplay/SF-Bold.woff2",
      weight: "bold", // 700
      style: "normal",
    },
    {
      path: "../../../public/assets/fonts/SFProDisplay/SF-Black.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "../../../public/assets/fonts/SFProDisplay/SF-Heavy.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--main-font",
});
