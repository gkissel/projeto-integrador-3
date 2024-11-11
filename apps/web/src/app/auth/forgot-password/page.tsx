'use client'
import Image from 'next/image'

import { Button } from '@/components/catalyst/button'
import { Field, Label } from '@/components/catalyst/fieldset'
import { Input } from '@/components/catalyst/input'
import { useFormState } from '@/hooks/use-form-state'

import Logo from '../../../../public/logo.png'
import { recoverPasswordAction } from './actions'

export default function ForgotPasswordPage() {
  const [{ errors, message, success }, handleSubmit, isPending] = useFormState(
    recoverPasswordAction,
    () => {},
  )

  return (
    <div>
      <div className='-mt-32 mb-24 flex w-full items-center justify-center'>
        <div className='-ml-6 h-32 w-32 p-1'>
          <Image src={Logo} alt='Logo' width={96} height={96} />
        </div>
        <strong className='-ml-8 text-4xl font-bold'>SafeBudget</strong>
      </div>
      <div className='relative m-auto h-full max-w-xl'>
        <div className='mt-10 rounded-lg border-2'>
          <div className='p-8 pb-8'>
            <strong className='text-2xl font-bold'>Recuperar a senha</strong>
            <p className='pt-4 font-thin'>
              Para redefinir sua senha, informe o e-mail cadastrado na sua conta
              e lhe enviaremos um link com as instruções
            </p>
          </div>

          <form onSubmit={handleSubmit} className='space-y-4'>
            <Field className='m-auto mb-12 mt-8 space-y-1 px-8'>
              <Label htmlFor='email'>E-mail</Label>
              <Input
                name='email'
                type='email'
                id='email'
                className='disabled:cursor-not-allowed'
              />
              {errors?.email && (
                <p className='text-xs text-red-500'>{errors.email[0]}</p>
              )}
            </Field>

            {message && (
              <p
                className={`px-8 text-sm ${success ? 'text-green-500' : 'text-red-500'}`}
              >
                {message}
              </p>
            )}

            <div className='flex justify-center space-x-4 pb-8 pt-16'>
              <Button color='indigo' type='submit' disabled={isPending}>
                Recuperar senha
              </Button>
              <Button type='button' href='/auth/sign-in'>
                Voltar para o Login
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
