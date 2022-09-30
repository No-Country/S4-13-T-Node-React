/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    APIURL: 'http://localhost:8080',
  },
  images: {
    domains: ['i.pravatar.cc', 'loremflickr.com'],
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
