/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,

    serverComponentsExternalPackages: ["bcrypt"],
  },
};

module.exports = nextConfig;
module.exports = {
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
};
