import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { makeRevokeMemberService } from '../../factories/member/revoke-member.factory'
import { auth } from '../../middlewares/auth'

/* eslint-disable drizzle/enforce-delete-with-where */

export async function revokeMember(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .delete(
      '/organizations/:slug/members/:memberId',
      {
        schema: {
          tags: ['Members'],
          summary: 'Revoke member from organization',
          security: [{ bearerAuth: [] }],
          params: z.object({
            slug: z.string(),
            memberId: z.string().uuid(),
          }),
          response: {
            204: z.null(),
          },
        },
      },
      async (request, reply) => {
        const { slug, memberId } = request.params

        const { membership } = await request.getUserMembership(slug)

        const revokeMemberService = makeRevokeMemberService()

        const response = await revokeMemberService.execute({
          memberId,
          organizationId: membership.orgId.toString(),
          userId: membership.userId.toString(),
        })

        console.log(response)
        if (response.isLeft()) {
          const error = response.value
          throw error
        }

        reply.status(204).send()
      },
    )
}
