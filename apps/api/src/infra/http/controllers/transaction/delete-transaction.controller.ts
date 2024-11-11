import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { makeDeleteTransactionService } from '../../factories/transaction/delete-transaction.factory'
import { auth } from '../../middlewares/auth'

export async function deleteTransaction(app: FastifyInstance) {
  // eslint-disable-next-line drizzle/enforce-delete-with-where
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .delete(
      '/organizations/:slug/transactions/:transactionId',
      {
        schema: {
          tags: ['Transaction'],
          security: [{ bearerAuth: [] }],
          summary: 'Delete a transaction',
          params: z.object({
            slug: z.string(),
            transactionId: z.string(),
          }),
          response: {
            200: z.object({
              id: z.string(),
            }),
            404: z.object({
              message: z.string(),
            }),
          },
        },
      },
      async (request, reply) => {
        const deleteTransactionService = makeDeleteTransactionService()
        const { slug, transactionId } = request.params

        await request.getUserMembership(slug)

        const response = await deleteTransactionService.execute(transactionId)

        if (response.isLeft()) {
          const error = response.value
          throw error
        }

        const { transaction } = response.value

        return reply.status(200).send({ id: transaction.id.toString() })
      },
    )
}
