import { desc, eq } from 'drizzle-orm'

import TransactionsRepository from '@/domain/money-app/application/repositories/abstract/transactions.repository'
import { Transaction } from '@/domain/money-app/enterprise/entities/transaction'

import { DrizzleClient } from '../connection.service'
import { DrizzleTransactionMapper } from '../mappers/transactions.drizzle.mapper'
import { transactions } from '../schema'

export type DrizzleTransaction = {
  id: string
  description: string
  value: number
  type: 'INCOME' | 'OUTCOME'
  accountId: string

  orgId: string
  createdAt: Date | null
  updatedAt: Date | null
}

export default class DrizzleTransactionsRepository
  implements TransactionsRepository
{
  constructor(private db: DrizzleClient) {}

  async create(transaction: Transaction): Promise<void> {
    const data = DrizzleTransactionMapper.toDrizzle(transaction)
    await this.db.insert(transactions).values(data).execute()
  }

  async getByAccountId(accountId: string): Promise<Transaction[]> {
    const data = await this.db
      .select()
      .from(transactions)
      .where(eq(transactions.accountId, accountId))
      .orderBy(desc(transactions.createdAt))
      .execute()

    return data.map(DrizzleTransactionMapper.toDomain)
  }

  async getByOrgId(orgId: string): Promise<Transaction[]> {
    const data = await this.db
      .select()
      .from(transactions)
      .where(eq(transactions.orgId, orgId))
      .orderBy(desc(transactions.createdAt))
      .execute()

    return data.map(DrizzleTransactionMapper.toDomain)
  }

  async findById(id: string): Promise<Transaction | null> {
    const [data] = await this.db
      .select()
      .from(transactions)
      .where(eq(transactions.id, id))
      .limit(1)
      .execute()

    if (!data) {
      return null
    }

    return DrizzleTransactionMapper.toDomain(data)
  }

  async updateById(transaction: Transaction): Promise<void> {
    const data = DrizzleTransactionMapper.toDrizzle(transaction)
    await this.db
      .update(transactions)
      .set(data)
      .where(eq(transactions.id, transaction.id.toString()))
      .execute()
  }

  async deleteById(id: string): Promise<void> {
    await this.db.delete(transactions).where(eq(transactions.id, id)).execute()
  }
}
