import { CreateInviteService } from '@/domain/money-app/application/services/invite/create-invite.service'
import { db } from '@/infra/database/postgres/connection.service'
import DrizzleInvitesRepository from '@/infra/database/postgres/repositories/invites.drizzle.repository'
import DrizzleOrganizationsRepository from '@/infra/database/postgres/repositories/organiaztions.drizzle.repository'
import DrizzleUsersRepository from '@/infra/database/postgres/repositories/users.drizzle.repository'

export function makeCreateInviteService() {
  const invitesRepository = new DrizzleInvitesRepository(db)

  const usersRepository = new DrizzleUsersRepository(db)

  const organizationRepository = new DrizzleOrganizationsRepository(db)

  const createInviteService = new CreateInviteService(
    invitesRepository,
    usersRepository,
    organizationRepository,
  )

  return createInviteService
}
