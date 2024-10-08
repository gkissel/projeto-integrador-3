'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

import { SidebarItem } from '@/components/catalyst/sidebar'

export default function NavItem({
  children,
  href,
}: {
  children: React.ReactNode
  href: string
}) {
  const pathname = usePathname()

  useEffect(() => {
    if (pathname !== '/') {
      console.log(pathname, href)
      isCurrent = pathname.startsWith(href)
    }
  }, [pathname])
  let isCurrent: boolean = false

  return (
    <SidebarItem href={href} current={isCurrent || pathname === href}>
      {children}
    </SidebarItem>
  )
}
