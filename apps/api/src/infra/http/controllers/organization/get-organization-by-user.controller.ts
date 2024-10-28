import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { DrizzleOrganizationMapper } from '@/infra/database/postgres/mappers/organization.drizzle.mapper'

import { makeGetOrganizationByUserService } from '../../factories/organization/get-organization.by-user.factory'
import { auth } from '../../middlewares/auth'

export async function getOrganizationByUser(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/organizations',
      {
        schema: {
          tags: ['Organization'],
          security: [{ bearerAuth: [] }],
          summary: 'Get all organizations by the authenticated user',
          response: {
            201: z.object({
              organizations: z.array(
                z.object({
                  id: z.string(),
                  name: z.string(),
                  slug: z.string(),
                  ownerId: z.string().optional(),
                  createdAt: z.date().optional().nullable(),
                  updatedAt: z.date().optional().nullable(),
                }),
              ),
            }),
          },
        },
      },
      async (request, reply) => {
        const getOrganizationByUserService = makeGetOrganizationByUserService()

        const userId = await request.getCurrentUserId()

        const response = await getOrganizationByUserService.execute({
          userId,
        })

        if (response.isLeft()) {
          const error = response.value

          throw error
        }

        const { organizations } = response.value

        return reply.status(201).send({
          organizations: organizations.map((organization) =>
            DrizzleOrganizationMapper.toHTTP(organization),
          ),
        })
      },
    )
}
