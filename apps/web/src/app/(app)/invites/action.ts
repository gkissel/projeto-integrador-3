'use server'

import { acceptInvite } from '@/http/invite/accept-invite'
import { getPendingInvites } from '@/http/invite/get-pending-invites'
import { rejectInvite } from '@/http/invite/reject-invite'
import { getOrganizationById } from '@/http/organization/get-organization-by-id'

export async function getPendingInvitesAction() {
  const { invites } = await getPendingInvites()

  return invites
}

export async function acceptInviteAction(inviteId: string) {
  await acceptInvite(inviteId)
}

export async function rejectInviteAction(inviteId: string) {
  await rejectInvite(inviteId)
}

export async function getOrganizationByIdAction(orgId: string) {
  const { organization } = await getOrganizationById(orgId)

  return organization
}
