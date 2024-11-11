import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { DrizzleTransactionMapper } from '@/infra/database/postgres/mappers/transactions.drizzle.mapper'

import { makeGetTransactionsByAccountService } from '../../factories/transaction/get-transactions-by-account.factory'
import { auth } from '../../middlewares/auth'

export async function getTransactionsByAccount(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/organizations/:slug/accounts/:accountId/transactions',
      {
        schema: {
          tags: ['Transaction'],
          security: [{ bearerAuth: [] }],
          summary: 'Get transactions by account',
          params: z.object({
            slug: z.string(),
            accountId: z.string(),
          }),
          response: {
            200: z.object({
              transactions: z.array(
                z.object({
                  id: z.string(),
                  description: z.string(),
                  value: z.number(),
                  type: z.enum(['INCOME', 'OUTCOME']),
                  orgId: z.string(),
                  accountId: z.string(),
                  createdAt: z.string(),
                  updatedAt: z.string(),
                }),
              ),
            }),
          },
        },
      },
      async (request, reply) => {
        const getTransactionsByAccountService =
          makeGetTransactionsByAccountService()
        const { slug, accountId } = request.params

        await request.getUserMembership(slug)

        const response = await getTransactionsByAccountService.execute({
          accountId,
        })

        if (response.isLeft()) {
          const error = response.value
          throw error
        }

        const { transactions } = response.value

        return reply.status(200).send({
          transactions: transactions.map(DrizzleTransactionMapper.toHTTP),
        })
      },
    )
}
