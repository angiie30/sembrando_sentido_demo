/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    COOKIE_NAME: process.env.COOKIE_NAME,
    PASSWORD: process.env.PASSWORD
  },
}

module.exports = nextConfig
