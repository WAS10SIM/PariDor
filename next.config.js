/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: require('path').join(__dirname),
  compress: true,
  swcMinify: true,
  // Optimiser le cache Webpack pour éviter les erreurs de mémoire
  webpack: (config, { dev, isServer }) => {
    if (dev) {
      // En développement, désactiver le cache filesystem qui cause des problèmes de mémoire
      config.cache = false;
      // Ou utiliser un cache mémoire limité
      // config.cache = {
      //   type: 'memory',
      //   maxGenerations: 1,
      // };
    }
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000,
  },
  // Optimiser les bundles
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
    serverActions: true,
    // Streaming SSR amélioré
    serverComponentsExternalPackages: ['stripe'],
  },
  // Compiler optimisé - Supprimer console.log en production
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  // Headers pour cache optimisé
  async headers() {
    return [
      {
        source: '/:path*.(jpg|jpeg|png|webp|avif|svg|gif|ico)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:path*.(js|css)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:path*',
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
        ],
      },
    ];
  },
};

module.exports = nextConfig;
