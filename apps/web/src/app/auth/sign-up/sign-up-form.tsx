'use client'

import { AlertTriangle, Loader2 } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/catalyst/button'
import {
  ErrorMessage,
  Field,
  FieldGroup,
  Fieldset,
  Label,
} from '@/components/catalyst/fieldset'
import { Heading } from '@/components/catalyst/heading'
import { Input } from '@/components/catalyst/input'
import { Text, TextLink } from '@/components/catalyst/text'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { useFormState } from '@/hooks/use-form-state'

import Logo from '../../../../public/logo.png'
import { signUpAction } from './actions'

export default function SignUpForm() {
  const router = useRouter()

  const [{ errors, message, success }, handleSubmit, isPending] = useFormState(
    signUpAction,
    () => {
      router.push('/auth/sign-in')
    },
  )

  return (
    <div className='mx-auto flex w-full max-w-sm flex-col gap-16'>
      <div className='relative flex h-fit items-center'>
        <div className='h-24 w-24 p-1'>
          <Image src={Logo} alt='' width={96} height={96} className='w-20' />
        </div>
        <strong className='absolute left-20 text-4xl font-bold'>
          SafeBudget
        </strong>
      </div>
      <div className='space-y-4'>
        <div className='flex flex-col gap-2'>
          <Heading className='!text-3xl'>Inscrever-se</Heading>
          <Text className='text-sm font-medium'>
            Por favor insira seus dados
          </Text>
        </div>
        <form onSubmit={handleSubmit} className='space-y-4'>
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

            <FieldGroup className='flex gap-2 !space-y-0'>
              <Field className='space-y-1'>
                <Label htmlFor='firstName'>Primeiro nome</Label>
                <Input name='firstName' id='firstName' />

                {errors?.firstName && (
                  <ErrorMessage className='text-xs font-medium text-red-500 dark:text-red-400'>
                    {errors.firstName[0]}
                  </ErrorMessage>
                )}
              </Field>

              <Field className='space-y-1'>
                <Label htmlFor='lastName'>Sobrenome</Label>
                <Input name='lastName' id='lastName' />

                {errors?.firstName && (
                  <ErrorMessage className='text-xs font-medium text-red-500 dark:text-red-400'>
                    {errors.lastName[0]}
                  </ErrorMessage>
                )}
              </Field>
            </FieldGroup>

            <FieldGroup className='grid grid-cols-2 justify-between gap-2 !space-y-0'>
              <Field className='space-y-1'>
                <Label htmlFor='birthdate'>Data de nascimento</Label>
                <Input
                  name='birthdate'
                  id='birthdate'
                  type='date'
                  onChange={(e) => {
                    console.log(e.target.value)
                  }}
                  className='w-full min-w-48 max-w-xs'
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
                  placeholder='(13) 94569-7890'
                />

                {errors?.telephone && (
                  <ErrorMessage className='text-xs font-medium text-red-500 dark:text-red-400'>
                    {errors.telephone[0]}
                  </ErrorMessage>
                )}
              </Field>
            </FieldGroup>

            <Field className='space-y-1'>
              <Label htmlFor='email'>E-mail</Label>
              <Input name='email' type='email' id='email' />

              {errors?.email && (
                <ErrorMessage className='text-xs font-medium text-red-500 dark:text-red-400'>
                  {errors.email[0]}
                </ErrorMessage>
              )}
            </Field>

            <Field className='space-y-1'>
              <Label htmlFor='password'>Senha</Label>
              <Input name='password' type='password' id='password' />

              {errors?.password && (
                <ErrorMessage className='text-xs font-medium text-red-500 dark:text-red-400'>
                  {errors.password[0]}
                </ErrorMessage>
              )}
            </Field>

            <Button className='w-full' type='submit' disabled={isPending}>
              {isPending ? (
                <Loader2 className='size-4 animate-spin' />
              ) : (
                'Criar conta'
              )}
            </Button>

            <div className='flex gap-1'>
              <Text>Já possui conta? </Text>
              <TextLink href='/auth/sign-in'>Entrar</TextLink>
            </div>
          </Fieldset>
        </form>
      </div>
    </div>
  )
}
