/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'loremflickr.com',
        pathname: 'loremflickr.com/640/480/cats',
      },
    ],
  },
  reactStrictMode: true,
  swcMinify: true,
  env: {
    APIURL: 'http://localhost:8080',
  },
  images: {
    domains: ['i.pravatar.cc'],
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
