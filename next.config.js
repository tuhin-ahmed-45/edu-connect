/** @type {import('next').NextConfig} */
const nextConfig = {
   images: {
      domains: [
         "i.pravatar.cc",      // First domain
         "avatars.githubusercontent.com",  // Second domain
         
     ],
   },
   env: {
      MONGO_URI: process.env.MONGO_URI,
   },
};

module.exports = nextConfig;
