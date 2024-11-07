import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { makeGetInvitesByOrganizationService } from '../../factories/invite/get-invites-by-organization.factory'
import { auth } from '../../middlewares/auth'

export async function getInvitesByOrganization(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/organizations/:slug/invites',
      {
        schema: {
          tags: ['Organizations'],
          summary: 'Get invites on organization',
          security: [{ bearerAuth: [] }],
          params: z.object({
            slug: z.string(),
          }),
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
        const { slug } = request.params

        console.log(slug)
        const { organization } = await request.getUserMembership(slug)

        const getOrganizationInvitesService =
          makeGetInvitesByOrganizationService()

        const response = await getOrganizationInvitesService.execute({
          orgId: organization.id.toString(),
        })

        if (response.isLeft()) {
          const error = response.value

          throw error
        }

        // console.log(response.value)
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
