import { CreateAccountService } from '@/domain/money-app/application/services/account/create-money-account.service'
import { db } from '@/infra/database/postgres/connection.service'
import DrizzleAccountsRepository from '@/infra/database/postgres/repositories/accounts.drizzle.repository'
import DrizzleOrganizationsRepository from '@/infra/database/postgres/repositories/organiaztions.drizzle.repository'

export function makeCreateAccountService() {
  const accountsRepository = new DrizzleAccountsRepository(db)
  const organizationsRepository = new DrizzleOrganizationsRepository(db)

  const createAccountService = new CreateAccountService(
    accountsRepository,
    organizationsRepository,
  )

  return createAccountService
}
