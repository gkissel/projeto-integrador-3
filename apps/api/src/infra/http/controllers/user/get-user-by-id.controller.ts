import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { makeGetUserProfileService } from '../../factories/user/get-user-profile.factory'
import { auth } from '../../middlewares/auth'

export async function getUserByID(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/users/:userId',
      {
        schema: {
          tags: ['Auth'],
          summary: 'Get a user profile from id',
          security: [{ bearerAuth: [] }],
          params: z.object({
            userId: z.string(),
          }),
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
        const { userId } = await request.params

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
