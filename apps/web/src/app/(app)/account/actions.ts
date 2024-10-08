'use server'

import { HTTPError } from 'ky'
import { redirect } from 'next/navigation'
import { z } from 'zod'

import { deleteProfile } from '@/http/user/delete-user'
import { updateProfile } from '@/http/user/update-user'

const signUpSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),

  telephone: z.string().optional(),
})

export async function updateProfileAction(data: FormData) {
  const result = signUpSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    console.log(errors)
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
      console.log(await err.response.body)
      const { message } = await err.response.json()

      console.log(message)
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
