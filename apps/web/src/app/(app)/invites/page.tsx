'use client'
import { AlertTriangle, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'

import { Button } from '@/components/catalyst/button'
import { Divider } from '@/components/catalyst/divider'
import { Text } from '@/components/catalyst/text'

export default function Invites() {
  const router = useRouter()

  return (
    <div className='space-y-8'>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-bold'>Convites</h1>
      </div>

      <Divider />

      <div className='flex items-center justify-between'>
        <div className='flex flex-col'>
          <strong>Seus Convites</strong>
          <Text>
            Aqui fica todos os convites para se juntar a uma organização que
            você receber
          </Text>
        </div>
      </div>

      <Divider />
      <div className='grid grid-cols-6 gap-1 pt-4 text-left'>
        <div className='font-semibold'>Data</div>
        <div className='font-semibold'>Assunto</div>
      </div>
      <div className='grid grid-cols-6 gap-1 text-left'>
        <div>24/10/2024</div>
        <div className='col-span-2 whitespace-nowrap'>
          GustavoKissel convidou você para fazer parte da organização
          “SoftBudget”
        </div>
      </div>
    </div>
  )
}
