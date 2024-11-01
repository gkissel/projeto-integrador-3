import { GetMembershipService } from '@/domain/money-app/application/services/organization/get-membership.service'
import { db } from '@/infra/database/postgres/connection.service'
import DrizzleMembersRepository from '@/infra/database/postgres/repositories/members.drizzle.repository'
import DrizzleOrganizationsRepository from '@/infra/database/postgres/repositories/organiaztions.drizzle.repository'

export function makeGetMembershipService() {
  const organizationsRepository = new DrizzleOrganizationsRepository(db)

  const membersRepository = new DrizzleMembersRepository(db)

  const getMembershipService = new GetMembershipService(
    organizationsRepository,
    membersRepository,
  )

  return getMembershipService
}
