/** @type {import('next').NextConfig} */
const nextConfig = {
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
