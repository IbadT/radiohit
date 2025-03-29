/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    staleTimes: {
      dynamic: 30,
      static: 180,
    }
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  typescript: {
    ignoreBuildErrors: true,
    tsconfigPath: './tsconfig.json',
  },
  devIndicators: {
    appIsrStatus: false,
    buildActivity: true
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.radiohit.by',
      },
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  env: {
    SERVER_ENDPOINT: process.env.SERVER_ENDPOINT,
    SERVER_PROJECT: process.env.SERVER_PROJECT,
    SERVER_DATABASE_ID: process.env.SERVER_DATABASE_ID,
    SERVER_USERS_COLLECTION_ID: process.env.SERVER_USERS_COLLECTION_ID,
    SERVER_NEWS_COLLECTION_ID: process.env.SERVER_NEWS_COLLECTION_ID,
    SERVER_SONGS_COLLECTION_ID: process.env.SERVER_SONGS_COLLECTION_ID,
    SERVER_SLIDER_POSTERS_COLLECTION_ID: process.env.SERVER_SLIDER_POSTERS_COLLECTION_ID,
    SERVER_MAIN_SETTINGS_COLLECTION_ID: process.env.SERVER_MAIN_SETTINGS_COLLECTION_ID,
    SERVER_SONGS_BUCKET_ID: process.env.SERVER_SONGS_BUCKET_ID,
    SERVER_NEWS_IMAGES_BUCKET_ID: process.env.SERVER_NEWS_IMAGES_BUCKET_ID,
    SERVER_SLIDER_POSTERS_BUCKET_ID: process.env.SERVER_SLIDER_POSTERS_BUCKET_ID,
    SERVER_USER_IMAGES_BUCKET_ID: process.env.SERVER_USER_IMAGES_BUCKET_ID,
    SERVER_SONGS_IMAGES_BUCKET_ID: process.env.SERVER_SONGS_IMAGES_BUCKET_ID,
  },
};

module.exports = nextConfig;
