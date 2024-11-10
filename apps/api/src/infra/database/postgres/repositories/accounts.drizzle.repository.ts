import { eq } from 'drizzle-orm'

import AccountsRepository from '@/domain/money-app/application/repositories/abstract/accounts.repository'
import { Account } from '@/domain/money-app/enterprise/entities/account'

import { DrizzleClient } from '../connection.service'
import { DrizzleAccountMapper } from '../mappers/acccount.drizzle.mapper'
import { account } from '../schema'

export type DrizzleAccount = {
  id: string
  name: string
  imageBlob: Buffer | null
  value: number
  createdAt: Date | null
  updatedAt: Date | null
  orgId: string
}

export default class DrizzleAccountsRepository implements AccountsRepository {
  constructor(private db: DrizzleClient) {}

  async create(values: Account): Promise<void> {
    const data = DrizzleAccountMapper.toDrizzle(values)
    await this.db.insert(account).values(data).execute()
  }

  async getAccountsByOrgId(orgId: string): Promise<Account[]> {
    const data = await this.db
      .select()
      .from(account)
      .where(eq(account.orgId, orgId))
      .execute()

    return data.map(DrizzleAccountMapper.toDomain)
  }

  async findAccountById(id: string): Promise<Account | null> {
    const [data] = await this.db
      .select()
      .from(account)
      .where(eq(account.id, id))
      .limit(1)
      .execute()

    if (!data) {
      return null
    }

    return DrizzleAccountMapper.toDomain(data)
  }

  async updateAccountById(value: Account): Promise<void> {
    const data = DrizzleAccountMapper.toDrizzle(value)
    await this.db
      .update(account)
      .set(data)
      .where(eq(account.id, value.id.toString()))
      .execute()
  }

  async deleteAccountById(id: string): Promise<void> {
    await this.db.delete(account).where(eq(account.id, id)).execute()
  }
}
