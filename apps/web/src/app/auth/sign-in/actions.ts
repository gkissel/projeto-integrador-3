'use server'

import { HTTPError } from 'ky'
import { cookies } from 'next/headers'
import { z } from 'zod'

import { acceptInvite } from '@/http/invite/accept-invite'
import { signIn } from '@/http/user/sign-in'

const signInSchema = z.object({
  email: z
    .string()
    .email({ message: 'Por favor, forneça um endereço de e-mail válido.' }),
  password: z.string().min(1, { message: 'Por favor, forneça sua senha.' }),
})

export async function signInWithEmailAndPassword(data: FormData) {
  const result = signInSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  const { email, password } = result.data

  try {
    const { token } = await signIn({
      email,
      password,
    })

    ;(await cookies()).set('token', token, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    const inviteId = (await cookies()).get('inviteId')?.value

    if (inviteId) {
      try {
        await acceptInvite(inviteId)
        ;(await cookies()).delete('inviteId')
      } catch (e) {
        console.log(e)
      }
    }
  } catch (err) {
    if (err instanceof HTTPError) {
      const { message } = await err.response.json()

      return { success: false, message, errors: null }
    }

    console.error(err)

    return {
      success: false,
      message: 'Erro inesperado. Tente novamente em alguns minutos.',
      errors: null,
    }
  }

  return { success: true, message: null, errors: null }
}
