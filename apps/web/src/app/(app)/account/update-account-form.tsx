'use client'

import { AlertTriangle, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useRef } from 'react'

import { Button } from '@/components/catalyst/button'
import { Divider } from '@/components/catalyst/divider'
import {
  ErrorMessage,
  Field,
  FieldGroup,
  Fieldset,
  Label,
} from '@/components/catalyst/fieldset'
import { Subheading } from '@/components/catalyst/heading'
import { Input } from '@/components/catalyst/input'
import { Text } from '@/components/catalyst/text'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { useFormState } from '@/hooks/use-form-state'

import { updateProfileAction } from './actions'
import DeleteAccountButton from './delete-account-button'

export default function UpdateAccountForm({
  user,
}: {
  user: {
    id: string
    firstName: string | null
    lastName: string | null
    birthdate: string
    telephone: string
    email: string
  }
}) {
  const router = useRouter()
  const [{ errors, message, success }, handleSubmit, isPending] = useFormState(
    updateProfileAction,
    () => {
      router.refresh()
    },
  )

  const formRef = useRef<HTMLFormElement>(null)
  return (
    <form onSubmit={handleSubmit} className='space-y-4' ref={formRef}>
      <Fieldset className='space-y-4'>
        {success === false && message && (
          <Alert variant='destructive'>
            <AlertTriangle className='size-4' />
            <AlertTitle>Falha na inscrição!</AlertTitle>
            <AlertDescription>
              <p>{message}</p>
            </AlertDescription>
          </Alert>
        )}

        <section className='grid gap-x-8 gap-y-6 sm:grid-cols-2'>
          <div className='space-y-1'>
            <Subheading>Nome</Subheading>
            <Text>
            Isso será exibido em seu perfil público.</Text>
          </div>
          <div>
            <FieldGroup className='flex gap-2 !space-y-0'>
              <Field className='space-y-1'>
                <Label htmlFor='firstName'>Nome</Label>
                <Input
                  name='firstName'
                  id='firstName'
                  defaultValue={user?.firstName || ''}
                />

                {errors?.firstName && (
                  <ErrorMessage className='text-xs font-medium text-red-500 dark:text-red-400'>
                    {errors.firstName[0]}
                  </ErrorMessage>
                )}
              </Field>

              <Field className='space-y-1'>
                <Label htmlFor='lastName'>Sobrenome</Label>
                <Input
                  name='lastName'
                  id='lastName'
                  defaultValue={user?.lastName || ''}
                />

                {errors?.firstName && (
                  <ErrorMessage className='text-xs font-medium text-red-500 dark:text-red-400'>
                    {errors.firstName[0]}
                  </ErrorMessage>
                )}
              </Field>
            </FieldGroup>
          </div>
        </section>

        <Divider soft />

        <section className='grid gap-x-8 gap-y-6 sm:grid-cols-2'>
          <div className='space-y-1'>
            <Subheading>Informações pessoais</Subheading>
            <Text>Isso não é visível no seu perfil público.</Text>
          </div>
          <div>
            <FieldGroup className='grid grid-cols-2 justify-between gap-2 !space-y-0'>
              <Field className='space-y-1'>
                <Label htmlFor='birthdate'>Data de nascimento</Label>
                <Input
                  name='birthdate'
                  id='birthdate'
                  type='string'
                  disabled
                  readOnly
                  className='w-full min-w-48 max-w-xs'
                  value={new Date(user?.birthdate).toLocaleDateString('pt-BR')}
                  defaultValue={new Date(user?.birthdate).toLocaleDateString(
                    'pt-BR',
                  )}
                />

                {errors?.birthdate && (
                  <ErrorMessage className='text-xs font-medium text-red-500 dark:text-red-400'>
                    {errors.birthdate[0]}
                  </ErrorMessage>
                )}
              </Field>

              <Field className='space-y-1'>
                <Label htmlFor='phone'>Número de celular</Label>
                <Input
                  name='telephone'
                  id='telephone'
                  type='tel'
                  placeholder='13-94569-7890'
                  defaultValue={user?.telephone || ''}
                  required
                />

                {errors?.telephone && (
                  <ErrorMessage className='text-xs font-medium text-red-500 dark:text-red-400'>
                    {errors.telephone[0]}
                  </ErrorMessage>
                )}
              </Field>
            </FieldGroup>
          </div>
        </section>

        <Divider soft />

        <Field className='cursor-default space-y-1 pb-4'>
          <Label htmlFor='email'>E-mail</Label>
          <Input
            name='email'
            type='email'
            id='email'
            defaultValue={user?.email || ''}
            disabled
            className='disabled:cursor-not-allowed'
            readOnly
          />

          {errors?.email && (
            <ErrorMessage className='text-xs font-medium text-red-500 dark:text-red-400'>
              {errors.email[0]}
            </ErrorMessage>
          )}
        </Field>

        <Divider className='my-10' />

        <div className='flex items-center flex-col lg:flex-row gap-4 lg:justify-between pt-4'>
          <DeleteAccountButton />
          <div className='flex justify-end gap-4 lg:flex-row flex-col w-full lg:w-fit'>
            <Button
              type='reset'
              plain
              className='w-full lg:w-fit'
              onClick={() => {
                formRef.current?.reset()
              }}
            >
              Restaurar
            </Button>
            <Button type='submit' color='indigo' disabled={isPending}  className='w-full lg:w-fit' >
              {isPending ? (
                <Loader2 className='size-4 animate-spin' />
              ) : (
                'Atualizar informações da conta'
              )}
            </Button>
          </div>
        </div>
      </Fieldset>
    </form>
  )
}
