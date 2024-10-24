'use server'

import { cookies } from 'next/headers'

export async function getToken() {
  return (await cookies()).get('token')?.value
}
