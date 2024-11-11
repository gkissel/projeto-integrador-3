import { api } from '../api-client'

interface Transaction {
  id: string
  description: string
  value: number
  type: 'INCOME' | 'OUTCOME'
  orgId: string
  accountId: string
  createdAt: string
  updatedAt: string
}

interface GetTransactionsByAccountResponse {
  transactions: Transaction[]
}

export async function getTransactionsByAccount(
  org: string,
  accountId: string,
): Promise<GetTransactionsByAccountResponse> {
  const response = await api
    .get(`organizations/${org}/accounts/${accountId}/transactions`, {
      next: {
        tags: ['transaction'],
      },
    })
    .json<GetTransactionsByAccountResponse>()

  return response
}
