import { getPayload } from 'payload'
import { cache } from 'react'

import { hasPayloadRuntimeEnv } from '@/lib/payloadEnv'

export const isPayloadConfigured = hasPayloadRuntimeEnv

export const getPayloadClient = cache(async () => {
  if (!isPayloadConfigured) {
    return null
  }

  const { default: config } = await import('@payload-config')

  return getPayload({ config })
})
