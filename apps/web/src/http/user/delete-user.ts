import { api } from '../api-client'

export async function deleteProfile() {
  const result = await api.delete('profile').json()

  return result
}
