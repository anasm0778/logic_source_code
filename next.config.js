/** @type {import('next').NextConfig} */
const nextConfig = {
    // output: 'export',
    typescript: {
        ignoreBuildErrors: true,
    },
    trailingSlash: true,
    images: { 
        unoptimized: true,
        formats: ['image/webp', 'image/avif'],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    },
    reactStrictMode: false,  
    experimental: {
        missingSuspenseWithCSRBailout: false,
    },
    // SEO and Performance optimizations
    compress: true,
    poweredByHeader: false,
    generateEtags: true,
    
    // Headers for SEO
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
                    },
                    {
                        key: 'X-Frame-Options',
                        value: 'DENY',
                    },
                    {
                        key: 'X-XSS-Protection',
                        value: '1; mode=block',
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'origin-when-cross-origin',
                    },
                ],
            },
            {
                source: '/sitemap.xml',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=86400, s-maxage=86400',
                    },
                ],
            },
            {
                source: '/robots.txt',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=86400, s-maxage=86400',
                    },
                ],
            },
        ];
    },
    
    // Redirects for SEO
    async redirects() {
        return [
            {
                source: '/home',
                destination: '/',
                permanent: true,
            },
            {
                source: '/car-rental',
                destination: '/',
                permanent: true,
            },
            {
                source: '/rent-a-car',
                destination: '/',
                permanent: true,
            },
            {
                source: '/dubai-car-rental',
                destination: '/',
                permanent: true,
            },
        ];
    },
}

module.exports = nextConfig