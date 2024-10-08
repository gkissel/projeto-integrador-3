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
        onClick={() => {
          setIsOpen(true)
        }}
      >
        Delete Account
      </Button>

      <Dialog open={isOpen} onClose={setIsOpen}>
        <DialogTitle>Delete Account</DialogTitle>
        <DialogDescription>
          This will delete your account. This action cannot be undone.
        </DialogDescription>

        <DialogActions>
          <Button
            plain
            onClick={() => setIsOpen(false)}
            className='cursor-pointer'
          >
            Cancel
          </Button>
          <Button
            color='red'
            onClick={handleDeleteAccount}
            className='cursor-pointer'
          >
            Delete Account
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
