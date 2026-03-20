import { apiClient } from '@/lib/apiClient'
import type {
  NoteInfo,
  UUID,
  FetchUserNotesParams,
  FetchNotesParams,
  NoteOrderByKey,
} from '@/types'

const DEFAULT_PER = 20

/**
 * 특정 유저의 시음 노트 목록 조회
 * GET /notes/user/{userId}?page=&per=&order_by=
 */
export async function fetchUserNotes({
  userId,
  orderBy,
  page,
  per = DEFAULT_PER,
}: FetchUserNotesParams): Promise<NoteInfo[]> {
  return apiClient.get<NoteInfo[]>(`/notes/user/${userId}`, {
    page,
    per,
    order_by: orderBy,
  })
}

/**
 * 노트 단건 조회
 * GET /notes/{noteId}
 */
export async function getNoteDetail(noteId: UUID): Promise<NoteInfo> {
  return apiClient.get<NoteInfo>(`/notes/${noteId}`)
}

/**
 * 노트 복수 조회 (ID 목록)
 * GET /notes?ids=uuid1,uuid2,...
 */
export async function getNoteDetails(noteIds: UUID[]): Promise<NoteInfo[]> {
  if (noteIds.length === 0) return []
  return apiClient.get<NoteInfo[]>('/notes', {
    ids: noteIds.join(','),
  })
}

/**
 * 노트 목록 조회 (페이징, 제품 필터)
 * GET /notes?page=&per=&product_id=
 */
export async function fetchNotes({
  page,
  per = DEFAULT_PER,
  productId,
}: FetchNotesParams): Promise<NoteInfo[]> {
  return apiClient.get<NoteInfo[]>('/notes', {
    page,
    per,
    product_id: productId,
  })
}

export const notesApi = {
  fetchUserNotes,
  getNoteDetail,
  getNoteDetails,
  fetchNotes,
  DEFAULT_PER,
}

export type { NoteOrderByKey }
