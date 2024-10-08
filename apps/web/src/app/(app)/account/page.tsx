import type { Metadata } from 'next'

import { Heading } from '@/components/catalyst/heading'
import { getProfile } from '@/http/organization/get-profile'

import UpdateAccountForm from './update-account-form'

export const metadata: Metadata = {
  title: 'Settings',
}

export default async function Settings() {
  const { user } = await getProfile()
  return (
    <div className='mx-auto max-w-4xl space-y-8'>
      {' '}
      <Heading>Account</Heading>
      <div>
        <UpdateAccountForm user={user} />
      </div>
    </div>
  )
}
