import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { makeUpdateUserService } from '../../factories/user/update-user-factory'
import { auth } from '../../middlewares/auth'

export async function updateProfile(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .patch(
      '/profile',
      {
        schema: {
          tags: ['Auth'],
          summary: 'Update user profile',
          security: [{ bearerAuth: [] }],
          body: z.object({
            firstName: z.string().optional(),
            lastName: z.string().optional(),
            telephone: z.string().optional(),
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
        const userId = await request.getCurrentUserId()

        const updateUserService = makeUpdateUserService()

        const response = await updateUserService.execute({
          userId,
          ...request.body,
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
