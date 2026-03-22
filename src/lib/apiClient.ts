import type { ApiResponse } from '@/types'
import { API_BASE_URL } from './constants'

const BASE_URL = API_BASE_URL

/** snake_case 키를 camelCase로 변환하는 재귀 함수 */
function toCamelCase(str: string): string {
  return str.replace(/_([a-z])/g, (_, letter: string) => letter.toUpperCase())
}

function transformKeys(obj: unknown): unknown {
  if (Array.isArray(obj)) {
    return obj.map(transformKeys)
  }
  if (obj !== null && typeof obj === 'object') {
    return Object.fromEntries(
      Object.entries(obj as Record<string, unknown>).map(([key, value]) => [
        toCamelCase(key),
        transformKeys(value),
      ])
    )
  }
  return obj
}

/** URL 쿼리 파라미터 빌더 (undefined 값 제외) */
function buildQueryString(params: Record<string, unknown>): string {
  const entries = Object.entries(params).filter(
    ([, v]) => v !== undefined && v !== null
  )
  if (entries.length === 0) return ''
  const qs = entries.map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`).join('&')
  return `?${qs}`
}

/** API 에러 클래스 */
export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

/** GET 요청 공통 함수 */
async function get<T>(path: string, params?: Record<string, unknown>): Promise<T> {
  const qs = params ? buildQueryString(params) : ''
  const url = `${BASE_URL}${path}${qs}`

  const response = await fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })

  if (!response.ok) {
    throw new ApiError(response.status, `HTTP ${response.status}: ${response.statusText}`)
  }

  const json = (await response.json()) as ApiResponse<unknown>

  if (!json.result) {
    throw new ApiError(response.status, json.error ?? 'API 오류가 발생했습니다')
  }

  if (json.data === null || json.data === undefined) {
    throw new ApiError(response.status, '응답 데이터가 없습니다')
  }

  return transformKeys(json.data) as T
}

export const apiClient = { get }
