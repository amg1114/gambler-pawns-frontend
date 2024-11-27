/** @type {import('next').NextConfig} */

const onlyInProd = process.env.NEXT_PUBLIC_ENV === "prod";

const imagesRemotePatterns = onlyInProd
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
  reactStrictMode: false, //!onlyInProd, TODO: Random pairing logic not workign with strict mode
  images: {
    remotePatterns: imagesRemotePatterns,
  },
  compiler: {
    removeConsole: onlyInProd,
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
