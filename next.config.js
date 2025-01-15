/** @type {import('next').NextConfig} */
const nextConfig = {
   images: {
      remotePatterns: [
         {
            protocol: 'https',
            hostname: 'i.pravatar.cc',
         },
         {
            protocol: 'https',
            hostname: 'avatars.githubusercontent.com',
         },
      ],
   },
   env: {
      MONGO_URI: process.env.MONGO_URI,
   },
};

module.exports = nextConfig;
