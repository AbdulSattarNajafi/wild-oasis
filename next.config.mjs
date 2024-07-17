/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "xlnvawkhmvrfpehbutly.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/**",
      },
    ],
    domains: ["lh3.googleusercontent.com"],
  },
  // output: "export",
};

export default nextConfig;
