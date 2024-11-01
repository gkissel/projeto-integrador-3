import { RevokeMemberService } from '@/domain/money-app/application/services/member/revoke-member.service'
import { db } from '@/infra/database/postgres/connection.service'
import DrizzleMembersRepository from '@/infra/database/postgres/repositories/members.drizzle.repository'
import DrizzleOrganizationsRepository from '@/infra/database/postgres/repositories/organiaztions.drizzle.repository'
import DrizzleUsersRepository from '@/infra/database/postgres/repositories/users.drizzle.repository'

export function makeRevokeMemberService() {
  const organizationsRepository = new DrizzleOrganizationsRepository(db)

  const membersRepository = new DrizzleMembersRepository(db)

  const usersRepository = new DrizzleUsersRepository(db)

  const revokeMemberService = new RevokeMemberService(
    membersRepository,
    usersRepository,
    organizationsRepository,
  )

  return revokeMemberService
}
