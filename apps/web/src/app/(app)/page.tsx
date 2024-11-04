import { redirect } from 'next/navigation'

import { auth } from '@/auth/auth'

export default async function Home() {
  const { user } = await auth()

  const userDefaultOrganization = `${user.email.split('@')[0]}-${user.email.split('@')[1].split('.')[0]}`

  redirect(`/org/${userDefaultOrganization}`)

  return (
    <div className='space-y-4 py-4'>
      <main className='mx-auto w-full max-w-[1200px] space-y-4'>
        <p className='text-sm text-muted-foreground'>
          Selecione uma organização
        </p>
      </main>
    </div>
  )
}
