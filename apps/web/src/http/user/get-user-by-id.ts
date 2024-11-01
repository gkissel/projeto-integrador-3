import { api } from '../api-client'

interface SignInRequest {
  id: string
}

interface SignInResponse {
  user: {
    id: string
    firstName: string
    lastName: string
    birthdate: string
    telephone: string
    email: string
  }
}

export async function getUserById({ id }: SignInRequest) {
  const result = await api.get(`users/${id}`).json<SignInResponse>()

  return result
}
