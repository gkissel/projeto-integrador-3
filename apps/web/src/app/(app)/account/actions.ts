'use server'

import { HTTPError } from 'ky'
import { redirect } from 'next/navigation'
import { z } from 'zod'

import { deleteProfile } from '@/http/user/delete-user'
import { updateProfile } from '@/http/user/update-user'

const signUpSchema = z.object({
  firstName: z.string().min(1, { message: 'Nome inválido.' }),
  lastName: z.string().min(1, { message: 'Sobrenome inválido.' }),
  telephone: z
    .string()
    .refine((val) => val.length === 11 && /^\d+$/.test(val), {
      message: 'Número de telefone inválido.',
    }),
})

export async function updateProfileAction(data: FormData) {
  const result = signUpSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  const { firstName, lastName, telephone } = result.data

  try {
    await updateProfile({
      firstName,
      lastName,
      telephone,
    })
  } catch (err) {
    if (err instanceof HTTPError) {
      const { message } = await err.response.json()
      return { success: false, message, errors: null }
    }

    console.error(err)

    return {
      success: false,
      message: 'Unexpected error, try again in a few minutes.',
      errors: null,
    }
  }

  return { success: true, message: null, errors: null }
}

export async function deleteAccountAction() {
  try {
    await deleteProfile()
  } catch (err) {
    console.error(err)
  }

  redirect('/auth/sign-in')
}
