import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['fakestoreapi.com', 'dummyjson.com', 'openweathermap.org'],
  },
  output: "standalone",
};

export default nextConfig;
