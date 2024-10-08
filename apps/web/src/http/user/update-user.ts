import { api } from '../api-client'

interface UpdateProfileRequest {
  firstName?: string
  lastName?: string

  telephone?: string
}

type UpdateProfileResponse = void

export async function updateProfile({
  firstName,
  lastName,
  telephone,
}: UpdateProfileRequest): Promise<UpdateProfileResponse> {
  await api.patch('profile', {
    json: {
      firstName,
      lastName,
      telephone,
    },
  })
}
