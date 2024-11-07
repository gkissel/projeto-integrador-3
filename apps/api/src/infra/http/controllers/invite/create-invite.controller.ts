import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { makeCreateInviteService } from '../../factories/invite/create-invite.factory'
import { auth } from '../../middlewares/auth'

export async function createInvite(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
      '/organizations/:slug/invites',
      {
        schema: {
          tags: ['Invites'],
          summary: 'Create invite for organization',
          security: [{ bearerAuth: [] }],
          params: z.object({
            slug: z.string(),
          }),
          body: z.object({
            email: z.string().email(),
            role: z.union([z.literal('ADMIN'), z.literal('MEMBER')]),
          }),
          response: {
            201: z.object({
              invite: z.object({
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
            }),
          },
        },
      },
      async (request) => {
        const { slug } = request.params
        const { email, role } = request.body

        const { organization, membership } =
          await request.getUserMembership(slug)

        const createInviteService = makeCreateInviteService()

        const response = await createInviteService.execute({
          email,
          role,
          organizationId: organization.id.toString(),
          authorId: membership.userId.toString(),
        })

        if (response.isLeft()) {
          const error = response.value
          throw error
        }

        const { invite } = response.value

        return {
          invite: {
            email: invite.email,
            role: invite.role,
            id: invite.id.toString(),
            orgId: invite.orgId.toString(),
            authorId: invite.authorId.toString(),
          },
        }
      },
    )
}
