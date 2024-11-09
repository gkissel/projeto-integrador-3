'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import { Button } from '@/components/catalyst/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import Logo from '../../../../public/logo.png'

export default function ForgotPasswordPage() {
  const [newPassword, setNewPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [errorMessages, setErrorMessages] = useState({
    newPassword: '',
    confirmPassword: '',
  })
  const [successMessage, setSuccessMessage] = useState<string>('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSuccessMessage('')
    setErrorMessages({
      newPassword: '',
      confirmPassword: '',
    })

    let isValid = true
    if (!newPassword) {
      setErrorMessages((prev) => ({
        ...prev,
        newPassword: 'Nova senha é obrigatória.',
      }))
      isValid = false
    } else if (newPassword.length < 6) {
      setErrorMessages((prev) => ({
        ...prev,
        newPassword: 'A nova senha deve ter no mínimo 6 dígitos.',
      }))
      isValid = false
    }
    if (!confirmPassword) {
      setErrorMessages((prev) => ({
        ...prev,
        confirmPassword: 'Confirmação da nova senha é obrigatória.',
      }))
      isValid = false
    }
    if (newPassword && confirmPassword && newPassword !== confirmPassword) {
      setErrorMessages((prev) => ({
        ...prev,
        confirmPassword: 'As novas senhas não coincidem.',
      }))
      isValid = false
    }

    if (!isValid) return

    try {
      const response = await fetch('/api/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newPassword, confirmPassword }),
      })

      const data = await response.json()
      if (response.ok) {
        setSuccessMessage(data.message)
      } else {
        setErrorMessages((prev) => ({ ...prev, newPassword: data.message }))
      }
    } catch (error) {
      setErrorMessages((prev) => ({
        ...prev,
        newPassword: 'Ocorreu um erro ao alterar a senha. Tente novamente.',
      }))
      console.error('Erro:', error)
    }
  }

  return (
    <div>
      <div className='-mt-20 mb-24 flex w-full items-center justify-center'>
        <div className='-ml-6 h-32 w-32 p-1'>
          <Image src={Logo} alt='Logo' width={96} height={96} />
        </div>
        <strong className='-ml-8 text-4xl font-bold'>SafeBudget</strong>
      </div>
      <div className='relative m-auto h-full w-1/2'>
        <div className='mt-10 rounded-lg border-2'>
          <div className='p-8 pb-8'>
            <strong className='text-2xl font-bold'>Alterar Senha</strong>
            <p className='pt-4 font-thin'>
              Para redefinir sua senha, crie uma senha forte que tenha pelo
              menos 6 caracteres, incluindo letras maiúsculas e minúsculas,
              números e símbolos. Lembre-se de salvar sua nova senha em um local
              seguro, como um gerenciador de senhas, e evite usar informações
              pessoais.
            </p>
          </div>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div className='m-auto mb-8 mt-8 space-y-1 px-8'>
              <Label htmlFor='newPassword'>Nova senha</Label>
              <Input
                name='newPassword'
                type='password'
                id='newPassword'
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              {errorMessages.newPassword && (
                <p className='text-red-500'>{errorMessages.newPassword}</p>
              )}
              {successMessage && (
                <p className='text-green-500'>{successMessage}</p>
              )}
            </div>
            <div className='m-auto mb-8 mt-8 space-y-1 px-8'>
              <Label htmlFor='confirmPassword'>Confirme a nova senha</Label>
              <Input
                name='confirmPassword'
                type='password'
                id='confirmPassword'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {errorMessages.confirmPassword && (
                <p className='text-red-500'>{errorMessages.confirmPassword}</p>
              )}
              {successMessage && (
                <p className='text-green-500'>{successMessage}</p>
              )}
            </div>
            <div className='flex flex-col items-center space-y-4 pb-16 pt-8'>
              <Button className='inline-block' color='indigo' type='submit'>
                Alterar Senha
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
