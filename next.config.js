/** @type {import('next').NextConfig} */
let allowedOrigins = ['127.0.0.1:' + process.env.LOCAL_PORT];
process.env.BASE_URL ? allowedOrigins.push(process.env.BASE_URL) : null;

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    styledComponents: true,
    serverActions: { 
      allowedOrigins: allowedOrigins,
    },
  },
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" }, // replace this your actual origin
          { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
        ]
      }
    ];
  }
};

module.exports = {
  crossOrigin: 'anonymous',
  compiler: {
      // Enables the styled-components SWC transform
    styledComponents: true
  }
}
//module.exports = nextConfig;
