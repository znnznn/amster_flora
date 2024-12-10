/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'amster-flora.s3.amazonaws.com',
                port: '',
                pathname: '/static/images/**'
            }
        ]
    }
}

export default nextConfig
