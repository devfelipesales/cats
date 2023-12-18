/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "hltukherhizzxvjaqqcj.supabase.co",
      },
    ],
  },
};

module.exports = nextConfig;
