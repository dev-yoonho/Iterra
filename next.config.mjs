import { withPayload } from '@payloadcms/next/withPayload'

const nextConfig = {
  allowedDevOrigins: ['127.0.0.1', 'localhost'],
  images: {
    unoptimized: true,
  },
}

export default withPayload(nextConfig)
