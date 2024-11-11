'use client'
import { redirect } from 'next/navigation'

import { Button } from '@/components/catalyst/button'
import { Field, Label } from '@/components/catalyst/fieldset'
import { Input } from '@/components/catalyst/input'
import { useFormState } from '@/hooks/use-form-state'

import { changePasswordAction } from '../actions'

export default function ChangePasswordPage() {
  const [{ errors, message, success }, handleSubmit, isPending] = useFormState(
    changePasswordAction,
    () => {
      redirect('/account')
    },
  )

  return (
    <div>
      <div className='relative m-auto h-full max-w-xl'>
        <div className='mt-10 rounded-lg border-2'>
          <div className='p-8 pb-8'>
            <strong className='text-2xl font-bold'>Alterar Senha</strong>
            <p className='pt-4 font-thin'>
              Para garantir a segurança da sua conta, recomendamos que sua nova
              senha seja forte e única. Por favor, insira sua senha atual para
              confirmar sua identidade e defina uma nova senha.
            </p>
          </div>

          <form onSubmit={handleSubmit} className='space-y-4'>
            <Field className='m-auto mb-12 mt-8 space-y-1 px-8'>
              <Label htmlFor='oldPassword'>Senha Atual</Label>
              <Input
                name='oldPassword'
                type='password'
                id='oldPassword'
                className='disabled:cursor-not-allowed'
              />
              {errors?.oldPassword && (
                <p className='text-xs text-red-500'>{errors.oldPassword[0]}</p>
              )}
            </Field>

            <Field className='m-auto mb-12 mt-8 space-y-1 px-8'>
              <Label htmlFor='newPassword'>Nova Senha</Label>
              <Input
                name='newPassword'
                type='password'
                id='newPassword'
                className='disabled:cursor-not-allowed'
              />
              {errors?.newPassword && (
                <p className='text-xs text-red-500'>{errors.newPassword[0]}</p>
              )}
            </Field>
            <Field className='m-auto mb-12 mt-8 space-y-1 px-8'>
              <Label htmlFor='confirmPassword'>Confirmar Nova Senha</Label>
              <Input
                name='confirmPassword'
                type='password'
                id='confirmPassword'
                className='disabled:cursor-not-allowed'
              />
              {errors?.confirmPassword && (
                <p className='text-xs text-red-500'>
                  {errors.confirmPassword[0]}
                </p>
              )}
            </Field>
            {message && <p className='px-8 text-sm text-red-500'>{message}</p>}

            <div className='flex justify-center space-x-4 pb-8 pt-16'>
              <Button color='indigo' type='submit' disabled={isPending}>
                Alterar Senha
              </Button>
              <Button type='button' href='/account'>
                Cancelar
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
