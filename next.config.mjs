/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // domains: ['*'],
    // domains: ['i.ytimg.com', 'scontent-sjc3-1.cdninstagram.com', 'scontent-lhr6-2.cdninstagram.com'],
    remotePatterns: [
      {
         protocol: "https",
         hostname: "**",
       },
    ],
  }

  
};

export default nextConfig;
