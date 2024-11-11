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

interface GetTransactionsByOrganizationResponse {
  transactions: Transaction[]
}

export async function getTransactionsByOrganization(
  org: string,
): Promise<GetTransactionsByOrganizationResponse> {
  const response = await api
    .get(`organizations/${org}/transactions`, {
      next: {
        tags: ['transaction'],
      },
    })
    .json<GetTransactionsByOrganizationResponse>()

  return response
}
