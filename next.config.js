/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // domains: ["hltukherhizzxvjaqqcj.supabase.co"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "hltukherhizzxvjaqqcj.supabase.co",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
    ],
  },
};

module.exports = nextConfig;
