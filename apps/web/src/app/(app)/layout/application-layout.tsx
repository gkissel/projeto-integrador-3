import { ChevronUpIcon, UserCircleIcon } from '@heroicons/react/16/solid'
import { HomeIcon } from '@heroicons/react/20/solid'

import { auth } from '@/auth/auth'
import { Avatar } from '@/components/catalyst/avatar'
import {
  Dropdown,
  DropdownButton,
  DropdownDivider,
  DropdownItem,
  DropdownLabel,
  DropdownMenu,
} from '@/components/catalyst/dropdown'
import {
  Navbar,
  NavbarItem,
  NavbarSection,
  NavbarSpacer,
} from '@/components/catalyst/navbar'
import {
  Sidebar,
  SidebarBody,
  SidebarFooter,
  SidebarHeader,
  SidebarItem,
  SidebarLabel,
  SidebarSection,
  SidebarSpacer,
} from '@/components/catalyst/sidebar'
import { SidebarLayout } from '@/components/catalyst/sidebar-layout'
import { OrganizationSwitcher } from '@/components/organization-switcher'

import { LogOut } from 'lucide-react'
import NavItem from './nav-item'

function getInitials(name: string): string {
  const initials = name
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('')

  return initials
}

function AccountDropdownMenu({
  anchor,
}: {
  anchor: 'top start' | 'bottom end'
}) {
  return (
    <DropdownMenu className='min-w-64' anchor={anchor}>
      <DropdownItem href='/account' >
        <UserCircleIcon />
        <DropdownLabel>My account</DropdownLabel>
      </DropdownItem>

      <DropdownDivider />

      <DropdownItem href='/api/auth/sign-out' prefetch={false}>
        <LogOut className='size-4 text-rose-500' />
        <DropdownLabel className='text-rose-500'>Sign Out</DropdownLabel>
      </DropdownItem>
    </DropdownMenu>
  )
}

export async function ApplicationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user } = await auth()
  return (
    <SidebarLayout
      navbar={
        <Navbar>
          <NavbarSpacer />
          <NavbarSection>
            <Dropdown>
              <DropdownButton as={NavbarItem}>
                <Avatar  initials={getInitials(`${user.firstName} ${user.lastName}`)} square />
              </DropdownButton>
              <AccountDropdownMenu anchor='bottom end' />
            </Dropdown>
          </NavbarSection>
        </Navbar>
      }
      sidebar={
        <Sidebar>
          {' '}
          <SidebarHeader>
            <OrganizationSwitcher />
            {/* <Dropdown>
              <DropdownButton as={SidebarItem}>
                <Avatar src='/teams/catalyst.svg' />
                <SidebarLabel>Catalyst</SidebarLabel>
                <ChevronDownIcon />
              </DropdownButton>
              <DropdownMenu
                className='min-w-80 lg:min-w-64'
                anchor='bottom start'
              >
                <DropdownItem href='/settings'>
                  <Cog8ToothIcon />
                  <DropdownLabel>Settings</DropdownLabel>
                </DropdownItem>
                <DropdownDivider />
                <DropdownItem href='#'>
                  <Avatar slot='icon' src='/teams/catalyst.svg' />
                  <DropdownLabel>Catalyst</DropdownLabel>
                </DropdownItem>
                <DropdownItem href='#'>
                  <Avatar
                    slot='icon'
                    initials='BE'
                    className='bg-purple-500 text-white'
                  />
                  <DropdownLabel>Big Events</DropdownLabel>
                </DropdownItem>
                <DropdownDivider />
                <DropdownItem href='#'>
                  <PlusIcon />
                  <DropdownLabel>New team&hellip;</DropdownLabel>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown> */}
          </SidebarHeader>{' '}
          <SidebarBody>
            <SidebarSection>
              <NavItem href='/'>
                <HomeIcon />
                <SidebarLabel>Home</SidebarLabel>
              </NavItem>
              {/* <NavItem href='/events'>
                <Square2StackIcon />
                <SidebarLabel>Events</SidebarLabel>
              </NavItem>
              <NavItem href='/orders'>
                <TicketIcon />
                <SidebarLabel>Orders</SidebarLabel>
              </NavItem>
              <NavItem href='/settings'>
                <Cog6ToothIcon />
                <SidebarLabel>Settings</SidebarLabel>
              </NavItem> */}
            </SidebarSection>

            <SidebarSpacer />
          </SidebarBody>
          <SidebarFooter className='max-lg:hidden'>
            <Dropdown>
              <DropdownButton as={SidebarItem}>
                <span className='flex min-w-0 items-center gap-3'>
                  <Avatar
                    className='size-10'
                    square
                    alt=''
                    initials={getInitials(`${user.firstName} ${user.lastName}`)}
                  />
                  <span className='min-w-0'>
                    <span className='block truncate text-sm/5 font-medium text-zinc-950 dark:text-white'>
                      {user.firstName} {user.lastName}
                    </span>
                    <span className='block truncate text-xs/5 font-normal text-zinc-500 dark:text-zinc-400'>
                      {user.email}
                    </span>
                  </span>
                </span>
                <ChevronUpIcon />
              </DropdownButton>
              <AccountDropdownMenu anchor='top start' />
            </Dropdown>
          </SidebarFooter>
        </Sidebar>
      }
    >
      {children}
    </SidebarLayout>
  )
}
