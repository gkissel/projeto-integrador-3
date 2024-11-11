'use client'

import { EllipsisVerticalIcon, Loader2, Pen, Trash } from 'lucide-react'
import { useState } from 'react'

import Button from '@/components/catalyst/button'
import {
  Dialog,
  DialogBody,
  DialogDescription,
  DialogTitle,
} from '@/components/catalyst/dialog'
import {
  Dropdown,
  DropdownButton,
  DropdownDivider,
  DropdownItem,
  DropdownLabel,
  DropdownMenu,
  DropdownSection,
} from '@/components/catalyst/dropdown'
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

import { deleteTransactionAction, updateTransactionAction } from '../actions'

type Transaction = {
  id: string
  description: string
  value: number
  type: 'INCOME' | 'OUTCOME'
  orgId: string
  accountId: string
  createdAt: string
  updatedAt: string
}

export function TransactionInfoDropDown({
  transaction,
}: {
  transaction: Transaction
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [type, setType] = useState<'INCOME' | 'OUTCOME'>(transaction.type)

  const [{ errors, message, success }, handleSubmit, isPending] = useFormState(
    updateTransactionAction,
  )

  return (
    <>
      <Dropdown>
        <DropdownButton className='w-fit px-2 lg:px-2'>
          <EllipsisVerticalIcon className='size-4' />
        </DropdownButton>
        <DropdownMenu
          anchor='top start'
          className='overflow-hidden rounded-md p-3'
        >
          <DropdownSection>
            <DropdownLabel className='pb-2'>Transação</DropdownLabel>

            <DropdownDivider />

            <DropdownItem onClick={() => setIsOpen(true)}>
              <Pen className='mr-2 size-4' />
              <Text className='line-clamp-1'>Editar Transação</Text>
            </DropdownItem>

            <DropdownItem
              type='submit'
              className='text-rose-700'
              onClick={() => {
                deleteTransactionAction(transaction.id)
              }}
            >
              <Trash className='mr-2 size-4 text-rose-500' />
              <Text className='line-clamp-1 dark:text-rose-500'>
                Remover Transação
              </Text>
            </DropdownItem>
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>

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
