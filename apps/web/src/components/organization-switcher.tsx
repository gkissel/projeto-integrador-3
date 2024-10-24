import { ChevronsUpDown, PlusCircle } from 'lucide-react'

import { getCurrentOrg } from '@/auth/auth'
import { getOrganizations } from '@/http/organization/get-organizations'

import {
  Dropdown,
  DropdownButton,
  DropdownDivider,
  DropdownItem,
  DropdownLabel,
  DropdownMenu,
  DropdownSection,
} from './catalyst/dropdown'
import { SidebarItem } from './catalyst/sidebar'
import { Text } from './catalyst/text'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

export async function OrganizationSwitcher() {
  const currentOrg = await getCurrentOrg()

  const { organizations } = await getOrganizations()

  const currentOrganization = organizations.find(
    (org) => org.slug === currentOrg,
  )

  return (
    <Dropdown>
      <DropdownButton as={SidebarItem}>
        {currentOrganization ? (
          <>
            <Avatar className='size-4'>
              {currentOrganization.avatarUrl && (
                <AvatarImage src={currentOrganization.avatarUrl} />
              )}
              <AvatarFallback />
            </Avatar>
            <Text className='truncate text-left'>
              {currentOrganization.name}
            </Text>
          </>
        ) : (
          <Text className='text-xs'>Selecione a organização</Text>
        )}
        <ChevronsUpDown className='ml-auto size-4' />
      </DropdownButton>
      <DropdownMenu
        anchor='bottom end'
        className='ml-4 min-w-64 overflow-hidden rounded-md p-3'
      >
        <DropdownSection>
          <DropdownLabel className='ml-3 pb-2'>Organizações</DropdownLabel>

          {organizations.map((organization) => {
            return (
              <DropdownItem
                key={organization.id}
                href={`/org/${organization.slug}`}
              >
                <Avatar className='mr-2 size-4'>
                  {organization.avatarUrl && (
                    <AvatarImage
                      src={organization.avatarUrl}
                      title={organization.name}
                    />
                  )}
                  <AvatarFallback />
                </Avatar>
                <Text className='line-clamp-1'>{organization.name}</Text>
              </DropdownItem>
            )
          })}
        </DropdownSection>
        <DropdownDivider />
        <DropdownItem href='/create-organization'>
          <PlusCircle className='mr-2 size-4' />
          Criar nova
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}
