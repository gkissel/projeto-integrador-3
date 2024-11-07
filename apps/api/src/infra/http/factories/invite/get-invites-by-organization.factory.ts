import { GetInvitesByOrganization } from '@/domain/money-app/application/services/invite/get-invites-by-organization.service'
import { db } from '@/infra/database/postgres/connection.service'
import DrizzleInvitesRepository from '@/infra/database/postgres/repositories/invites.drizzle.repository'

export function makeGetInvitesByOrganizationService() {
  const invitesRepository = new DrizzleInvitesRepository(db)

  const getInviteByOrganizationService = new GetInvitesByOrganization(
    invitesRepository,
  )

  return getInviteByOrganizationService
}
