/** @type {import('next').NextConfig} */

const imagesRemotePatterns =
  process.env.NEXT_PUBLIC_ENV === "prod"
    ? [
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
      ]
    : [
        {
          protocol: "http",
          hostname: "localhost",
          port: "8000",
          pathname: "/user_avatars/**",
        },
      ];

const nextConfig = {
  reactStrictMode: process.env.NEXT_PUBLIC_ENV === "prod",
  images: {
    remotePatterns: imagesRemotePatterns,
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
