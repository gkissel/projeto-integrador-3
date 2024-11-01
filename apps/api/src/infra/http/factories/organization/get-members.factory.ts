import { GetOrganizationMembersService } from '@/domain/money-app/application/services/organization/get-members.service'
import { db } from '@/infra/database/postgres/connection.service'
import DrizzleMembersRepository from '@/infra/database/postgres/repositories/members.drizzle.repository'
import DrizzleOrganizationsRepository from '@/infra/database/postgres/repositories/organiaztions.drizzle.repository'

export function makeGetMembersService() {
  const organizationsRepository = new DrizzleOrganizationsRepository(db)

  const membersRepository = new DrizzleMembersRepository(db)

  const getMembersService = new GetOrganizationMembersService(
    organizationsRepository,
    membersRepository,
  )

  return getMembersService
}
