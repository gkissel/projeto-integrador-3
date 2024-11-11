/* eslint-disable import/prefer-default-export */
import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  server: {
    SERVER_PORT: z.coerce.number().default(3333),
    EMAIL_USER: z.string().email().default('softbudgetof@gmail.com'),
    EMAIL_APP_PASSWORD: z.string().default('cqzg ddxb xive vhzu'),
  },
  client: {},
  shared: {
    NEXT_PUBLIC_API_URL: z.string().url().default('http://localhost:3333/'),
    NEXT_PUBLIC_BASE_URL: z.string().url().default('http://localhost:3000/'),
  },
  runtimeEnv: {
    SERVER_PORT: process.env.SERVER_PORT,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_APP_PASSWORD: process.env.EMAIL_APP_PASSWORD,
  },
  emptyStringAsUndefined: true,
})
