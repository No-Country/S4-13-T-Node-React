/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {},
  reactStrictMode: true,
  swcMinify: true,
  env: {
    APIURL: 'http://localhost:8080',
  },
};

module.exports = nextConfig;

// domains: [
//   'localhost',
//   'img.etimg.com',
//   'loremflickr.com',
//   'assets.vogue.com',
//   'm.media-amazon.com',
//   'upload.wikimedia.org',
// ],
// formats: ['image/webp'],
