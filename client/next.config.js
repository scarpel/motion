/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    INNER_BACKEND_URL: process.env.INNER_BACKEND_URL,
    OUTER_BACKEND_URL: process.env.OUTER_BACKEND_URL,
  },
};

module.exports = nextConfig;
