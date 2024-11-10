/* eslint-disable drizzle/enforce-delete-with-where */
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { makeDenyInviteService } from '../../factories/invite/deny-invite.factory'
import { auth } from '../../middlewares/auth'

export async function denyInvite(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
      '/invites/:inviteId/reject',
      {
        schema: {
          tags: ['Invites'],
          summary: 'Deny invite for organization',
          security: [{ bearerAuth: [] }],
          params: z.object({
            inviteId: z.string().uuid(),
          }),
          response: {
            204: z.null(),
          },
        },
      },
      async (request, reply) => {
        const { inviteId } = request.params

        const userId = await request.getCurrentUserId()

        const denyInviteService = makeDenyInviteService()

        const response = await denyInviteService.execute({
          id: inviteId,
          userId,
        })

        if (response.isLeft()) {
          const error = response.value
          throw error
        }

        reply.status(204).send()
      },
    )
}
