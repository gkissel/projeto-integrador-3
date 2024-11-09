'use client'
import { useState } from 'react'

import { Button } from '@/components/catalyst/button'
import { Divider } from '@/components/catalyst/divider'
import { Strong, Text } from '@/components/catalyst/text'

import { NewTransfer } from '../../new-transfer'

export default function Transfers() {
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
        <h1 className='text-2xl font-bold'>Transferências</h1>
        <Button onClick={handleOpenModal} className='ml-auto'>
          Nova Transferência
        </Button>
      </div>

      <Divider />

      <div className='flex items-center justify-between'>
        <div className='flex flex-col'>
          <strong>Suas Transferências</strong>
          <Text>Aqui está seu histórico de todas as transferências</Text>
        </div>
      </div>

      <Divider />

      <div className='grid grid-cols-4 gap-4 pt-4 text-left'>
        <div className='font-semibold'>Destino</div>
        <div className='font-semibold'>Data</div>
        <div className='font-semibold'>Valor</div>
        <div className='font-semibold'>Conta</div>
      </div>

      <NewTransfer
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title='Nova Transferência'
      >
        Preencha as informações para adicionar uma nova transferência.
      </NewTransfer>
    </div>
  )
}
