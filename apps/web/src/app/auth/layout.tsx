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
    <div className='flex min-h-screen w-full flex-col items-center justify-center overflow-x-hidden px-5'>
      <div className='w-full'>{children}</div>
    </div>
  )
}
