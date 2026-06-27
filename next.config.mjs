/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images: {
    unoptimized: true,
    qualities: [100,75,50,25],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mrbayinqyfletaxhtbpr.supabase.co",
      },
    ]
  },
};

export default nextConfig;
