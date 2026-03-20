import { apiClient } from '@/lib/apiClient'
import type { UserInfo, UUID } from '@/types'

/**
 * 특정 유저 정보 조회
 * GET /users/{userId}
 */
export async function getUserInfo(userId: UUID): Promise<UserInfo> {
  return apiClient.get<UserInfo>(`/users/${userId}`)
}

/**
 * 닉네임으로 유저 검색
 * GET /users/search?nick_name=
 */
export async function searchUsers(nickName: string): Promise<UserInfo[]> {
  return apiClient.get<UserInfo[]>('/users/search', { nick_name: nickName })
}

export const usersApi = {
  getUserInfo,
  searchUsers,
}
