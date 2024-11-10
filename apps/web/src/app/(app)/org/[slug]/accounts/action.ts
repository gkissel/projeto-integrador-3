'use server'

import { HTTPError } from 'ky'
import { revalidateTag } from 'next/cache'
import { z } from 'zod'

import { getCurrentOrg } from '@/auth/auth'
import { createAccount } from '@/http/account/create-account'
import { getAccounts } from '@/http/account/get-accounts-by-organization'
import { updateAccountImage } from '@/http/account/update-account-image'

const createAccountSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  image: z.instanceof(File, { message: 'Imagem é obrigatória' }),
  balance: z.coerce
    .number({ invalid_type_error: 'Saldo deve ser um número' })
    .min(0, 'Saldo deve ser maior ou igual a zero'),
})

export async function createAccountAction(formData: FormData) {
  const result = createAccountSchema.safeParse(Object.fromEntries(formData))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors
    return { success: false, message: null, errors }
  }

  const { name, image, balance } = result.data

  try {
    const currentOrg = await getCurrentOrg()

    const { id } = await createAccount({
      name,
      org: currentOrg!,
      value: balance,
    })

    const buffer = Buffer.from(await image.arrayBuffer())
    const imageBase64 = buffer.toString('base64')

    await updateAccountImage({
      accountId: id,
      imageBlob: imageBase64,
      org: currentOrg!,
    })

    revalidateTag('accounts')
  } catch (err) {
    console.error(err)
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

  return {
    success: true,
    message: 'Conta criada com sucesso.',
    errors: null,
  }
}

export async function getAccountsAction(org: string) {
  const { accounts } = await getAccounts({ org })

  return accounts
}
