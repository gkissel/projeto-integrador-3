'use client'

import { Loader2 } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/catalyst/button'
import { Field, Label } from '@/components/catalyst/fieldset'
import { Input } from '@/components/catalyst/input'
import { Select } from '@/components/catalyst/select'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

interface NewTransferProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
}

export function NewTransfer({
  isOpen,
  onClose,
  title,
  children,
}: NewTransferProps) {
  const [destination, setDestination] = useState('')
  const [date, setDate] = useState('')
  const [amount, setAmount] = useState('')
  const [account, setAccount] = useState('')
  const [errors, setErrors] = useState({
    destination: false,
    date: false,
    amount: false,
    account: false,
  })
  const [message, setMessage] = useState('')
  const [success, setSuccess] = useState<boolean | null>(null)
  const [isPending, setIsPending] = useState(false)

  if (!isOpen) return null

  const handleSave = () => {
    setErrors({
      destination: destination.trim() === '',
      date: date.trim() === '',
      amount: amount.trim() === '',
      account: account.trim() === '',
    })

    if (destination.trim() && date.trim() && amount.trim() && account.trim()) {
      setIsPending(true)
      setTimeout(() => {
        // Simula sucesso ou erro na ação
        setMessage('Transferência salva com sucesso!')
        setSuccess(true)
        setIsPending(false)
      }, 2000)
    } else {
      setMessage('Todos os campos são obrigatórios.')
      setSuccess(false)
    }
  }

  return (
    <div className='fixed inset-0 flex items-start justify-end bg-black bg-opacity-50'>
      <div className='w-[400px] rounded-lg bg-[#18181B] p-6'>
        <h2 className='text-xl font-bold text-white'>{title}</h2>

        <div className='mb-6 mt-4 text-gray-400'>{children}</div>

        {/* Exibindo Mensagem de Sucesso ou Erro */}
        {success === false && message && (
          <Alert variant='destructive'>
            <AlertTitle>Falha ao salvar transferência!</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}

        {success === true && message && (
          <Alert variant='success'>
            <AlertTitle>Sucesso!</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}

        {/* Destino */}
        <Field className='space-y-1'>
          <Label htmlFor='destination'>Destino</Label>
          <Input
            name='destination'
            id='destination'
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className={errors.destination ? 'border-red-500' : ''}
          />
          {errors.destination && (
            <p className='mt-1 text-sm text-red-500'>Destino é obrigatório.</p>
          )}
        </Field>

        {/* Data */}
        <Field className='mt-4 space-y-1'>
          <Label htmlFor='date'>Data</Label>
          <Input
            name='date'
            id='date'
            type='date'
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={errors.date ? 'border-red-500' : ''}
          />
          {errors.date && (
            <p className='mt-1 text-sm text-red-500'>A data é obrigatória.</p>
          )}
        </Field>

        {/* Valor */}
        <Field className='mt-4 space-y-1'>
          <Label htmlFor='amount'>Valor</Label>
          <Input
            name='amount'
            id='amount'
            type='text'
            placeholder='Valor da transferência'
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className={errors.amount ? 'border-red-500' : ''}
          />
          {errors.amount && (
            <p className='mt-1 text-sm text-red-500'>O valor é obrigatório.</p>
          )}
        </Field>

        {/* Conta */}
        <Field className='mt-4 space-y-1'>
          <Label htmlFor='account'>Conta</Label>
          <Select
            name='account'
            id='account'
            value={account}
            onChange={(e) => setAccount(e.target.value)}
            className={errors.account ? 'border-red-500' : ''}
          >
            <option value=''>Selecione uma conta</option>
            <option value='conta1'>Conta 1</option>
            <option value='conta2'>Conta 2</option>
          </Select>
          {errors.account && (
            <p className='mt-1 text-sm text-red-500'>A conta é obrigatória.</p>
          )}
        </Field>

        <div className='mt-6 flex justify-center gap-4'>
          <Button
            color='indigo'
            type='button'
            onClick={handleSave}
            disabled={isPending}
          >
            {isPending ? (
              <Loader2 className='size-4 animate-spin' />
            ) : (
              'Salvar transferência'
            )}
          </Button>

          <Button onClick={onClose} className='text-white'>
            Fechar
          </Button>
        </div>
      </div>
    </div>
  )
}
