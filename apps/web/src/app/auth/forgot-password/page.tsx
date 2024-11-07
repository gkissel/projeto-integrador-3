'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import { Button } from '@/components/catalyst/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import Logo from '../../../../public/logo.png'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [successMessage, setSuccessMessage] = useState<string>('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSuccessMessage('')
    setError('')

    if (!email) {
      setError('Por favor, insira seu e-mail')
      return
    }

    try {
      const response = await fetch('/api/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()
      if (response.ok) {
        setSuccessMessage(data.message)
      } else {
        setError(data.message)
      }
    } catch (error) {
      setError('Ocorreu um erro ao enviar o e-mail. Tente novamente.')
      console.error('Erro:', error)
    }
  }

  return (
    <div>
      <div className='-mt-32 mb-24 flex w-full items-center justify-center'>
        <div className='-ml-6 h-32 w-32 p-1'>
          <Image src={Logo} alt='Logo' width={96} height={96} />
        </div>
        <strong className='-ml-8 text-4xl font-bold'>SafeBudget</strong>
      </div>
      <div className='relative m-auto h-full w-1/3'>
        <div className='mt-10 rounded-lg border-2'>
          <div className='p-8 pb-8'>
            <strong className='text-2xl font-bold'>Recuperar a senha</strong>
            <p className='pt-4 font-thin'>
              Para redefinir sua senha, informe o e-mail cadastrado na sua conta
              e lhe enviaremos um link com as instruções
            </p>
          </div>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div className='m-auto mb-12 mt-8 space-y-1 px-8'>
              <Label htmlFor='email'>E-mail</Label>
              <Input
                name='email'
                type='email'
                id='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {error && <p className='text-red-500'>{error}</p>}
              {successMessage && (
                <p className='text-green-500'>{successMessage}</p>
              )}
            </div>

            <div className='flex flex-col items-center space-y-4 pb-8'>
              <Button className='w-1/3' color='indigo' type='submit'>
                Recuperar senha
              </Button>
              <Button className='w-1/3' type='button'>
                <Link href='/auth/sign-in'>Voltar para o Login</Link>
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
