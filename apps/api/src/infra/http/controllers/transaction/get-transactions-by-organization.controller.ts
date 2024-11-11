import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { makeGetTransactionsByOrganizationService } from '../../factories/transaction/get-transactions-by-organization.factory'
import { auth } from '../../middlewares/auth'

export async function getTransactionsByOrganization(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/organizations/:slug/transactions',
      {
        schema: {
          tags: ['Transaction'],
          security: [{ bearerAuth: [] }],
          summary: 'Get transactions by organization',
          params: z.object({
            slug: z.string(),
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
        const getTransactionsByOrganizationService =
          makeGetTransactionsByOrganizationService()
        const { slug } = request.params

        const { organization } = await request.getUserMembership(slug)

        const response = await getTransactionsByOrganizationService.execute({
          orgId: organization.id,
        })

        if (response.isLeft()) {
          const error = response.value
          throw error
        }

        const { transactions } = response.value

        return reply.status(200).send({
          transactions: transactions.map((transaction) => ({
            accountId: transaction.accountId.toString(),
            createdAt:
              transaction.createdAt?.toISOString() ?? new Date().toISOString(),
            description: transaction.description,
            id: transaction.id.toString(),
            orgId: transaction.orgId.toString(),
            value: transaction.value,
            type: transaction.type,
            updatedAt:
              transaction.updatedAt?.toISOString() ?? new Date().toISOString(),
          })),
        })
      },
    )
}
