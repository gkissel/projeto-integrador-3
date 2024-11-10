import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { DrizzleAccountMapper } from '@/infra/database/postgres/mappers/acccount.drizzle.mapper'

import { makeGetAccountsByIdService } from '../../factories/account/get-account-by-id.factory'
import { auth } from '../../middlewares/auth'

export async function getAccountsById(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/organizations/:slug/accounts/:id',
      {
        schema: {
          tags: ['Account'],
          security: [{ bearerAuth: [] }],
          summary: 'Get a account from an ID',
          params: z.object({
            slug: z.string(),
            id: z.string(),
          }),
          response: {
            200: z.object({
              account: z.object({
                id: z.string(),
                name: z.string(),
                value: z.number(),
                imageUrl: z.string().optional(),
                mainColor: z.string().optional(),
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
        const getAccountByIdService = makeGetAccountsByIdService()
        const { id } = request.params

        const response = await getAccountByIdService.execute({
          accountId: id,
        })

        if (response.isLeft()) {
          const error = response.value
          throw error
        }

        const { account } = response.value

        return reply.status(200).send({
          account: await DrizzleAccountMapper.toHTTP(await account),
        })
      },
    )
}
