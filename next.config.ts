import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Désactiver les vérifications strictes
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Désactiver les optimisations strictes
  reactStrictMode: false,
  // Config pour développement rapide
  swcMinify: false,
};

export default nextConfig;