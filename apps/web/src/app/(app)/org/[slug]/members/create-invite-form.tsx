'use client'

import { AlertTriangle, Loader2, UserPlus } from 'lucide-react'

import { Button } from '@/components/catalyst/button'
import { Input } from '@/components/catalyst/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/catalyst/select'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { useFormState } from '@/hooks/use-form-state'

import { createInviteAction } from './actions'

export function CreateInviteForm() {
  const [{ errors, message, success }, handleSubmit, isPending] =
    useFormState(createInviteAction)

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      {success === false && message && (
        <Alert variant='destructive'>
          <AlertTriangle className='size-4' />
          <AlertTitle>Falha no convite!</AlertTitle>
          <AlertDescription>
            <p>{message}</p>
          </AlertDescription>
        </Alert>
      )}

      <div className='flex items-center gap-2'>
        <div className='flex-1 space-y-1'>
          <Input
            name='email'
            id='email'
            type='email'
            placeholder='mateus@example.com'
          />

          {errors?.email && (
            <p className='text-xs font-medium text-red-500 dark:text-red-400'>
              {errors.email[0]}
            </p>
          )}
        </div>

        <Select name='role' defaultValue='MEMBER'>
          <SelectTrigger className='w-32'>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='ADMIN'>Admin</SelectItem>
            <SelectItem value='MEMBER'>Membro</SelectItem>
          </SelectContent>
        </Select>

        <Button type='submit' disabled={isPending}>
          {isPending ? (
            <Loader2 className='size-4 animate-spin' />
          ) : (
            <>
              <UserPlus className='mr-2 size-4' />
              Convidar usuário
            </>
          )}
        </Button>
      </div>
    </form>
  )
}
