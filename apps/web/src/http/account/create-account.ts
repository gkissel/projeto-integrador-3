import { api } from '../api-client'

interface CreateAccountRequest {
  org: string
  name: string
  value: number
}

type CreateAccountResponse = {
  id: string
}

export async function createAccount({
  org,
  name,
  value,
}: CreateAccountRequest): Promise<CreateAccountResponse> {
  const id = await api
    .post(`organizations/${org}/accounts`, {
      json: {
        name,
        value,
      },
    })
    .json<{
      id: string
    }>()

  return id
}
