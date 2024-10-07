import { and, eq } from 'drizzle-orm'
import type { FastifyInstance } from 'fastify'
import { fastifyPlugin } from 'fastify-plugin'

import { NotAllowedError } from '@/core/errors/not-allowed-error'
import { db } from '@/infra/database/postgres/connection.service'
import { members, organizations } from '@/infra/database/postgres/schema'

export const auth = fastifyPlugin(async (app: FastifyInstance) => {
  app.addHook('preHandler', async (request) => {
    request.getCurrentUserId = async () => {
      try {
        const { sub } = await request.jwtVerify<{ sub: string }>()

        return sub
      } catch {
        throw new NotAllowedError()
      }
    }

    request.getUserMembership = async (slug: string) => {
      const userId = await request.getCurrentUserId()

      const [member] = await db
        .select()
        .from(members)
        .innerJoin(organizations, eq(members.orgId, organizations.id))
        .where(and(eq(members.userId, userId), eq(organizations.slug, slug)))
        .limit(1)
        .execute()

      if (!member) {
        throw new NotAllowedError()
      }

      const { organizations: organization, members: membership } = member

      return {
        organization,
        membership,
      }
    }
  })
})
