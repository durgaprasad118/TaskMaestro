/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['github.com'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                pathname: '/a/**'
            },
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
                pathname: '/**'
            }
        ]
    },
    compiler: {
        removeConsole:
            process.env.NODE_ENV === 'production'
                ? { exclude: ['error'] }
                : false
    }
};

export default nextConfig;
