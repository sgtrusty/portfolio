import remarkGfm from 'remark-gfm';
import createMDX from '@next/mdx';


/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  images: {
      loader: 'custom',
      loaderFile: './lib/bundler/image-loader.js',
  },
  // experimental: {
  //   serverActions: {
  //     allowedOrigins: ['localhost:3000']
  //   }
  // }
};

// TODO: Add more plugins like rehype & properly use it
const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: []
  }
});

export default withMDX(nextConfig);
