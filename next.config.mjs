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
    }
};

export default nextConfig;
