'use server'

import { HTTPError } from 'ky'
import { z } from 'zod'

import { signUp } from '@/http/user/create-user'

const signUpSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),

  telephone: z.string(),
  birthdate: z.coerce.date(),
  email: z
    .string()
    .email({ message: 'Please, provide a valid e-mail address.' }),
  password: z
    .string()
    .min(6, { message: 'Password should have at least 6 characters.' }),
})

export async function signUpAction(data: FormData) {
  const result = signUpSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    console.log(errors)
    return { success: false, message: null, errors }
  }

  const { firstName, lastName, birthdate, telephone, email, password } =
    result.data

  try {
    await signUp({
      firstName,
      lastName,
      birthdate,
      telephone,
      email,
      password,
    })
  } catch (err) {
    if (err instanceof HTTPError) {
      console.log(await err.response.body)
      const { message } = await err.response.json()

      // console.log(message)
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
