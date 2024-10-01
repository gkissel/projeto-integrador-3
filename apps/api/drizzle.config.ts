import type { Config } from 'drizzle-kit'

import { env } from './src/infra/env'

export default {
  dialect: 'postgresql',
  schema: './src/infra/database/postgres/schema/index.ts',
  out: './drizzle',
  dbCredentials: {
    url: env.DATABASE_URL,
  },
} satisfies Config
