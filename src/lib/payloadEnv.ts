const LOCAL_DATABASE_URL = 'postgresql://postgres:postgres@127.0.0.1:5432/iterra'
const LOCAL_PAYLOAD_SECRET = 'iterra-local-development-secret'
const LOCAL_SERVER_URL = 'http://localhost:3000'

const isProduction = process.env.NODE_ENV === 'production'

const requireEnv = (value: string | undefined, name: string, fallback?: string) => {
  if (value) {
    return value
  }

  if (!isProduction && fallback) {
    return fallback
  }

  throw new Error(
    `[payload] Missing required environment variable: ${name}. ` +
      `Set it before starting Payload in ${isProduction ? 'production' : 'this environment'}.`,
  )
}

export const hasPayloadRuntimeEnv = Boolean(process.env.DATABASE_URL && process.env.PAYLOAD_SECRET)

export const getPayloadEnv = () => ({
  connectionString: requireEnv(process.env.DATABASE_URL, 'DATABASE_URL', LOCAL_DATABASE_URL),
  secret: requireEnv(process.env.PAYLOAD_SECRET, 'PAYLOAD_SECRET', LOCAL_PAYLOAD_SECRET),
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || LOCAL_SERVER_URL,
})
