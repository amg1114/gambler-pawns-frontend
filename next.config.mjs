/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'gamblerpawns-api.up.railway.app',
                port: '',
                pathname: '/user_avatars/**',
            }
        ]
    }
};

export default nextConfig;
