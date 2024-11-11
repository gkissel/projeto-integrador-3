import { api } from '../api-client'

interface RecoverPasswordRequest {
  email: string
}

interface RecoverPasswordResponse {
  recoverCode: string
}

export async function recoverPassword({
  email,
}: RecoverPasswordRequest): Promise<RecoverPasswordResponse> {
  const response = await api
    .post('users/recover-password', {
      json: {
        email,
      },
    })
    .json<RecoverPasswordResponse>()

  return response
}
