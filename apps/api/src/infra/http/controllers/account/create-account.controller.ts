import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { makeCreateAccountService } from '../../factories/account/create-account.factory'
import { auth } from '../../middlewares/auth'

export async function createMoneyAccount(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
      '/organizations/:slug/accounts',
      {
        schema: {
          tags: ['Account'],
          security: [{ bearerAuth: [] }],
          summary: 'Create a new account',
          params: z.object({
            slug: z.string(),
          }),
          body: z.object({
            name: z.string(),
            value: z.number(),
          }),
          response: {
            201: z.object({
              id: z.string(),
            }),
            409: z.object({
              message: z.string(),
            }),
          },
        },
      },
      async (request, reply) => {
        const createAccountService = makeCreateAccountService()
        const { slug } = request.params
        const { name, value } = request.body

        const { organization } = await request.getUserMembership(slug)

        const response = await createAccountService.execute({
          name,
          orgId: organization.id,
          value,
        })

        if (response.isLeft()) {
          const error = response.value
          throw error
        }

        const { account } = response.value

        return reply.status(201).send({ id: account.id.toString() })
      },
    )
}
