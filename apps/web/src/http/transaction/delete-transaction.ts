import { api } from '../api-client'

interface DeleteTransactionResponse {
  id: string
}

export async function deleteTransaction(
  org: string,
  transactionId: string,
): Promise<DeleteTransactionResponse> {
  const response = await api
    .delete(`organizations/${org}/transactions/${transactionId}`)
    .json<DeleteTransactionResponse>()

  return response
}
