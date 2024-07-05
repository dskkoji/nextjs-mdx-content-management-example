import createMDX from '@next/mdx'

const withMdx = createMDX({
  experimental: {
    mdxRs: true,
  },
  options: {
    remarkPlugins: [],
    rehypePlugins: []
  }
})


/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx","md", "mdx","ts","tsx"],
  images: {
    remotePatterns: [
     {
      protocol: "https",
      hostname: "avatars.githubusercontent.com"
     }
    ]
  }
}

export default withMdx(nextConfig)
// module.exports = nextConfig
