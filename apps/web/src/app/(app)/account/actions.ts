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
    .refine(
      (val) => val.length === 15 && /^\(\d{2}\)\s\d{5}-\d{4}$/.test(val),
      {
        message: 'Número de telefone inválido.',
      },
    ),
})
const TransferSchema = z.object({
  destination: z.string().min(1, { message: 'Destino inválido.' }),
  date: z.string().refine(
    (val) => {
      const date = new Date(val)
      return !isNaN(date.getTime())
    },
    { message: 'Data inválida.' },
  ),
  amount: z
    .number({ invalid_type_error: 'Valor deve ser numérico.' })
    .positive({ message: 'O valor deve ser positivo.' })
    .refine((val) => val > 0, { message: 'O valor deve ser maior que zero.' }),
  account: z.string().min(1, { message: 'Conta inválida.' }),
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
