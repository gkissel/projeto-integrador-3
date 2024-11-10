import { getCurrentOrg } from '@/auth/auth'
import { getAccount } from '@/http/account/get-account-by-id'

export async function getAccountAction(accountId: string) {
  const org = await getCurrentOrg()

  if (!org) {
    return
  }

  const { account } = await getAccount({
    accountId,
    org,
  })

  return account
}
