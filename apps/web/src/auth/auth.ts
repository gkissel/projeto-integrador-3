'use server'

/* eslint-disable no-shadow */

/* eslint-disable consistent-return */
import { defineAbilityFor } from '@repo/auth'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { getMembership } from '@/http/member/get-membership'
import { getProfile } from '@/http/organization/get-profile'

export async function isAuthenticated() {
  return !!(await cookies()).get('token')?.value
}

export async function getCurrentOrg() {
  return (await cookies()).get('org')?.value ?? null
}

export async function getCurrentMembership() {
  const org = await getCurrentOrg()

  if (!org) {
    return null
  }

  const { membership } = await getMembership(org)

  return membership
}

export async function ability() {
  const membership = await getCurrentMembership()

  if (!membership) {
    return null
  }

  const ability = defineAbilityFor({
    id: membership.userId,
    role: membership.role,
  })

  return ability
}

export async function currentRole() {
  const membership = await getCurrentMembership()

  if (!membership) {
    return null
  }

  return membership.role
}

export async function auth() {
  const token = (await cookies()).get('token')?.value

  // console.log(typeof token)

  if (!token) {
    redirect('/auth/sign-in')
  }

  try {
    const { user } = await getProfile()
    // console.log(typeof user)
    return { user }
  } catch {
    console.log('Deu erro')
  }

  console.log('not authenticated')
  redirect('/api/auth/sign-out')
}
