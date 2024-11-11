import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Transaction } from '@/domain/money-app/enterprise/entities/transaction'

import { DrizzleTransaction } from '../repositories/transactions.drizzle.repository'

export class DrizzleTransactionMapper {
  static toDomain(raw: DrizzleTransaction): Transaction {
    return Transaction.create(
      {
        description: raw.description,
        value: raw.value,
        type: raw.type,
        accountId: new UniqueEntityID(raw.accountId),
        orgId: new UniqueEntityID(raw.orgId),
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toDrizzle(transaction: Transaction): DrizzleTransaction {
    return {
      id: transaction.id.toString(),
      description: transaction.description,
      value: transaction.value,
      type: transaction.type,
      accountId: transaction.accountId.toString(),
      orgId: transaction.orgId.toString(),
      createdAt: transaction.createdAt || null,
      updatedAt: transaction.updatedAt || null,
    }
  }

  static toHTTP(transaction: Transaction) {
    return {
      accountId: transaction.accountId.toString(),
      createdAt:
        transaction.createdAt?.toISOString() ?? new Date().toISOString(),
      description: transaction.description,
      id: transaction.id.toString(),
      orgId: transaction.orgId.toString(),
      value: transaction.value,
      type: transaction.type,
      updatedAt:
        transaction.updatedAt?.toISOString() ?? new Date().toISOString(),
    }
  }
}
