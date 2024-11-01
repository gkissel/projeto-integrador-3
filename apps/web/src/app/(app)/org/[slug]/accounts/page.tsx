import Image from 'next/image'

import { Divider } from '@/components/catalyst/divider'
import { Strong, Text } from '@/components/catalyst/text'

export default async function Accounts() {
  // const currentOrg = getCurrentOrg()
  // const permissions = await ability()

  return (
    <div className='space-y-8'>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-bold'>Contas</h1>
      </div>

      <Divider />

      <div className='flex flex-col'>
        <Strong>Suas Contas</Strong>

        <Text>Gerencie facilmente suas atividades bancárias</Text>
      </div>

      <div className='grid xl:grid-cols-3'>
        <div className='relative rounded-3xl'>
          <Image alt='' src='' fill />
        </div>

        <div>Saldo: R$2.000,85</div>
      </div>
    </div>
  )
}
