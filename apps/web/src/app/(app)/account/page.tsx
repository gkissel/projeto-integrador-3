import type { Metadata } from 'next'

import { auth } from '@/auth/auth'
import { Heading } from '@/components/catalyst/heading'

import UpdateAccountForm from './update-account-form'

export const metadata: Metadata = {
  title: 'Settings',
}

export default async function Settings() {
  const { user } = await auth()
  return (
    <div className='mx-auto max-w-4xl space-y-8'>
      {' '}
      <Heading>Minha conta</Heading>
      <div>
        <UpdateAccountForm user={user} />
      </div>
    </div>
  )
}
