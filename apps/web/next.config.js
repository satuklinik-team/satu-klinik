/** @type {import('next').NextConfig} */
module.exports = {
  transpilePackages: ["@repo/ui"],
  reactStrictMode: true,
  output: "standalone",
  images: {
    remotePatterns: [
      {
        hostname: process.env.NEXT_PUBLIC_MINIO_PUBLIC_URL,
      },
    ],
  },
};
