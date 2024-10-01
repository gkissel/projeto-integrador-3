import 'dotenv/config'

import z from 'zod'

const envSchema = z.object({
  PORT: z.coerce.number().default(3333),
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string().default('pi-secret'),
  NODE_ENV: z.enum(['development', 'test', 'production']).default('production'),
})

const parsedEnv = envSchema.safeParse(process.env)

if (!parsedEnv.success) {
  console.error('❌ Invalid environment variables', parsedEnv.error.format())
  throw new Error(`Invalid environment variables: ${parsedEnv.error.message}`)
}

export const env = parsedEnv.data
