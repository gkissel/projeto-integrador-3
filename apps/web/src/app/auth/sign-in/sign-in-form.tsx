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
    <div className='space-y-14 w-full grid mx-auto'>
      <div className='flex items-center gap-2'>
        <div className='relative h-24 w-24 rounded-full border p-4'>
          <Image src={Logo} alt='' fill className='rounded-full' />
        </div>
        <strong className='text-3xl font-bold'>SafeBudget</strong>
      </div>
      <div className='space-y-4'>
        <div className='flex flex-col gap-2'>
          <Heading className='!text-4xl'>Login</Heading>
          <Text className='text-sm font-medium'>
            Welcome back! Please enter your details
          </Text>
        </div>
        <form onSubmit={handleSubmit} className='w-full lg:min-w-96 space-y-4'>
          {success === false && message && (
            <Alert variant='destructive'>
              <AlertTriangle className='size-4' />
              <AlertTitle>Sign in failed!</AlertTitle>
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
            <Label htmlFor='password'>Password</Label>
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
            Forgot your password?
          </Link>

          <Button className='w-full' type='submit' disabled={isPending}>
            {isPending ? (
              <Loader2 className='size-4 animate-spin' />
            ) : (
              'Sign in with e-mail'
            )}
          </Button>

          <div className='flex items-baseline gap-4 text-sm'>
            <Text>Don&apos;t have an account? </Text>
            <TextLink href='/auth/sign-up'>Sign up</TextLink>
          </div>
        </form>
      </div>
    </div>
  )
}
