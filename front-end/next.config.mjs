/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_BASE_URL: "http://localhost:4040/api",
    GITHUB_ID: "61da5f66ad65f06ae1ab",
    GITHUB_SECRET: "f441114f3cdf37a86fccfe799dd9714789cee9b1",
    GOOGLE_ID:
      "252810754059-tfa0voe2rhh24sodunf7e10ac477t9h6.apps.googleusercontent.com",
    GOOGLE_SECRET: "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",
    NEXTAUTH_URL: "http://localhost:3000",
    NEXTAUTH_SECRET:
      "d53b46c5379c720844988f6355a4e0a306399096521aaea8aa92166f495275b623e3a90d4a3bc0df30216956f44e7f48a4bcfca04479d8b6d18e8ef80a5027d1",
    SOCKET_URL: "http://localhost:4040",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
