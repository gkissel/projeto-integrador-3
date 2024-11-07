import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { makeGetInvitesByUserService } from '../../factories/invite/get-invites-by-user.factory'
import { auth } from '../../middlewares/auth'

export async function getInvitesByUser(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/users/invites',
      {
        schema: {
          tags: ['Invites'],
          summary: 'Get invites for current user',
          security: [{ bearerAuth: [] }],
          response: {
            200: z.object({
              invites: z.array(
                z.object({
                  id: z.string().uuid(),
                  role: z.union([
                    z.literal('ADMIN'),
                    z.literal('MEMBER'),
                    z.literal('OWNER'),
                  ]),
                  email: z.string().email(),
                  orgId: z.string().uuid(),
                  authorId: z.string().uuid(),
                }),
              ),
            }),
          },
        },
      },
      async (request) => {
        const userId = await request.getCurrentUserId()

        const getInvitesByUserService = makeGetInvitesByUserService()

        const response = await getInvitesByUserService.execute({
          userId,
        })

        if (response.isLeft()) {
          const error = response.value
          throw error
        }

        const { invites } = response.value

        return {
          invites: invites.map((invite) => ({
            email: invite.email,
            role: invite.role,
            id: invite.id.toString(),
            orgId: invite.orgId.toString(),
            authorId: invite.authorId.toString(),
          })),
        }
      },
    )
}
