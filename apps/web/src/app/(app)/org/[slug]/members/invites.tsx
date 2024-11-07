import { getCurrentOrg } from '@/auth/auth'
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@/components/catalyst/table'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getInvites } from '@/http/get-invites'
import { getMembership } from '@/http/member/get-membership'

import { CreateInviteForm } from './create-invite-form'
import { RevokeInviteButton } from './revoke-invite-button'

export async function Invites() {
  const currentOrg = await getCurrentOrg()

  const { membership } = await getMembership(currentOrg!)
  const { invites } = await getInvites(currentOrg!)

  return (
    <div className='space-y-4'>
      {membership.role !== 'MEMBER' && (
        <Card>
          <CardHeader>
            <CardTitle>Invite member</CardTitle>
          </CardHeader>
          <CardContent>
            <CreateInviteForm />
          </CardContent>
        </Card>
      )}

      <div className='space-y-2'>
        <h2 className='text-lg font-semibold'>Invites</h2>

        <div className='rounded border'>
          <Table>
            <TableBody>
              {invites.map((invite) => {
                return (
                  <TableRow key={invite.id}>
                    <TableCell className='py-2.5'>
                      <span className='text-muted-foreground'>
                        {invite.email}
                      </span>
                    </TableCell>
                    <TableCell className='py-2.5 font-medium'>
                      {invite.role}
                    </TableCell>
                    <TableCell className='py-2.5'>
                      <div className='flex justify-end'>
                        {membership.role !== 'MEMBER' && (
                          <RevokeInviteButton inviteId={invite.id} />
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}

              {invites.length === 0 && (
                <TableRow>
                  <TableCell className='text-center text-muted-foreground'>
                    No invites found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
