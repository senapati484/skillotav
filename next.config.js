/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['randomuser.me'],
  },
};

module.exports = 
{
  env: {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
    GITHUB_TOKEN: process.env.GITHUB_TOKEN
  },
  api: {
    bodyParser: false
  },
  ...nextConfig,
};
