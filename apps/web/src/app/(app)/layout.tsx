import { redirect } from 'next/navigation'

import { isAuthenticated } from '@/auth/auth'

import { ApplicationLayout } from './layout/application-layout'

export default async function AppLayout({
  children,
  sheet,
}: Readonly<{
  children: React.ReactNode
  sheet: React.ReactNode
}>) {
  if (!(await isAuthenticated())) {
    redirect('/auth/sign-in')
  }

  return (
    <>
      <ApplicationLayout>
        {children}
        {sheet}
      </ApplicationLayout>
    </>
  )
}
