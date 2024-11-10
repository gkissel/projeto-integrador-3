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
import { useFormState } from '@/hooks/use-form-state'

import { createAccountAction } from './action'

export function CreateNewAccountForm() {
  const [isOpen, setIsOpen] = useState(false)

  const [{ errors, message, success }, handleSubmit, isPending] =
    useFormState(createAccountAction)

  return (
    <>
      <div className='flex flex-col items-start space-y-1'>
        <button
          className='flex h-[190px] w-[300px] cursor-pointer flex-col items-center justify-center rounded-lg border border-[#303032] bg-[#18181B] transition-colors duration-200 hover:bg-[#2b2b2b]'
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className='text-4xl text-gray-400'>+</div>
          <span className='mt-2 text-gray-500'>Adicionar Conta</span>
        </button>
      </div>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <DialogTitle>Adicionar Nova Conta</DialogTitle>

        <DialogDescription>
          Preencha as informações para adicionar uma nova conta.
        </DialogDescription>

        <DialogBody>
          <form onSubmit={handleSubmit}>
            <Field className='space-y-1'>
              <Label htmlFor='name'>Nome da conta</Label>
              <Input name='name' id='name' />
              {errors?.name && (
                <p className='mt-1 text-sm text-red-500'>{errors.name[0]}</p>
              )}
            </Field>

            <Field className='mt-4 space-y-1'>
              <Label htmlFor='image'>Imagem</Label>
              <Input
                name='image'
                id='image'
                placeholder='Selecione uma imagem'
                type='file'
              />
              {errors?.image && (
                <p className='mt-1 text-sm text-red-500'>{errors.image[0]}</p>
              )}
            </Field>

            <Field className='mt-4 space-y-1'>
              <Label htmlFor='balance'>Saldo</Label>
              <Input
                name='balance'
                id='balance'
                type='number'
                placeholder='Saldo da conta'
              />
              {errors?.balance && (
                <p className='mt-1 text-sm text-red-500'>{errors.balance[0]}</p>
              )}
            </Field>

            <div className='mt-6 flex justify-end gap-4'>
              <Button onClick={() => setIsOpen(false)} className='text-white'>
                Fechar
              </Button>

              <Button color='indigo' type='submit' disabled={isPending}>
                {isPending ? (
                  <Loader2 className='size-4 animate-spin' />
                ) : (
                  <>Criar Conta</>
                )}
              </Button>
            </div>
          </form>
        </DialogBody>
      </Dialog>
    </>
  )
}
