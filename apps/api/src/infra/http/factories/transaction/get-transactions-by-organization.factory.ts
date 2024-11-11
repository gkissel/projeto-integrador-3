import { GetTransactionsByOrganizationService } from '@/domain/money-app/application/services/transaction/get-transactions-by-organization.service'
import { db } from '@/infra/database/postgres/connection.service'
import DrizzleTransactionsRepository from '@/infra/database/postgres/repositories/transactions.drizzle.repository'

export function makeGetTransactionsByOrganizationService() {
  const transactionsRepository = new DrizzleTransactionsRepository(db)

  const getTransactionsByOrganizationService =
    new GetTransactionsByOrganizationService(transactionsRepository)

  return getTransactionsByOrganizationService
}
