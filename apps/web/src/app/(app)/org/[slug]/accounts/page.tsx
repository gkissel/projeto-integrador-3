'use client'
import { useState } from 'react'

import { Divider } from '@/components/catalyst/divider'
import { Strong, Text } from '@/components/catalyst/text'

import { NewAccount } from '../../new-account'

export default function Accounts() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  return (
    <div className='space-y-8'>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-bold'>Contas</h1>
      </div>

      <Divider />

      <div className='flex flex-col items-start space-y-1'>
        <div className='mb-4'>
          <Strong>Suas Contas</Strong>
          <Text className='mb-4'>
            Gerencie facilmente suas atividades bancárias
          </Text>
        </div>
        <div
          className='flex h-[190px] w-[300px] cursor-pointer flex-col items-center justify-center rounded-lg border border-[#303032] bg-[#18181B] transition-colors duration-200 hover:bg-[#2b2b2b]'
          onClick={handleOpenModal}
        >
          <div className='text-4xl text-gray-400'>+</div>
          <span className='mt-2 text-gray-500'>Adicionar Conta</span>
        </div>
      </div>

      <NewAccount
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title='Nova Conta'
      >
        Preencha as informações para adicionar uma nova conta.
      </NewAccount>
    </div>
  )
}
