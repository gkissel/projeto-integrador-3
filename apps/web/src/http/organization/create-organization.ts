import { api } from '../api-client'

interface CreateOrganizationRequest {
  name: string
}

type CreateOrganizationResponse = {
  id: string
}

export async function createOrganization({
  name,
}: CreateOrganizationRequest): Promise<CreateOrganizationResponse> {
  const id = await api.post<CreateOrganizationResponse>('organizations', {
    json: {
      name,
    },
  })

  return id.json()
}
