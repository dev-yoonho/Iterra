import { withPayload } from '@payloadcms/next/withPayload'

const nextConfig = {
  allowedDevOrigins: ['127.0.0.1', 'localhost'],
}

export default withPayload(nextConfig)
