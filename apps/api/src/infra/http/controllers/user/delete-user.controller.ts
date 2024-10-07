/* eslint-disable drizzle/enforce-delete-with-where */
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

import { makeDeleteUserService } from '../../factories/user/delete-user.factory'
import { auth } from '../../middlewares/auth'

export async function deleteProfile(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .delete(
      '/profile',
      {
        schema: {
          tags: ['Auth'],
          summary: 'Delete authenticated user profile',
          security: [{ bearerAuth: [] }],
        },
      },
      async (request, reply) => {
        const userId = await request.getCurrentUserId()

        const deleteUserProfileService = makeDeleteUserService()

        const response = await deleteUserProfileService.execute({
          userId,
        })

        if (response.isLeft()) {
          const error = response.value

          throw error
        }

        return reply.status(200).send()
      },
    )
}
