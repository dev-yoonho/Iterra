import { cache } from 'react'

import { hasPayloadRuntimeEnv } from '@/lib/payloadEnv'

export const isPayloadConfigured = hasPayloadRuntimeEnv

export const getPayloadClient = cache(async () => {
  if (!isPayloadConfigured) {
    return null
  }

  const [{ getPayloadHMR }, { default: config }] = await Promise.all([
    import('@payloadcms/next/utilities'),
    import('@payload-config'),
  ])

  return getPayloadHMR({ config })
})
