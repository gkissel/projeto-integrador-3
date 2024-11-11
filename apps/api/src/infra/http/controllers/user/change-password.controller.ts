import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { WrongCredentialsError } from '@/domain/money-app/application/services/errors/wrong-credentials-error'

import { makeUpdateUserPasswordService } from '../../factories/user/change-passowrd-user-factory'
import { auth } from '../../middlewares/auth'

export async function changePassword(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .patch(
      '/users/change-password',
      {
        schema: {
          tags: ['Users'],
          summary: 'Change user password',
          body: z.object({
            oldPassword: z.string(),
            newPassword: z.string().min(6),
          }),
          response: {
            200: z.object({}),
            401: z.object({
              message: z.string(),
            }),
            404: z.object({
              message: z.string(),
            }),
          },
        },
      },
      async (request, reply) => {
        const updateUserPasswordService = makeUpdateUserPasswordService()

        const userId = await request.getCurrentUserId()

        const response = await updateUserPasswordService.execute({
          userId,
          oldPassword: request.body.oldPassword,
          newPassword: request.body.newPassword,
        })

        if (response.isLeft()) {
          const error = response.value

          switch (error.constructor) {
            case ResourceNotFoundError:
              return reply.status(404).send({
                message: error.message,
              })
            case WrongCredentialsError:
              return reply.status(401).send({
                message: error.message,
              })
            default:
              throw error
          }
        }

        return reply.status(200).send()
      },
    )
}
