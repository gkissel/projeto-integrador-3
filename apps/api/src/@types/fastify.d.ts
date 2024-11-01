import 'fastify'

import { DrizzleMember } from '@/infra/database/postgres/repositories/members.drizzle.repository'

declare module 'fastify' {
  export interface FastifyRequest {
    getCurrentUserId(): Promise<string>
    getUserMembership(
      slug: string,
    ): Promise<{ organization: Organization; membership: DrizzleMember }>
  }
}
