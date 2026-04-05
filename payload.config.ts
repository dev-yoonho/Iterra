import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { fileURLToPath } from 'node:url'
import path from 'path'
import sharp from 'sharp'
import { buildConfig } from 'payload'

import { CareerPosts } from './src/collections/CareerPosts'
import { DevelopmentPosts } from './src/collections/DevelopmentPosts'
import { LifePosts } from './src/collections/LifePosts'
import { Media } from './src/collections/Media'
import { Tags } from './src/collections/Tags'
import { Users } from './src/collections/Users'
import { AgentSignals } from './src/globals/AgentSignals'
import { HomeSections } from './src/globals/HomeSections'
import { SiteSettings } from './src/globals/SiteSettings'
import { getPayloadEnv } from './src/lib/payloadEnv'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const payloadEnv = getPayloadEnv()

export default buildConfig({
  admin: {
    user: Users.slug,
  },
  collections: [Users, Media, Tags, DevelopmentPosts, CareerPosts, LifePosts],
  db: postgresAdapter({
    pool: {
      connectionString: payloadEnv.connectionString,
    },
  }),
  editor: lexicalEditor(),
  globals: [SiteSettings, HomeSections, AgentSignals],
  secret: payloadEnv.secret,
  serverURL: payloadEnv.serverURL,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'src/payload-types.ts'),
  },
})
