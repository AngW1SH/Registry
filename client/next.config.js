/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'http://localhost:8000/:path*' // Proxy to Backend
            },
            {
                source: '/strapi/:path*',
                destination: 'http://localhost:7000/:path*' // Proxy to Strapi
            }
        ]
    },
    headers: () => [
        {
            source: '/projects',
            headers: [
                {
                    key: 'Cache-Control',
                    value: 'no-store',
                },
            ],
        },
    ],
}

module.exports = nextConfig
