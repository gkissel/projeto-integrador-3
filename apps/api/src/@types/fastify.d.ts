import 'fastify'

type DrizzleMember = {
  id: string
  createdAt: Date | null
  updatedAt: Date | null
  orgId: string
  role: 'ADMIN' | 'MEMBER' | 'OWNER'
  userId: string
}

declare module 'fastify' {
  export interface FastifyRequest {
    getCurrentUserId(): Promise<string>
    getUserMembership(
      slug: string,
    ): Promise<{ organization: Organization; membership: DrizzleMember }>
  }
}
