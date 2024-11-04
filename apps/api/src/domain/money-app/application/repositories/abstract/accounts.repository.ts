import { Account } from '@/domain/money-app/enterprise/entities/account'

export default abstract class AccountsRepository {
  abstract create(account: Account): Promise<void>

  abstract getAccountsByOrgId(orgId: string): Promise<Account[]>
  abstract findAccountById(id: string): Promise<Account | null>

  abstract updateAccountById(account: Account): Promise<void>
  abstract deleteAccountById(id: string): Promise<void>
}
