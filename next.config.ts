/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
        port: "",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com", // Add this line
        port: "",
      },
    ],
  },
};

export default nextConfig;
