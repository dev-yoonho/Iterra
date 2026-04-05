import { getAgentSignals } from '@/lib/content'

export const getPresenceSnapshot = async () => {
  const signals = await getAgentSignals()

  return {
    generatedAt: new Date().toISOString(),
    signals,
    mode: 'ambient',
  }
}
