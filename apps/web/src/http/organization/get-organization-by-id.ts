import { api } from '../api-client'

interface GetOrganizationResponse {
  organization: {
    slug: string
    id: string
    name: string
    createdAt: string
    updatedAt: string
    ownerId: string
  }
}

export async function getOrganizationById(orgId: string) {
  const result = await api
    .get(`organization/${orgId}`, {
      next: {
        tags: ['organization'],
      },
    })
    .json<GetOrganizationResponse>()

  return result
}
