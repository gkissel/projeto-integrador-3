import { GetInvitesByUser } from '@/domain/money-app/application/services/invite/get-invites-by-user.service'
import { db } from '@/infra/database/postgres/connection.service'
import DrizzleInvitesRepository from '@/infra/database/postgres/repositories/invites.drizzle.repository'
import DrizzleUsersRepository from '@/infra/database/postgres/repositories/users.drizzle.repository'

export function makeGetInvitesByUserService() {
  const invitesRepository = new DrizzleInvitesRepository(db)

  const usersRepository = new DrizzleUsersRepository(db)

  const getInvitesByUserService = new GetInvitesByUser(
    invitesRepository,
    usersRepository,
  )

  return getInvitesByUserService
}
