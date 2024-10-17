import { CreateOrganizationService } from '@/domain/money-app/application/services/organization/create-organization.service'
import { db } from '@/infra/database/postgres/connection.service'
import DrizzleOrganizationsRepository from '@/infra/database/postgres/repositories/organiaztions.drizzle.repository'

export function makeCreateOrganizationService() {
  const organizationsRepository = new DrizzleOrganizationsRepository(db)

  const createOrganizationService = new CreateOrganizationService(
    organizationsRepository,
  )

  return createOrganizationService
}
