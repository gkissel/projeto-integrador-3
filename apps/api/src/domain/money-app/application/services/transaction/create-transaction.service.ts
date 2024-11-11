import { Either, left, right } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { Transaction } from '@/domain/money-app/enterprise/entities/transaction'

import AccountsRepository from '../../repositories/abstract/accounts.repository'
import TransactionsRepository from '../../repositories/abstract/transactions.repository'
import { EntityAlreadyExistsError } from '../errors/entity-already-exists-error'

export interface CreateTransactionServiceRequest {
  accountId: string
  description: string
  value: number
  type: 'INCOME' | 'OUTCOME'
}

type CreateTransactionServiceResponse = Either<
  EntityAlreadyExistsError | ResourceNotFoundError,
  {
    transaction: Transaction
  }
>

export class CreateTransactionService {
  constructor(
    private transactionsRepository: TransactionsRepository,
    private accountsRepository: AccountsRepository,
  ) {}

  async execute({
    accountId,
    value,
    type,
    description,
  }: CreateTransactionServiceRequest): Promise<CreateTransactionServiceResponse> {
    const account = await this.accountsRepository.findAccountById(accountId)

    if (!account) {
      return left(new ResourceNotFoundError())
    }

    const transaction = Transaction.create({
      accountId: new UniqueEntityID(accountId),
      type,
      description,
      orgId: account.orgId,
      value,
    })

    if (transaction.type === 'INCOME') {
      account.transaction(transaction.value)
    }

    if (transaction.type === 'OUTCOME') {
      account.transaction(-transaction.value)
    }

    await this.accountsRepository.updateAccountById(account)
    await this.transactionsRepository.create(transaction)

    return right({
      transaction,
    })
  }
}
