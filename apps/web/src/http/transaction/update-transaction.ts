import { api } from '../api-client'

interface UpdateTransactionRequest {
  description?: string
  value?: number
  type?: 'INCOME' | 'OUTCOME'
}

interface UpdateTransactionResponse {
  id: string
}

export async function updateTransaction(
  org: string,
  transactionId: string,
  data: UpdateTransactionRequest,
): Promise<UpdateTransactionResponse> {
  const response = await api
    .patch(`organizations/${org}/transactions/${transactionId}`, {
      json: data,
    })
    .json<UpdateTransactionResponse>()

  return response
}
