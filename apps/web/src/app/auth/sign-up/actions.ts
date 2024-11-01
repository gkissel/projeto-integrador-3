'use server'

import { HTTPError } from 'ky'
import { z } from 'zod'

import { signUp } from '@/http/user/create-user'

const signUpSchema = z.object({
  firstName: z.string().min(1, { message: 'Nome inválido.' }),
  lastName: z.string().min(1, { message: 'Sobrenome inválido.' }),
  telephone: z
    .string()
    .refine((val) => val.length === 11 && /^\d+$/.test(val), {
      message: 'Número de telefone inválido.',
    }),
  birthdate: z.string().refine(
    (val) => {
      const date = new Date(val)
      const now = new Date()
      return !Number.isNaN(date.getTime()) && date < now
    },
    { message: 'Data Inválida.' },
  ),
  email: z
    .string()
    .email({ message: 'Por favor, informe um endereço de e-mail válido.' }),
  password: z
    .string()
    .min(6, { message: 'A senha deve ter pelo menos 6 caracteres.' }),
})

export async function signUpAction(data: FormData) {
  const result = signUpSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    console.error(Object.fromEntries(data))
    console.log(errors)
    return { success: false, message: null, errors }
  }

  const { firstName, lastName, birthdate, telephone, email, password } =
    result.data

  try {
    const birthdateAsDate = new Date(birthdate)
    await signUp({
      firstName,
      lastName,
      birthdate: birthdateAsDate,
      telephone,
      email,
      password,
    })
  } catch (err) {
    if (err instanceof HTTPError) {
      // console.log(await err.response.body)
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
