import { ArrowLeftRight, Crown, UserMinus } from 'lucide-react'

import { getInitials } from '@/app/(app)/layout/application-layout'
import { auth, currentRole, getCurrentOrg } from '@/auth/auth'
import { Avatar } from '@/components/catalyst/avatar'
import { Button } from '@/components/catalyst/button'
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@/components/catalyst/table'
import { getMembership } from '@/http/get-membership'
import { getMembers } from '@/http/member/get-members'

import { getUserByIdAction, removeMemberAction } from './actions'
import { UpdateMemberRoleSelect } from './update-member-role-select'

export async function MemberList() {
  const currentOrg = await getCurrentOrg()
  const role = await currentRole()
  const currentUser = await auth()

  const [{ membership }, { members }] = await Promise.all([
    getMembership(currentOrg!),
    getMembers(currentOrg!),
    // getOrganization(currentOrg!),
  ])

  return (
    <div className='space-y-2'>
      <h2 className='text-lg font-semibold'>Members</h2>

      <div className='rounded border'>
        <Table>
          <TableBody>
            {members.map(async (member) => {
              const user = await getUserByIdAction(member.userId)

              return (
                <TableRow key={member.id}>
                  <TableCell className='py-2.5' style={{ width: 48 }}>
                    <Avatar
                      initials={getInitials(
                        `${user.firstName} ${user.lastName}`,
                      )}
                      square
                    />
                  </TableCell>
                  <TableCell className='py-2.5'>
                    <div className='flex flex-col'>
                      <span className='inline-flex items-center gap-2 font-medium'>
                        {member.role === 'OWNER' && (
                          <span className='inline-flex items-center gap-1 text-xs text-muted-foreground'>
                            <Crown className='size-3 text-yellow-500' />
                            Dono
                          </span>
                        )}
                        {user.firstName} {user.lastName}
                        {member.userId === membership.userId && ' (me)'}
                      </span>
                      <span className='text-xs text-muted-foreground'>
                        {user.email}
                      </span>
                      {member.role === 'ADMIN' && (
                        <span className='inline-flex items-center gap-1 text-xs text-muted-foreground'>
                          <Crown className='size-3 text-violet-500' />
                          Administrador
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className='py-2.5'>
                    <div className='flex items-center justify-end gap-2'>
                      {role === 'OWNER' && (
                        <Button color='violet'>
                          <ArrowLeftRight className='mr-2 size-4' />
                          Transfer ownership
                        </Button>
                      )}

                      <UpdateMemberRoleSelect
                        memberId={member.id}
                        value={member.role}
                        disabled={
                          member.userId === membership.userId ||
                          member.role === 'OWNER' ||
                          role === 'MEMBER'
                        }
                      />

                      {role !== 'MEMBER' && (
                        <form action={removeMemberAction.bind(null, member.id)}>
                          <Button
                            disabled={
                              member.userId === membership.userId
                              // member.userId === organization.ownerId
                            }
                            type='submit'
                            color='red'
                          >
                            <UserMinus className='mr-2 size-4' />
                            Remove
                          </Button>
                        </form>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
