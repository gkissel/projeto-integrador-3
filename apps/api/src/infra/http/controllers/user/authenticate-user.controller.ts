import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { makeAuthenticateUserService } from '../../factories/user/authenticate-user-factory'

export async function authenticateWithPassword(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/sessions/password',
    {
      schema: {
        tags: ['Auth'],
        summary: 'Authenticate with e-mail & password',
        body: z.object({
          email: z.string().email(),
          password: z.string(),
        }),
        response: {
          201: z.object({
            token: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { email, password } = request.body

      const authenticateUserService = makeAuthenticateUserService()

      const user = await authenticateUserService.execute({ email, password })

      if (user.isLeft()) {
        const error = user.value

        throw error
      }

      const token = await reply.jwtSign(
        {
          sub: user.value.userId,
        },
        {
          sign: {
            expiresIn: '7d',
          },
        },
      )

      return reply.status(201).send({ token })
    },
  )
}
