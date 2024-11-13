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
      {
        protocol: "https",
        hostname: "gambler-pawns-backend-staging.up.railway.app",
        port: "",
        pathname: "/user_avatars/**",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/engines/(.*)",
        headers: [
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
          {
            key: "Cross-Origin-Embedder-Policy",
            value: "require-corp",
          },
          {
            key: "Cross-Origin-Resource-Policy",
            value: "cross-origin",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
