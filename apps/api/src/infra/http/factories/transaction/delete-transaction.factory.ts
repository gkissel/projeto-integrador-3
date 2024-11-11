import { DeleteTransactionService } from '@/domain/money-app/application/services/transaction/delete-transaction.service'
import { db } from '@/infra/database/postgres/connection.service'
import DrizzleAccountsRepository from '@/infra/database/postgres/repositories/accounts.drizzle.repository'
import DrizzleTransactionsRepository from '@/infra/database/postgres/repositories/transactions.drizzle.repository'

export function makeDeleteTransactionService() {
  const transactionsRepository = new DrizzleTransactionsRepository(db)
  const accountsRepository = new DrizzleAccountsRepository(db)

  const deleteTransactionService = new DeleteTransactionService(
    transactionsRepository,
    accountsRepository,
  )

  return deleteTransactionService
}
