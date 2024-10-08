import { api } from '../api-client'

interface GetProfileResponse {
  user: {
    id: string
    firstName: string | null
    lastName: string | null
    birthdate: string
    telephone: string
    email: string
  }
}

export async function getProfile() {
  const result = await api.get('profile').json<GetProfileResponse>()

  return result
}
