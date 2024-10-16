/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gamblerpawns-api.up.railway.app",
        port: "",
        pathname: "/user_avatars/**",
      },
    ],
  },
  source: "/(.*)",
  headers: [
    {
      key: "Cross-Origin-Opener-Policy",
      value: "same-origin",
    },
    {
      key: "Cross-Origin-Embedder-Policy",
      value: "require-corp",
    },
  ],
};

export default nextConfig;
