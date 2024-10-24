'use client'

import { AlertTriangle, Loader2 } from 'lucide-react'

import { Button } from '@/components/catalyst/button'
import { Field, Label } from '@/components/catalyst/fieldset'
import { Input } from '@/components/catalyst/input'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { useFormState } from '@/hooks/use-form-state'

import {
  createOrganizationAction,
  OrganizationSchema,
  updateOrganizationAction,
} from './actions'

interface OrganizationFormProps {
  isUpdating?: boolean
  initialData?: OrganizationSchema
}

export function OrganizationForm({
  isUpdating = false,
  initialData,
}: OrganizationFormProps) {
  const formAction = isUpdating
    ? updateOrganizationAction
    : createOrganizationAction

  const [{ errors, message, success }, handleSubmit, isPending] =
    useFormState(formAction)

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      {success === false && message && (
        <Alert variant='destructive'>
          <AlertTriangle className='size-4' />
          <AlertTitle>Falha ao salvar organização!</AlertTitle>
          <AlertDescription>
            <p>{message}</p>
          </AlertDescription>
        </Alert>
      )}

      {success === true && message && (
        <Alert variant='success'>
          <AlertTriangle className='size-4' />
          <AlertTitle>Sucesso!</AlertTitle>
          <AlertDescription>
            <p>{message}</p>
          </AlertDescription>
        </Alert>
      )}

      <Field className='space-y-1'>
        <Label htmlFor='name'>Nome da organização</Label>
        <Input name='name' id='name' defaultValue={initialData?.name} />

        {errors?.name && (
          <p className='text-xs font-medium text-red-500 dark:text-red-400'>
            {errors.name[0]}
          </p>
        )}
      </Field>

      <Button
        color='indigo'
        className='w-full'
        type='submit'
        disabled={isPending}
      >
        {isPending ? (
          <Loader2 className='size-4 animate-spin' />
        ) : (
          'Salvar organização'
        )}
      </Button>
    </form>
  )
}
