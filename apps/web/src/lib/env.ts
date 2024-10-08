/* eslint-disable import/prefer-default-export */
import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  server: {
    SERVER_PORT: z.coerce.number().default(3333),
  },
  client: {},
  shared: {
    NEXT_PUBLIC_API_URL: z.string().url().default('http://localhost:3333/'),
  },
  runtimeEnv: {
    SERVER_PORT: process.env.SERVER_PORT,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  emptyStringAsUndefined: true,
})
