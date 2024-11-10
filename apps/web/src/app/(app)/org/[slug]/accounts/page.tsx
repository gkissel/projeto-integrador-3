import Image from 'next/image'
import Link from 'next/link'

import { getCurrentOrg } from '@/auth/auth'
import { Divider } from '@/components/catalyst/divider'
import { Strong, Text } from '@/components/catalyst/text'
import { priceFormatter } from '@/lib/formatter'

import { getAccountsAction } from './action'
import { CreateNewAccountForm } from './create-new-account-form'

export default async function Accounts() {
  const currentOrg = await getCurrentOrg()

  const accounts = await getAccountsAction(currentOrg!)

  return (
    <div className='space-y-8'>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-bold'>Contas</h1>
      </div>

      <Divider />
      <div className='mb-4'>
        <Strong>Suas Contas</Strong>
        <Text className='mb-4'>
          Gerencie facilmente suas atividades bancárias
        </Text>
      </div>

      <div className='grid grid-cols-4 items-center gap-10'>
        <CreateNewAccountForm />

        {accounts?.map((account) => {
          return (
            <Link
              href={`accounts/${account.id}`}
              key={account.id}
              className='flex flex-col gap-2.5'
            >
              <span>{account.name}</span>
              <div className='relative flex h-[190px] w-[300px] cursor-pointer flex-col items-center justify-center rounded-3xl border border-[#303032] bg-[#18181B] transition-colors duration-200 hover:bg-[#2b2b2b]'>
                <Image
                  src={account.imageUrl ?? ''}
                  alt={account.name}
                  fill
                  className='rounded-3xl object-cover hover:brightness-75'
                />
              </div>
              <span> Saldo: {priceFormatter.format(account.value)} </span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
