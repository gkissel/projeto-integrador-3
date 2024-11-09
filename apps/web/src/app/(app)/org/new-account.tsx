'use client'

import { useState } from 'react'

import { Button } from '@/components/catalyst/button'
import { Field, Label } from '@/components/catalyst/fieldset'
import { Input } from '@/components/catalyst/input'

interface NewAccountProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
}

export function NewAccount({
  isOpen,
  onClose,
  title,
  children,
}: NewAccountProps) {
  const [name, setName] = useState('')
  const [image, setImage] = useState('')
  const [balance, setBalance] = useState('')
  const [errors, setErrors] = useState({
    name: false,
    image: false,
    balance: false,
  })

  if (!isOpen) return null

  const handleSave = () => {
    setErrors({
      name: name.trim() === '',
      image: image.trim() === '',
      balance: balance.trim() === '',
    })

    if (name.trim() && image.trim() && balance.trim()) {
      console.log('Conta salva com sucesso:', { name, image, balance })
    }
  }

  return (
    <div className='fixed inset-0 flex items-start justify-end bg-black bg-opacity-50'>
      <div className='w-[400px] rounded-lg bg-[#18181B] p-6'>
        <h2 className='text-xl font-bold text-white'>{title}</h2>

        <div className='mb-6 mt-4 text-gray-400'>{children}</div>

        <Field className='space-y-1'>
          <Label htmlFor='name'>Nome da conta</Label>
          <Input
            name='name'
            id='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={errors.name ? 'border-red-500' : ''}
          />
          {errors.name && (
            <p className='mt-1 text-sm text-red-500'>
              Nome da conta é obrigatório.
            </p>
          )}
        </Field>

        <Field className='mt-4 space-y-1'>
          <Label htmlFor='image'>Imagem</Label>
          <Input
            name='image'
            id='image'
            placeholder='URL da imagem'
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className={errors.image ? 'border-red-500' : ''}
          />
          {errors.image && (
            <p className='mt-1 text-sm text-red-500'>
              A URL da imagem é obrigatória.
            </p>
          )}
        </Field>

        <Field className='mt-4 space-y-1'>
          <Label htmlFor='balance'>Saldo</Label>
          <Input
            name='balance'
            id='balance'
            type='number'
            placeholder='Saldo da conta'
            value={balance}
            onChange={(e) => setBalance(e.target.value)}
            className={errors.balance ? 'border-red-500' : ''}
          />
          {errors.balance && (
            <p className='mt-1 text-sm text-red-500'>O saldo é obrigatório.</p>
          )}
        </Field>

        <div className='mt-6 flex justify-center gap-4'>
          <Button color='indigo' type='button' onClick={handleSave}>
            Salvar conta
          </Button>

          <Button onClick={onClose} className='text-white'>
            Fechar
          </Button>
        </div>
      </div>
    </div>
  )
}
