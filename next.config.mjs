/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/wildkernels-canary',
  assetPrefix: '/wildkernels-canary',
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: ["192.168.1.131"],
}

export default nextConfig