import { api } from '../api-client'

interface SignUpRequest {
  firstName: string
  lastName: string
  email: string
  birthdate: Date
  password: string
  telephone: string
}

type SignUpResponse = void

export async function signUp({
  firstName,
  lastName,
  birthdate,
  telephone,
  email,
  password,
}: SignUpRequest): Promise<SignUpResponse> {
  await api.post('users', {
    json: {
      firstName,
      lastName,
      birthdate,
      telephone,
      email,
      password,
    },
  })
}
