import { api } from '../api-client'

interface GetOrganizationsResponse {
  organizations: {
    id: string
    name: string
    slug: string
    avatarUrl: string | null
  }[]
}

export async function getOrganizations() {
  const stats: GetOrganizationsResponse = { organizations: [] }
  return stats

  const result = await api.get('organizations').json<GetOrganizationsResponse>()

  return result
}
