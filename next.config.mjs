import { withPayload } from '@payloadcms/next/withPayload'
import path from 'path'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your Next.js config
  // experimental: {
  //   reactCompiler: false,
  // }
  webpack: (config) => {
    config.resolve.alias['@payload-config'] = path.resolve(process.cwd(), 'src/payload.config.ts')
    return config
  }
}

export default withPayload(nextConfig)
