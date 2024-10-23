'use client'

import { AlertTriangle, Loader2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

import { Button } from '@/components/catalyst/button'
import { Field, Label } from '@/components/catalyst/fieldset'
import { Heading } from '@/components/catalyst/heading'
import { Input } from '@/components/catalyst/input'
import { Text, TextLink } from '@/components/catalyst/text'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { useFormState } from '@/hooks/use-form-state'

import Logo from '../../../../public/logo.png'
import { signInWithEmailAndPassword } from './actions'

export function SignInForm() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [{ errors, message, success }, handleSubmit, isPending] = useFormState(
    signInWithEmailAndPassword,
    () => {
      router.push('/')
    },
  )

  return (
    <div className='mx-auto flex flex-col gap-16 w-full max-w-sm mt-7'>
      <div className='flex items-center h-fit mt-24 relative'>
        <div className='p-1 h-24 w-24'>
          <Image src={Logo} alt='' width={96} height={96} className='w-20' />
        </div>
        <strong className='text-4xl font-bold absolute left-20'>SafeBudget</strong>
      </div>
      <div className='space-y-4'>
        <div className='flex flex-col gap-2'>
          <Heading className='!text-3xl'>Entrar</Heading>
          <Text className='text-sm font-medium'>
          Bem-vindo de volta! Por favor insira seus dados
          </Text>
        </div>
        <form onSubmit={handleSubmit} className='w-full space-y-4 lg:min-w-96'>
          {success === false && message && (
            <Alert variant='destructive'>
              <AlertTriangle className='size-4' />
              <AlertTitle>Falha no login!</AlertTitle>
              <AlertDescription>
                <p>{message}</p>
              </AlertDescription>
            </Alert>
          )}

          <Field className='space-y-1'>
            <Label htmlFor='email'>E-mail</Label>
            <Input
              name='email'
              type='email'
              id='email'
              defaultValue={searchParams.get('email') ?? ''}
            />

            {errors?.email && (
              <p className='text-xs font-medium text-red-500 dark:text-red-400'>
                {errors.email[0]}
              </p>
            )}
          </Field>

          <Field className='space-y-1'>
            <Label htmlFor='password'>Senha</Label>
            <Input name='password' type='password' id='password' />

            {errors?.password && (
              <p className='text-xs font-medium text-red-500 dark:text-red-400'>
                {errors.password[0]}
              </p>
            )}
          </Field>

          <Link
            href='/auth/forgot-password'
            className='text-xs font-medium text-foreground hover:underline'
          >
            Esqueceu sua senha?
          </Link>

          <Button className='w-full' type='submit' disabled={isPending}>
            {isPending ? (
              <Loader2 className='size-4 animate-spin' />
            ) : (
              'Entrar'
            )}
          </Button>

          <div className='flex items-baseline gap-2 text-sm'>
            <Text>Já possui uma conta?</Text>
            <TextLink href='/auth/sign-up'>Cadastrar</TextLink>
          </div>
        </form>
      </div>
    </div>
  )
}
