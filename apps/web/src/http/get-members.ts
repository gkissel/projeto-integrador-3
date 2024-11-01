import { Role } from '@repo/auth'

import { api } from './api-client'

interface GetMembersResponse {
  members: {
    id: string
    role: Role
    organizationId: string
    userId: string
  }[]
}

export async function getMembers(org: string) {
  const result = await api
    .get(`organizations/${org}/members`, {
      next: {
        tags: [`${org}/members`],
      },
    })
    .json<GetMembersResponse>()
  // console.log(result)
  return result
}
