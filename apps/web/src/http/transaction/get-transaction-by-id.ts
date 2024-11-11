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

interface GetTransactionByIdResponse {
  transaction: Transaction
}

export async function getTransactionById(
  org: string,
  accountId: string,
  transactionId: string,
): Promise<GetTransactionByIdResponse> {
  const response = await api
    .get(
      `organizations/${org}/accounts/${accountId}/transactions/${transactionId}`,
      {
        next: {
          tags: ['transaction'],
        },
      },
    )
    .json<GetTransactionByIdResponse>()

  return response
}
