'use client'

import { Loader2 } from 'lucide-react'
import { useState } from 'react'

import Button from '@/components/catalyst/button'
import {
  Dialog,
  DialogBody,
  DialogDescription,
  DialogTitle,
} from '@/components/catalyst/dialog'
import { Field, Label } from '@/components/catalyst/fieldset'
import { Input } from '@/components/catalyst/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/catalyst/select'
import { useFormState } from '@/hooks/use-form-state'

import { createTransactionAction } from '../actions'

export function CreateTransactionForm({
  accounts,
  defaultAccount,
}: {
  accounts: {
    id: string
    name: string
    mainColor?: string
  }[]
  defaultAccount?: string
}) {
  const [isOpen, setIsOpen] = useState(false)

  const [type, setType] = useState<'INCOME' | 'OUTCOME'>('INCOME')

  const [{ errors, message, success }, handleSubmit, isPending] = useFormState(
    createTransactionAction,
    () => setIsOpen(false),
  )

  return (
    <>
      <div className='flex flex-col items-start space-y-1'>
        <Button onClick={() => setIsOpen(true)} color='light'>
          Nova Transferência
        </Button>
      </div>

      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <DialogTitle>Nova Transação</DialogTitle>

        <DialogDescription>
          Preencha as informações para adicionar uma nova transação.
        </DialogDescription>

        <DialogBody>
          <form onSubmit={handleSubmit}>
            <Field className='space-y-1'>
              <Label htmlFor='description'>Descrição</Label>
              <Input name='description' id='description' />
              {errors?.description && (
                <p className='mt-1 text-sm text-red-500'>
                  {errors.description[0]}
                </p>
              )}
            </Field>

            <Field className='mt-4 space-y-1'>
              <Label htmlFor='value'>Valor</Label>
              <Input
                name='value'
                id='value'
                type='number'
                step='0.01'
                placeholder='0.00'
              />
              {errors?.value && (
                <p className='mt-1 text-sm text-red-500'>{errors.value[0]}</p>
              )}
            </Field>

            <Field className='mt-4 flex items-center gap-2'>
              <Label htmlFor='accountId'>Conta</Label>
              <Select
                name='accountId'
                // id='accountId'
                defaultValue={defaultAccount}
              >
                <SelectTrigger className='h-8 w-32'>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {accounts.map((account) => (
                    <SelectItem key={account.id} value={account.id}>
                      <div className='flex items-center gap-1.5'>
                        <div
                          className='h-4 w-4 rounded-full'
                          style={{ backgroundColor: account.mainColor }}
                        />{' '}
                        {account.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>

            <Field className='mt-4 flex items-center gap-2'>
              <Label htmlFor='type' className='w-10'>
                Tipo
              </Label>
              <Select
                name='type'
                // id='type'
                value={type}
                onValueChange={(value) =>
                  setType(value as 'INCOME' | 'OUTCOME')
                }
                // className='w-full rounded-md border border-gray-700 bg-transparent px-3 py-2'
              >
                <SelectTrigger className='h-8 w-32'>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='INCOME'>Entrada</SelectItem>
                  <SelectItem value='OUTCOME'>Saída</SelectItem>
                </SelectContent>
              </Select>
              {errors?.type && (
                <p className='mt-1 text-sm text-red-500'>{errors.type[0]}</p>
              )}
            </Field>

            <div className='mt-6 flex justify-end gap-4'>
              <Button onClick={() => setIsOpen(false)} className='text-white'>
                Cancelar
              </Button>

              <Button color='indigo' type='submit' disabled={isPending}>
                {isPending ? (
                  <Loader2 className='size-4 animate-spin' />
                ) : (
                  'Criar Transação'
                )}
              </Button>
            </div>
          </form>
        </DialogBody>
      </Dialog>
    </>
  )
}
