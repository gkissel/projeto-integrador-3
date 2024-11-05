import { Transaction } from '@/domain/money-app/enterprise/entities/transaction'

export default abstract class TransactionsRepository {
  abstract create(transaction: Transaction): Promise<void>

  abstract getByAccountId(accountId: string): Promise<Transaction[]>
  abstract getByOrgId(orgId: string): Promise<Transaction[]>
  abstract findById(id: string): Promise<Transaction | null>

  abstract updateById(transaction: Transaction): Promise<void>
  abstract deleteById(id: string): Promise<void>
}
