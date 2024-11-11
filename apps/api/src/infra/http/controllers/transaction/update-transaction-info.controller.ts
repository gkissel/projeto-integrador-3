import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { makeUpdateTransactionInfoService } from '../../factories/transaction/update-transaction-info.factory'
import { auth } from '../../middlewares/auth'

export async function updateTransactionInfo(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .patch(
      '/organizations/:slug/transactions/:transactionId',
      {
        schema: {
          tags: ['Transaction'],
          security: [{ bearerAuth: [] }],
          summary: 'Update transaction information',
          params: z.object({
            slug: z.string(),
            transactionId: z.string(),
          }),
          body: z.object({
            description: z.string().optional(),
            value: z.number().optional(),
            type: z.enum(['INCOME', 'OUTCOME']).optional(),
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
        const updateTransactionInfoService = makeUpdateTransactionInfoService()
        const { slug, transactionId } = request.params
        const { description, value, type } = request.body

        await request.getUserMembership(slug)

        const response = await updateTransactionInfoService.execute({
          transactionId,
          description,
          value,
          type,
        })

        if (response.isLeft()) {
          const error = response.value
          throw error
        }

        const { transaction } = response.value

        return reply.status(200).send({ id: transaction.id.toString() })
      },
    )
}
