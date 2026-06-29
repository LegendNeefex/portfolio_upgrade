/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images: {
    unoptimized: true,
    qualities: [100,75,50,25],
    remotePatterns: [
      { protocol: "https", hostname: "mrbayinqyfletaxhtbpr.supabase.co" }
    ],
    formats: ["image/webp", "image/avif"], // modern formats = faster load
  },
  compress: true, // gzip compression
};

export default nextConfig;
