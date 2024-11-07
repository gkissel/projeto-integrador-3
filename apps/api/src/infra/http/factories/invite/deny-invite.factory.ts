import { DenyInviteService } from '@/domain/money-app/application/services/invite/deny-invite.service'
import { db } from '@/infra/database/postgres/connection.service'
import DrizzleInvitesRepository from '@/infra/database/postgres/repositories/invites.drizzle.repository'
import DrizzleUsersRepository from '@/infra/database/postgres/repositories/users.drizzle.repository'

export function makeDenyInviteService() {
  const invitesRepository = new DrizzleInvitesRepository(db)
  const usersRepository = new DrizzleUsersRepository(db)

  const denyInviteService = new DenyInviteService(
    invitesRepository,
    usersRepository,
  )

  return denyInviteService
}
