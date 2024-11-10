import { api } from '../api-client'

interface GetPendingInvitesResponse {
  invites: {
    id: string
    role: 'ADMIN' | 'MEMBER' | 'OWNER'
    email: string
    orgId: string
    authorId: string
    createdAt: string
  }[]
}

export async function getPendingInvites() {
  const result = await api
    .get('users/invites', {
      next: {
        tags: ['pending-invites'],
        revalidate: 60,
      },
    })
    .json<GetPendingInvitesResponse>()

  return result
}
