import { GetOrganizationByUserService } from '@/domain/money-app/application/services/organization/get-organization-by-user.service'
import { db } from '@/infra/database/postgres/connection.service'
import DrizzleMembersRepository from '@/infra/database/postgres/repositories/members.drizzle.repository'
import DrizzleOrganizationsRepository from '@/infra/database/postgres/repositories/organiaztions.drizzle.repository'

export function makeGetOrganizationByUserService() {
  const organizationsRepository = new DrizzleOrganizationsRepository(db)

  const membersRepository = new DrizzleMembersRepository(db)

  const getOrganizationByUserService = new GetOrganizationByUserService(
    organizationsRepository,
    membersRepository,
  )

  return getOrganizationByUserService
}
