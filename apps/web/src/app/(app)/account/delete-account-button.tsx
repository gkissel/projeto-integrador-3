'use client'

import { useState } from 'react'

import { Button } from '@/components/catalyst/button'
import {
  Dialog,
  DialogActions,
  DialogDescription,
  DialogTitle,
} from '@/components/catalyst/dialog'

import { deleteAccountAction } from './actions'

export default function DeleteAccountButton() {
  const [isOpen, setIsOpen] = useState(false)
  const handleDeleteAccount = () => {
    deleteAccountAction()
  }

  return (
    <>
      <Button
        color='red'
        className='w-full lg:w-fit'
        onClick={() => {
          setIsOpen(true)
        }}
      >
        Excluir conta
      </Button>

      <Dialog open={isOpen} onClose={setIsOpen}>
        <DialogTitle>Excluir conta</DialogTitle>
        <DialogDescription>
          Isso excluirá sua conta. Esta ação não pode ser desfeita.
        </DialogDescription>

        <DialogActions>
          <Button
            plain
            onClick={() => setIsOpen(false)}
            className='cursor-pointer'
          >
            Cancelar
          </Button>
          <Button
            color='red'
            onClick={handleDeleteAccount}
            className='cursor-pointer'
          >
            Excluir conta
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
