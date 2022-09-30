/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'localhost',
      'img.etimg.com',
      'loremflickr.com',
      'assets.vogue.com',
      'm.media-amazon.com',
      'upload.wikimedia.org',
    ],
    formats: ['image/webp'],
  },
  reactStrictMode: true,
  swcMinify: true,
  env: {
    APIURL: 'http://localhost:8080',
  },
};

module.exports = nextConfig;
