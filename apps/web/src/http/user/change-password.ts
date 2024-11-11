import { api } from '../api-client'

interface ChangePasswordRequest {
  oldPassword: string
  newPassword: string
}

export async function changePassword({
  oldPassword,
  newPassword,
}: ChangePasswordRequest) {
  const response = await api
    .patch('users/change-password', {
      json: {
        oldPassword,
        newPassword,
      },
    })
    .json()

  return response
}
