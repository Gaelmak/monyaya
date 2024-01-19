/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { 
    unoptimized: true,
    domains: ['lucide.dev', 'lucide.netlify.app', 'lh3.googleusercontent.com']
  },
  reactStrictMode: true,
  transpilePackages: ['lucide-react']
}

module.exports = nextConfig
