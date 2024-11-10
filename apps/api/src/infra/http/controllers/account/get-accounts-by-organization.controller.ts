import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { DrizzleAccountMapper } from '@/infra/database/postgres/mappers/acccount.drizzle.mapper'

import { makeGetAccountsByOrgService } from '../../factories/account/get-accounts-by-org.factory'
import { auth } from '../../middlewares/auth'

export async function getAccountsByOrganization(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/organizations/:slug/accounts',
      {
        schema: {
          tags: ['Account'],
          security: [{ bearerAuth: [] }],
          summary: 'Get all accounts from an organization',
          params: z.object({
            slug: z.string(),
          }),
          response: {
            200: z.object({
              accounts: z.array(
                z.object({
                  id: z.string(),
                  name: z.string(),
                  value: z.number(),
                  imageUrl: z.string().optional(),
                  mainColor: z.string().optional(),
                  createdAt: z.string(),
                  updatedAt: z.string(),
                }),
              ),
            }),
            404: z.object({
              message: z.string(),
            }),
          },
        },
      },
      async (request, reply) => {
        const getAccountsService = makeGetAccountsByOrgService()
        const { slug } = request.params

        const { organization } = await request.getUserMembership(slug)

        const response = await getAccountsService.execute({
          orgId: organization.id,
        })

        if (response.isLeft()) {
          const error = response.value
          throw error
        }

        const { accounts } = response.value

        const mappedAccounts = await Promise.all(
          accounts.map(async (account) =>
            DrizzleAccountMapper.toHTTP(await account),
          ),
        )

        return reply.status(200).send({
          accounts: mappedAccounts,
        })
      },
    )
}
