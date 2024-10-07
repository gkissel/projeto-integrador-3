import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { UserAlreadyExistsError } from '@/domain/money-app/application/services/errors/user-already-exists-error'

import { makeCreateUserService } from '../../factories/user/create-user.factory'

export async function createAccount(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/users',
    {
      schema: {
        tags: ['Auth'],
        summary: 'Create a new account',
        body: z.object({
          firstName: z.string(),
          lastName: z.string(),

          birthdate: z.coerce.date(),
          telephone: z.string(),
          email: z.string().email(),
          password: z.string().min(6),
        }),
      },
    },
    async (request, reply) => {
      const createUserService = makeCreateUserService()

      const response = await createUserService.execute(request.body)

      if (response.isLeft()) {
        const error = response.value

        switch (error.constructor) {
          case UserAlreadyExistsError:
            return reply.status(409).send({
              message: error.message,
            })

          default:
            throw error
        }
      }

      return reply.status(201).send()
    },
  )
}
