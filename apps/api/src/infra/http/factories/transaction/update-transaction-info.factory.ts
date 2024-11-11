import { UpdateTransactionInfoService } from '@/domain/money-app/application/services/transaction/update-transaction-info.service'
import { db } from '@/infra/database/postgres/connection.service'
import DrizzleAccountsRepository from '@/infra/database/postgres/repositories/accounts.drizzle.repository'
import DrizzleTransactionsRepository from '@/infra/database/postgres/repositories/transactions.drizzle.repository'

export function makeUpdateTransactionInfoService() {
  const transactionsRepository = new DrizzleTransactionsRepository(db)
  const accountsRepository = new DrizzleAccountsRepository(db)

  const updateTransactionInfoService = new UpdateTransactionInfoService(
    transactionsRepository,
    accountsRepository,
  )

  return updateTransactionInfoService
}
