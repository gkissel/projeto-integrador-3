import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { makeCreateTransactionService } from '../../factories/transaction/create-transaction.factory'
import { auth } from '../../middlewares/auth'

export async function createTransaction(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
      '/organizations/:slug/accounts/:accountId/transactions',
      {
        schema: {
          tags: ['Transaction'],
          security: [{ bearerAuth: [] }],
          summary: 'Create a new transaction',
          params: z.object({
            slug: z.string(),
            accountId: z.string(),
          }),
          body: z.object({
            description: z.string(),
            value: z.number(),
            type: z.enum(['INCOME', 'OUTCOME']),
          }),
          response: {
            201: z.object({
              id: z.string(),
            }),
            404: z.object({
              message: z.string(),
            }),
            409: z.object({
              message: z.string(),
            }),
          },
        },
      },
      async (request, reply) => {
        const createTransactionService = makeCreateTransactionService()
        const { slug, accountId } = request.params
        const { description, value, type } = request.body

        await request.getUserMembership(slug)

        const response = await createTransactionService.execute({
          accountId,
          description,
          value,
          type,
        })

        if (response.isLeft()) {
          const error = response.value
          throw error
        }

        const { transaction } = response.value

        return reply.status(201).send({ id: transaction.id.toString() })
      },
    )
}
