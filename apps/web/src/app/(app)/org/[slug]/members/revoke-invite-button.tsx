import { XOctagon } from 'lucide-react'

import { Button } from '@/components/catalyst/button'

import { revokeInviteAction } from './actions'

interface RevokeInviteButtonProps {
  inviteId: string
}

export function RevokeInviteButton({ inviteId }: RevokeInviteButtonProps) {
  return (
    <form action={revokeInviteAction.bind(null, inviteId)}>
      <Button color='rose' type='submit'>
        <XOctagon className='mr-2 size-4' />
        Revoke invite
      </Button>
    </form>
  )
}
