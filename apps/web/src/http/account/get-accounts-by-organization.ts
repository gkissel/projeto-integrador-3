import { api } from '../api-client'

interface GetAccountsRequest {
  org: string
}

type GetAccountsResponse = {
  accounts: {
    id: string
    name: string
    imageUrl: string | undefined
    value: number
    orgId: string
    mainColor: string | undefined
    createdAt: string
    updatedAt: string
  }[]
}

export async function getAccounts({
  org,
}: GetAccountsRequest): Promise<GetAccountsResponse> {
  const accounts = await api
    .get(`organizations/${org}/accounts`)
    .json<GetAccountsResponse>()

  return accounts
}
