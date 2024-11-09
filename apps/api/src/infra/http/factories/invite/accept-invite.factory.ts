import { AcceptInviteService } from '@/domain/money-app/application/services/invite/accept-invite.service'
import { db } from '@/infra/database/postgres/connection.service'
import DrizzleInvitesRepository from '@/infra/database/postgres/repositories/invites.drizzle.repository'
import DrizzleMembersRepository from '@/infra/database/postgres/repositories/members.drizzle.repository'
import DrizzleUsersRepository from '@/infra/database/postgres/repositories/users.drizzle.repository'

export function makeAcceptInviteService() {
  const invitesRepository = new DrizzleInvitesRepository(db)

  const usersRepository = new DrizzleUsersRepository(db)

  const membersRepository = new DrizzleMembersRepository(db)

  const acceptInviteService = new AcceptInviteService(
    invitesRepository,
    usersRepository,
    membersRepository,
  )

  return acceptInviteService
}
