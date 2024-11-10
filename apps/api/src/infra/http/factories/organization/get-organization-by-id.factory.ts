import { GetOrganizationByIdService } from '@/domain/money-app/application/services/organization/get-organization-by-id.service'
import { db } from '@/infra/database/postgres/connection.service'
import DrizzleOrganizationsRepository from '@/infra/database/postgres/repositories/organiaztions.drizzle.repository'

export function makeGetOrganizationByIdService() {
  const organizationsRepository = new DrizzleOrganizationsRepository(db)
  const service = new GetOrganizationByIdService(organizationsRepository)

  return service
}
