import { GetAccountsByOrganization } from '@/domain/money-app/application/services/account/get-accounts-by-organization.service'
import { db } from '@/infra/database/postgres/connection.service'
import DrizzleAccountsRepository from '@/infra/database/postgres/repositories/accounts.drizzle.repository'

export function makeGetAccountsByOrgService() {
  const accountsRepository = new DrizzleAccountsRepository(db)

  const getAccountsByOrgService = new GetAccountsByOrganization(
    accountsRepository,
  )

  return getAccountsByOrgService
}
