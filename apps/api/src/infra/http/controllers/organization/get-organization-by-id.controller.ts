import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { DrizzleOrganizationMapper } from '@/infra/database/postgres/mappers/organization.drizzle.mapper'

import { makeGetOrganizationByIdService } from '../../factories/organization/get-organization-by-id.factory'
import { auth } from '../../middlewares/auth'

export async function getOrganizationById(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/organization/:orgId',
      {
        schema: {
          tags: ['Organization'],
          security: [{ bearerAuth: [] }],
          summary: 'Get all organizations by the authenticated Id',
          params: z.object({
            orgId: z.string(),
          }),
          response: {
            201: z.object({
              organization: z.object({
                id: z.string(),
                name: z.string(),
                slug: z.string(),
                ownerId: z.string().optional(),
                createdAt: z.date().optional().nullable(),
                updatedAt: z.date().optional().nullable(),
              }),
            }),
          },
        },
      },
      async (request, reply) => {
        const getOrganizationByIdService = makeGetOrganizationByIdService()

        const { orgId } = request.params

        const response = await getOrganizationByIdService.execute({
          orgId,
        })

        if (response.isLeft()) {
          const error = response.value

          throw error
        }

        return reply.status(201).send({
          organization: DrizzleOrganizationMapper.toHTTP(
            response.value.organization,
          ),
        })
      },
    )
}
