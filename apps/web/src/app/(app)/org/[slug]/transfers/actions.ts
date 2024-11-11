'use server'
import { HTTPError } from 'ky'
import { revalidateTag } from 'next/cache'
import { z } from 'zod'

import { getCurrentOrg } from '@/auth/auth'
import { createTransaction } from '@/http/transaction/create-transaction'
import { deleteTransaction } from '@/http/transaction/delete-transaction'
import { updateTransaction } from '@/http/transaction/update-transaction'

const createTransferSchema = z.object({
  description: z.string().min(1, 'Descrição é obrigatória'),
  value: z.coerce
    .number({ invalid_type_error: 'Valor deve ser um número' })
    .min(0, 'Valor deve ser maior que zero'),
  accountId: z.string().min(1, 'Conta é obrigatória'),
  type: z.enum(['INCOME', 'OUTCOME']),
})

export async function createTransactionAction(formData: FormData) {
  const result = createTransferSchema.safeParse(Object.fromEntries(formData))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors
    return { success: false, message: null, errors }
  }

  const { description, value, accountId, type } = result.data

  try {
    const currentOrg = await getCurrentOrg()

    await createTransaction({
      description,
      value,
      accountId,
      type,
      org: currentOrg!,
    })

    revalidateTag('transactions')
    revalidateTag('accounts')

    return {
      success: true,
      message: 'Transação criada com sucesso.',
      errors: null,
    }
  } catch (err) {
    console.error(err)
    if (err instanceof HTTPError) {
      const { message } = await err.response.json()
      return { success: false, message, errors: null }
    }

    return {
      success: false,
      message: 'Erro inesperado. Tente novamente em alguns minutos.',
      errors: null,
    }
  }
}

const updateTransferSchema = z.object({
  description: z.string().min(1, 'Descrição é obrigatória'),
  value: z.coerce
    .number({ invalid_type_error: 'Valor deve ser um número' })
    .min(0, 'Valor deve ser maior que zero'),
  type: z.enum(['INCOME', 'OUTCOME']),
  transactionId: z.string().min(1, 'ID da transação é obrigatório'),
})

export async function updateTransactionAction(formData: FormData) {
  const result = updateTransferSchema.safeParse(Object.fromEntries(formData))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors
    return { success: false, message: null, errors }
  }

  const { description, value, type, transactionId } = result.data

  try {
    const currentOrg = await getCurrentOrg()

    await updateTransaction(currentOrg!, transactionId, {
      description,
      value,
      type,
    })

    revalidateTag('transactions')
    revalidateTag('accounts')

    return {
      success: true,
      message: 'Transação atualizada com sucesso.',
      errors: null,
    }
  } catch (err) {
    console.error(err)
    if (err instanceof HTTPError) {
      const { message } = await err.response.json()
      return { success: false, message, errors: null }
    }

    return {
      success: false,
      message: 'Erro inesperado. Tente novamente em alguns minutos.',
      errors: null,
    }
  }
}

export async function deleteTransactionAction(transactionId: string) {
  try {
    const currentOrg = await getCurrentOrg()

    await deleteTransaction(currentOrg!, transactionId)

    revalidateTag('transactions')
    revalidateTag('accounts')
  } catch (err) {
    console.error(err)
  }
}
