import { CookiesFn } from 'cookies-next/lib/types'
import ky from 'ky'

import { env } from '@/lib/env'
import { getToken } from '@/lib/get-token'

export const api = ky.create({
  prefixUrl: env.NEXT_PUBLIC_API_URL,
  hooks: {
    beforeRequest: [
      async (request) => {
        let cookieStore: CookiesFn | undefined

        if (typeof window === 'undefined') {
          const { cookies: serverCookies } = await import('next/headers')

          cookieStore = await serverCookies
        }

        const token = await getToken()

        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`)
        }
      },
    ],
  },
})
