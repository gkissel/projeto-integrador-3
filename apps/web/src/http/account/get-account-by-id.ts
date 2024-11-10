import { api } from '../api-client'

interface GetAccountRequest {
  org: string
  accountId: string
}

type GetAccountResponse = {
  account: {
    id: string
    name: string
    imageUrl: string | undefined
    value: number
    orgId: string
    mainColor: string | undefined
    createdAt: string
    updatedAt: string
  }
}

export async function getAccount({
  accountId,
  org,
}: GetAccountRequest): Promise<GetAccountResponse> {
  const accounts = await api
    .get(`organizations/${org}/accounts/${accountId}`)
    .json<GetAccountResponse>()

  return accounts
}
