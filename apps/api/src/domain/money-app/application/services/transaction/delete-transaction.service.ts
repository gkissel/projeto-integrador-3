import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { Transaction } from '@/domain/money-app/enterprise/entities/transaction'

import AccountsRepository from '../../repositories/abstract/accounts.repository'
import TransactionsRepository from '../../repositories/abstract/transactions.repository'

type DeleteTransactionResponse = Either<
  ResourceNotFoundError,
  {
    transaction: Transaction
  }
>

export class DeleteTransactionService {
  constructor(
    private transactionsRepository: TransactionsRepository,
    private accountsRepository: AccountsRepository,
  ) {}

  async execute(transactionId: string): Promise<DeleteTransactionResponse> {
    const transaction =
      await this.transactionsRepository.findById(transactionId)

    if (!transaction) {
      return left(new ResourceNotFoundError())
    }

    const account = await this.accountsRepository.findAccountById(
      transaction.accountId.toString(),
    )

    if (!account) {
      return left(new ResourceNotFoundError())
    }

    if (transaction.type === 'INCOME') {
      account.transaction(-transaction.value)
    } else {
      account.transaction(transaction.value)
    }

    await this.accountsRepository.updateAccountById(account)
    await this.transactionsRepository.deleteById(transactionId)

    return right({
      transaction,
    })
  }
}
