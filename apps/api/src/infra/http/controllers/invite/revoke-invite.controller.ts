/* eslint-disable drizzle/enforce-delete-with-where */
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { makeRevokeInviteService } from '../../factories/invite/revoke-invite.factory'
import { auth } from '../../middlewares/auth'

export async function revokeInvite(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .delete(
      '/organizations/:slug/invites/:inviteId',
      {
        schema: {
          tags: ['Invites'],
          summary: 'Revoke invite for organization',
          security: [{ bearerAuth: [] }],
          params: z.object({
            slug: z.string(),
            inviteId: z.string().uuid(),
          }),
          response: {
            204: z.null(),
          },
        },
      },
      async (request, reply) => {
        const { slug, inviteId } = request.params

        const { membership } = await request.getUserMembership(slug)

        const revokeInviteService = makeRevokeInviteService()

        const response = await revokeInviteService.execute({
          inviteId,
          memberId: membership.id.toString(),
        })

        if (response.isLeft()) {
          const error = response.value
          throw error
        }

        reply.status(204).send()
      },
    )
}
