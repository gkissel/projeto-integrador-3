import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { DrizzleTransactionMapper } from '@/infra/database/postgres/mappers/transactions.drizzle.mapper'

import { makeGetTransactionByIdService } from '../../factories/transaction/get-transaction-by-id.factory'
import { auth } from '../../middlewares/auth'

export async function getTransactionById(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/organizations/:slug/accounts/:accountId/transactions/:transactionId',
      {
        schema: {
          tags: ['Transaction'],
          security: [{ bearerAuth: [] }],
          summary: 'Get transaction by ID',
          params: z.object({
            slug: z.string(),
            accountId: z.string(),
            transactionId: z.string(),
          }),
          response: {
            200: z.object({
              transaction: z.object({
                id: z.string(),
                description: z.string(),
                value: z.number(),
                type: z.enum(['INCOME', 'OUTCOME']),
                orgId: z.string(),
                accountId: z.string(),
                createdAt: z.string(),
                updatedAt: z.string(),
              }),
            }),
            404: z.object({
              message: z.string(),
            }),
          },
        },
      },
      async (request, reply) => {
        const getTransactionByIdService = makeGetTransactionByIdService()
        const { slug, transactionId } = request.params

        await request.getUserMembership(slug)

        const response = await getTransactionByIdService.execute({
          transactionId,
        })

        if (response.isLeft()) {
          const error = response.value
          throw error
        }

        const { transaction } = response.value

        return reply
          .status(200)
          .send({ transaction: DrizzleTransactionMapper.toHTTP(transaction) })
      },
    )
}
