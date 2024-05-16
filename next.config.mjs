import million from 'million/compiler';
 
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.unsplash.com',
      }
    ],
  },
};
 
const millionConfig = {
  auto: { 
    threshold: 0.25,
    rsc: true,
    skip: ['useBadHook', /badVariable/g] 
  },
}
 
export default million.next(nextConfig, millionConfig);