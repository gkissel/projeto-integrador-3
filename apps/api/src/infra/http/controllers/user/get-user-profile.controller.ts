import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { makeGetUserProfileService } from '../../factories/user/get-user-profile.factory'
import { auth } from '../../middlewares/auth'

export async function getProfile(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/profile',
      {
        schema: {
          tags: ['Auth'],
          summary: 'Get authenticated user profile',
          security: [{ bearerAuth: [] }],
          response: {
            200: z.object({
              user: z.object({
                id: z.string().uuid(),
                firstName: z.string(),
                lastName: z.string(),
                birthdate: z.date(),
                telephone: z.string(),
                email: z.string().email(),
              }),
            }),
          },
        },
      },
      async (request, reply) => {
        const userId = await request.getCurrentUserId()

        const getUserProfileService = makeGetUserProfileService()

        const response = await getUserProfileService.execute({
          userId,
        })

        if (response.isLeft()) {
          const error = response.value

          throw error
        }

        const { user } = response.value

        return reply.send({
          user: {
            firstName: user.firstName,
            lastName: user.lastName,
            birthdate: user.birthdate,
            telephone: user.telephone,
            email: user.email,
            id: user.id.toString(),
          },
        })
      },
    )
}
