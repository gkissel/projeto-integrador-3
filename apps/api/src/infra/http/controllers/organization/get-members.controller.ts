import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { makeGetMembersService } from '../../factories/organization/get-members.factory'
import { auth } from '../../middlewares/auth'

export async function getMembers(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/organizations/:slug/members',
      {
        schema: {
          tags: ['Organizations'],
          summary: 'Get members on organization',
          security: [{ bearerAuth: [] }],
          params: z.object({
            slug: z.string(),
          }),
          response: {
            200: z.object({
              members: z.array(
                z.object({
                  id: z.string().uuid(),
                  role: z.union([
                    z.literal('ADMIN'),
                    z.literal('MEMBER'),
                    z.literal('OWNER'),
                  ]),
                  userId: z.string().uuid(),
                  orgId: z.string().uuid(),
                }),
              ),
            }),
          },
        },
      },
      async (request) => {
        const { slug } = request.params

        const { membership } = await request.getUserMembership(slug)

        const getMembersService = makeGetMembersService()

        const response = await getMembersService.execute(membership)

        if (response.isLeft()) {
          const error = response.value

          throw error
        }

        // console.log(response.value)
        const { members } = response.value

        return {
          members: members.map((member) => ({
            id: member.id.toString(),
            role: member.role,
            userId: member.userId.toString(),
            orgId: member.orgId.toString(),
          })),
        }
      },
    )
}
