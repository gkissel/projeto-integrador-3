'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import { Button } from '@/components/catalyst/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function ForgotPasswordPage() {
  const [currentPassword, setCurrentPassword] = useState<string>('')
  const [newPassword, setNewPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [errorMessages, setErrorMessages] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [successMessage, setSuccessMessage] = useState<string>('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSuccessMessage('')
    setErrorMessages({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    })

    let isValid = true
    if (!currentPassword) {
      setErrorMessages((prev) => ({
        ...prev,
        currentPassword: 'Senha atual é obrigatória.',
      }))
      isValid = false
    }
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
        body: JSON.stringify({ currentPassword, newPassword }),
      })

      const data = await response.json()
      if (response.ok) {
        setSuccessMessage(data.message)
      } else {
        setErrorMessages((prev) => ({ ...prev, currentPassword: data.message }))
      }
    } catch (error) {
      setErrorMessages((prev) => ({
        ...prev,
        currentPassword: 'Ocorreu um erro ao alterar a senha. Tente novamente.',
      }))
      console.error('Erro:', error)
    }
  }

  return (
    <div>
      <div className='relative m-auto h-full'>
        <div className='mt-10 rounded-lg border-2'>
          <div className='p-8 pb-8'>
            <strong className='text-2xl font-bold'>Alterar Senha</strong>
            <p className='pt-4 font-thin'>
              Para garantir a segurança da sua conta, recomendamos que sua nova
              senha seja forte e única. Por favor, insira sua senha atual para
              confirmar sua identidade e defina uma nova senha.
            </p>
          </div>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div className='m-auto mb-12 mt-8 space-y-1 px-8'>
              <Label htmlFor='email'>Senha Atual</Label>
              <Input
                name='current_password'
                type='password'
                id='current_password'
                className='disabled:cursor-not-allowed'
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
              {errorMessages.currentPassword && (
                <p className='text-xs text-red-500'>
                  {errorMessages.currentPassword}
                </p>
              )}
            </div>
            <div className='m-auto mb-12 mt-8 space-y-1 px-8'>
              <Label htmlFor='email'>Nova Senha</Label>
              <Input
                name='new_password'
                type='password'
                id='new_password'
                className='disabled:cursor-not-allowed'
                onChange={(e) => setNewPassword(e.target.value)}
              />
              {errorMessages.newPassword && (
                <p className='text-xs text-red-500'>
                  {errorMessages.newPassword}
                </p>
              )}
            </div>
            <div className='m-auto mb-12 mt-8 space-y-1 px-8'>
              <Label htmlFor='email'>Repita a nova senha</Label>
              <Input
                name='con_new_password'
                type='password'
                id='con_new_password'
                className='disabled:cursor-not-allowed'
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {errorMessages.confirmPassword && (
                <p className='text-xs text-red-500'>
                  {errorMessages.confirmPassword}
                </p>
              )}
            </div>

            <div className='flex justify-center space-x-4 pb-8 pt-16'>
              <Button color='indigo' type='submit'>
                Alterar Senha
              </Button>
              <Button type='button'>
                <Link href='/account'>Cancelar</Link>
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
