import { apiClient } from '@/lib/apiClient'
import type { HomeInfo } from '@/types'

const PER = 20

/**
 * 홈 피드 정보 조회
 * GET /btn/home
 */
export async function getHomeInfo(): Promise<HomeInfo> {
  return apiClient.get<HomeInfo>('/btn/home')
}

export const homeApi = { getHomeInfo, PER }
