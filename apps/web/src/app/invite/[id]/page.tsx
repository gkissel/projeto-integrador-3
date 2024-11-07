import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { CheckCircle, LogIn, LogOut } from 'lucide-react'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { auth, isAuthenticated } from '@/auth/auth'
import { Button } from '@/components/catalyst/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { getInvite } from '@/http/get-invite'
import { acceptInvite } from '@/http/invite/accept-invite'

dayjs.extend(relativeTime)

interface InvitePageProps {
  params: Promise<{ id: string }>
}

export default async function InvitePage({ params }: InvitePageProps) {
  const inviteId = (await params).id

  const { invite } = await getInvite(inviteId)
  const isUserAuthenticated = isAuthenticated()

  let currentUserEmail = null

  if (await isUserAuthenticated) {
    const { user } = await auth()

    currentUserEmail = user.email
  }

  const userIsAuthenticatedWithSameEmailFromInvite =
    currentUserEmail === invite.email

  async function signInFromInvite() {
    'use server'

    // eslint-disable-next-line prettier/prettier
    ;(await cookies()).set('inviteId', inviteId)

    redirect(`/auth/sign-in?email=${invite.email}`)
  }

  async function acceptInviteAction() {
    'use server'

    await acceptInvite(inviteId)

    redirect('/')
  }

  return (
    <div className='flex min-h-screen flex-col items-center justify-center px-4'>
      <div className='flex w-full max-w-sm flex-col justify-center space-y-6'>
        <div className='flex flex-col items-center space-y-4'>
          <Avatar className='size-16'>
            {invite.author?.avatarUrl && (
              <AvatarImage src={invite.author.avatarUrl} />
            )}
            <AvatarFallback />
          </Avatar>

          <p className='text-balance text-center leading-relaxed text-muted-foreground'>
            <span className='font-medium text-foreground'>
              {invite.author?.name ?? 'Alguém'}
            </span>{' '}
            convidei você para participar{' '}
            <span className='font-medium text-foreground'>
              {invite.organization.name}
            </span>
            .{' '}
            <span className='text-xs'>{dayjs(invite.createdAt).fromNow()}</span>
          </p>
        </div>

        <Separator />

        {!isUserAuthenticated && (
          <form action={signInFromInvite}>
            <Button type='submit' color='cyan' className='w-full'>
              <LogIn className='mr-2 size-4' />
              Faça login para aceitar o convite
            </Button>
          </form>
        )}

        {userIsAuthenticatedWithSameEmailFromInvite && (
          <form action={acceptInviteAction}>
            <Button type='submit' color='emerald' className='w-full'>
              <CheckCircle className='mr-2 size-4' />
              Juntar-se {invite.organization.name}
            </Button>
          </form>
        )}

        {(await isUserAuthenticated) &&
          !userIsAuthenticatedWithSameEmailFromInvite && (
            <div className='space-y-4'>
              <p className='text-balance text-center text-sm leading-relaxed text-muted-foreground'>
                Este convite foi enviado para{' '}
                <span className='font-medium text-foreground'>
                  {invite.email}
                </span>{' '}
                mas você está atualmente autenticado como{' '}
                <span className='font-medium text-foreground'>
                  {currentUserEmail}
                </span>
                .
              </p>

              <div className='space-y-2'>
                <Button
                  className='w-full'
                  color='fuchsia'
                  href={'/api/auth/sign-out'}
                >
                  <LogOut className='mr-2 size-4' />
                  Sair de {currentUserEmail}
                </Button>

                <Button className='w-full' color='indigo' href={'/'}>
                  <span>Voltar ao painel</span>
                </Button>
              </div>
            </div>
          )}
      </div>
    </div>
  )
}
