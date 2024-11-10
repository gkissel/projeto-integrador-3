import { Check, X } from 'lucide-react'

import Button from '@/components/catalyst/button'
import { Divider } from '@/components/catalyst/divider'
import { Text } from '@/components/catalyst/text'
import { acceptInviteAction } from '@/components/pending-invites/actions'

import { getUserByIdAction } from '../org/[slug]/members/actions'
import {
  getOrganizationByIdAction,
  getPendingInvitesAction,
  rejectInviteAction,
} from './action'

const Role = {
  OWNER: 'Dono',
  ADMIN: 'Administrador',
  MEMBER: 'Membro',
} as const

export default async function Invites() {
  const invites = await getPendingInvitesAction()

  return (
    <div className='space-y-8'>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-bold'>Convites</h1>
      </div>

      <Divider />

      <div className='flex items-center justify-between'>
        <div className='flex flex-col'>
          <strong>Seus Convites</strong>
          <Text>
            Aqui ficam todos os convites para se juntar a uma organização que
            você receber
          </Text>
        </div>
      </div>

      <Divider />
      {invites.length > 0 ? (
        <>
          <div className='grid grid-cols-6 gap-1 pt-4 text-left'>
            <div className='font-semibold'>Data</div>
            <div className='font-semibold'>Assunto</div>
          </div>

          <div className='grid grid-cols-6 gap-1 text-left'>
            {invites.map(async (invite) => {
              const [author, organization] = await Promise.all([
                getUserByIdAction(invite.authorId),
                getOrganizationByIdAction(invite.orgId),
              ])

              return (
                <>
                  <div>
                    {new Date(invite.createdAt).toLocaleDateString('pt-BR')}
                  </div>

                  <div className='col-span-4'>
                    {author.firstName} {author.lastName} convidou você para
                    fazer parte da organização “{organization.name}” na função
                    de {Role[invite.role]}
                  </div>

                  <div className='flex gap-4'>
                    <form action={acceptInviteAction.bind(null, invite.id)}>
                      <Button color='lime' type='submit'>
                        <Check /> Aceitar
                      </Button>
                    </form>

                    <form action={rejectInviteAction.bind(null, invite.id)}>
                      <Button color='rose' type='submit'>
                        <X /> Rejeitar
                      </Button>
                    </form>
                  </div>
                </>
              )
            })}
          </div>
        </>
      ) : (
        <>
          <div className=''>Você ainda não tem convites pendentes</div>
        </>
      )}
    </div>
  )
}
