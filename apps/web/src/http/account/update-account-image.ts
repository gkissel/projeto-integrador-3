import { api } from '../api-client'

interface UpdateAccountImageRequest {
  org: string
  accountId: string
  imageBlob: string
}

type UpdateAccountImageResponse = void

export async function updateAccountImage({
  org,
  accountId,
  imageBlob,
}: UpdateAccountImageRequest): Promise<UpdateAccountImageResponse> {
  await api.patch(`organizations/${org}/accounts/${accountId}/image`, {
    json: {
      base64Image: imageBlob,
    },
  })
}
