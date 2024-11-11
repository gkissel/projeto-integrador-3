'use client'

import { Loader2, Pen } from 'lucide-react'
import { useState } from 'react'

import Button from '@/components/catalyst/button'
import {
  Dialog,
  DialogBody,
  DialogDescription,
  DialogTitle,
} from '@/components/catalyst/dialog'
import { DropdownItem } from '@/components/catalyst/dropdown'
import { Field, Label } from '@/components/catalyst/fieldset'
import { Input } from '@/components/catalyst/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/catalyst/select'
import { Text } from '@/components/catalyst/text'
import { useFormState } from '@/hooks/use-form-state'

import { updateTransactionAction } from '../actions'

interface EditTransactionFormProps {
  transaction: {
    id: string
    description: string
    value: number
    type: 'INCOME' | 'OUTCOME'
  }
}

export function EditTransactionForm({ transaction }: EditTransactionFormProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [type, setType] = useState<'INCOME' | 'OUTCOME'>(transaction.type)

  const [{ errors, message, success }, handleSubmit, isPending] = useFormState(
    updateTransactionAction,
    () => setIsOpen(false),
  )

  return (
    <>
      <DropdownItem onClick={() => setIsOpen(true)}>
        <Pen className='mr-2 size-4' />
        <Text className='line-clamp-1'>Editar Transação</Text>
      </DropdownItem>

      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <DialogTitle>Editar Transação</DialogTitle>

        <DialogDescription>
          Altere as informações da transação.
        </DialogDescription>

        <DialogBody>
          <form onSubmit={handleSubmit}>
            <input type='hidden' name='transactionId' value={transaction.id} />

            <Field className='space-y-1'>
              <Label htmlFor='description'>Descrição</Label>
              <Input
                name='description'
                id='description'
                defaultValue={transaction.description}
              />
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
                defaultValue={transaction.value}
              />
              {errors?.value && (
                <p className='mt-1 text-sm text-red-500'>{errors.value[0]}</p>
              )}
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
                  'Salvar alterações'
                )}
              </Button>
            </div>
          </form>
        </DialogBody>
      </Dialog>
    </>
  )
}
