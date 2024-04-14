/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.wattpad.com'
      }
    ]
  }
}

export default nextConfig
