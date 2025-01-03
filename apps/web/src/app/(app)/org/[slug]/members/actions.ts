'use server'

import { Role, roleSchema } from '@repo/auth'
import { HTTPError } from 'ky'
import { revalidateTag } from 'next/cache'
import { z } from 'zod'

import { getCurrentOrg } from '@/auth/auth'
import { createInvite } from '@/http/invite/create-invite'
import { revokeInvite } from '@/http/invite/revoke-invite'
import { removeMember } from '@/http/member/remove-member'
import { updateMember } from '@/http/member/update-member'
import { getUserById } from '@/http/user/get-user-by-id'

const inviteSchema = z.object({
  email: z.string().email({ message: 'Endereço de e-mail inválido.' }),
  role: roleSchema,
})

export async function createInviteAction(data: FormData) {
  const currentOrg = await getCurrentOrg()!
  const result = inviteSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  const { email, role } = result.data

  try {
    await createInvite({
      org: currentOrg!,
      email,
      role,
    })

    revalidateTag(`${currentOrg}/invites`)
  } catch (err) {
    if (err instanceof HTTPError) {
      const { message } = await err.response.json()

      return { success: false, message, errors: null }
    }

    console.error(err)

    return {
      success: false,
      message: 'Erro inesperado. Tente novamente em alguns minutos.',
      errors: null,
    }
  }

  return {
    success: true,
    message: 'O convite foi enviado com sucesso.',
    errors: null,
  }
}

export async function removeMemberAction(memberId: string) {
  const currentOrg = await getCurrentOrg()

  await removeMember({
    org: currentOrg!,
    memberId,
  })

  revalidateTag(`${currentOrg}/members`)
}

export async function updateMemberAction(memberId: string, role: Role) {
  const currentOrg = await getCurrentOrg()

  await updateMember({
    org: currentOrg!,
    memberId,
    role,
  })

  revalidateTag(`${currentOrg}/members`)
}

export async function revokeInviteAction(inviteId: string) {
  const currentOrg = await getCurrentOrg()

  await revokeInvite({
    org: currentOrg!,
    inviteId,
  })

  revalidateTag(`${currentOrg}/invites`)
}

export async function getUserByIdAction(id: string) {
  const { user } = await getUserById({ id })

  return user
}
