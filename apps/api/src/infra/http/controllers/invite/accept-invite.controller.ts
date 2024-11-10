/* eslint-disable drizzle/enforce-delete-with-where */
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { makeAcceptInviteService } from '../../factories/invite/accept-invite.factory'
import { auth } from '../../middlewares/auth'

export async function acceptInvite(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
      '/invites/:inviteId/accept',
      {
        schema: {
          tags: ['Invites'],
          summary: 'Accept invite for organization',
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

        const acceptInviteService = makeAcceptInviteService()

        const response = await acceptInviteService.execute({
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
