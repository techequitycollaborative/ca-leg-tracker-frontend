/** @type {import('next').NextConfig} */
let allowedOrigins = ['127.0.0.1:' + process.env.LOCAL_PORT];
process.env.BASE_URL ? allowedOrigins.push(process.env.BASE_URL) : null;

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: { 
      allowedOrigins: allowedOrigins,
    },
  },
};

module.exports = nextConfig;
