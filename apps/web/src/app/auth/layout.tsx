import { redirect } from 'next/navigation'

import { isAuthenticated } from '@/auth/auth'

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  if (isAuthenticated()) {
    redirect('/')
  }

  return (
    <div className='flex min-h-screen flex-col items-center justify-center w-full px-5 overflow-x-hidden'>
      <div className='w-full'>{children}</div>
    </div>
  )
}
