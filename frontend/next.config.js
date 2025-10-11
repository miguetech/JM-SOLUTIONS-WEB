const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    esmExternals: false,
  },
  webpack: (config, { isServer }) => {
    // Ensure that we resolve modules correctly
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };
    
    // Add explicit alias resolution for @ paths
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, 'src'),
    };
    
    return config;
  },
}

module.exports = nextConfig
