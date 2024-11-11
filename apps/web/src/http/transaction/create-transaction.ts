import { api } from '../api-client'

interface CreateTransactionRequest {
  org: string
  accountId: string
  description: string
  value: number
  type: 'INCOME' | 'OUTCOME'
}

type CreateTransactionResponse = {
  id: string
}

export async function createTransaction({
  org,
  accountId,
  description,
  value,
  type,
}: CreateTransactionRequest): Promise<CreateTransactionResponse> {
  const response = await api
    .post(`organizations/${org}/accounts/${accountId}/transactions`, {
      json: {
        description,
        value,
        type,
      },
    })
    .json<CreateTransactionResponse>()

  return response
}
