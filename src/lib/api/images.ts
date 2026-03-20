import { apiClient } from '@/lib/apiClient'
import type { UUID, FetchImageIdsParams } from '@/types'

const DEFAULT_PER = 20

/**
 * 이미지 ID 목록 조회 (제품 또는 노트 기준)
 * GET /images?page=&per=&product_id=&note_id=
 */
export async function fetchImageIds({
  page,
  per = DEFAULT_PER,
  productId,
  noteId,
}: FetchImageIdsParams): Promise<UUID[]> {
  return apiClient.get<UUID[]>('/images', {
    page,
    per,
    product_id: productId,
    note_id: noteId,
  })
}

export const imagesApi = {
  fetchImageIds,
  DEFAULT_PER,
}
