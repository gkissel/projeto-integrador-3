import { RevokeInviteService } from '@/domain/money-app/application/services/invite/revoke-invite.service'
import { db } from '@/infra/database/postgres/connection.service'
import DrizzleInvitesRepository from '@/infra/database/postgres/repositories/invites.drizzle.repository'
import DrizzleMembersRepository from '@/infra/database/postgres/repositories/members.drizzle.repository'

export function makeRevokeInviteService() {
  const invitesRepository = new DrizzleInvitesRepository(db)

  const membersRepository = new DrizzleMembersRepository(db)

  const revokeInviteService = new RevokeInviteService(
    invitesRepository,
    membersRepository,
  )

  return revokeInviteService
}
