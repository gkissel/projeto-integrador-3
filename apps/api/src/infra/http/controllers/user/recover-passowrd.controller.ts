import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'

import { makeRecoverPasswordService } from '../../factories/user/recover-passoword-user-factory'

export async function recoverPassword(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/users/recover-password',
    {
      schema: {
        tags: ['Users'],
        summary: 'Recover user password',
        body: z.object({
          email: z.string().email(),
        }),
        response: {
          200: z.object({
            recoverCode: z.string(),
          }),
          404: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const recoverPasswordService = makeRecoverPasswordService()

      const response = await recoverPasswordService.execute({
        email: request.body.email,
      })

      if (response.isLeft()) {
        const error = response.value

        if (error instanceof ResourceNotFoundError) {
          return reply.status(404).send({
            message: error.message,
          })
        }

        throw error
      }

      return reply.status(201).send({
        recoverCode: response.value.recoverCode,
      })
    },
  )
}
