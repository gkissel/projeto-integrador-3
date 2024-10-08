import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  // console.log('Sign out')
  const redirectUrl = request.nextUrl.clone()

  redirectUrl.pathname = '/auth/sign-in'

  cookies().delete('token')

  return NextResponse.redirect(redirectUrl)
}
