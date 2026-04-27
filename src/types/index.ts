// ============================================================
// 공통 유틸리티
// ============================================================

/** UUID 문자열 타입 */
export type UUID = string

/** ISO8601 날짜 문자열 타입 */
export type ISODateString = string

// ============================================================
// 도메인 열거형
// ============================================================

/** 제품 카테고리 */
export type ProductType =
  | 'wine'
  | 'whisky'
  | 'beer'
  | 'coffee'
  | 'cocktail'
  | 'soju'
  | 'liqueur'
  | 'beverage'

/** 노트 정렬 기준 */
export type NoteOrderByKey = 'registered' | 'rating'

/** 제품 정렬 기준 */
export type ProductOrderByKey = 'registered' | 'rating' | 'note_count'

/** 공개 범위: 0=Private, 1=FriendsOnly, 2=Public */
export type PublicScope = 0 | 1 | 2

/** 플레이버 태그 */
export type Flavor =
  | 'citrus'
  | 'honey'
  | 'herbal'
  | 'floral'
  | 'nutty'
  | 'smoky'
  | 'spicy'
  | 'chocolate'

// ============================================================
// 도메인 모델
// ============================================================

/** 유저 */
export interface User {
  id: UUID
  nickName: string
  intro: string | null
  imageId: UUID | null
  registered: ISODateString
}

/** 유저 상세 정보 */
export interface UserInfo {
  user: User
  noteCount: number
  neededReviewProduct: boolean | null
  followerCount: number | null
  isSubscribe: boolean | null
}

/** 시음 노트 */
export interface Note {
  id: UUID
  body: string
  rating: number
  registered: ISODateString
  publicScope: PublicScope
  /** 키: NoteDetail rawValue 문자열, 값: 점수 */
  details: Record<string, number> | null
}

/** 노트 상세 정보 (노트 + 제품 + 이미지 + 플레이버 + 작성자) */
export interface NoteInfo {
  note: Note
  product: Product
  imageIds: UUID[] | null
  productImageId: UUID | null
  flavors: Flavor[] | null
  user: User | null
}

/** 제품 */
export interface Product {
  id: UUID
  name: string
  desc: string
  rating: number
  /** 키: Flavor rawValue 문자열, 값: 빈도 */
  flavorInfos: Record<string, number> | null
  type: ProductType
  registered: ISODateString
  noteCount: number | null
}

/** 제품 상세 정보 */
export interface ProductInfo {
  product: Product
  imageIds: UUID[] | null
  favoriteCount: number
  myNoteIds: UUID[] | null
}

/** 시음 완료 제품 정보 */
export interface TastedProductInfo {
  product: Product
  imageIds: UUID[] | null
  myRating: number
}

/** 홈 피드 정보 */
export interface HomeInfo {
  recentNotes: NoteInfo[]
  recentProducts: ProductInfo[]
  productCount: number
}

// ============================================================
// API 공통 응답 래퍼
// ============================================================

export interface ApiResponse<T> {
  result: boolean
  data: T | null
  error: string | null
}

// ============================================================
// API 요청 파라미터 타입
// ============================================================

export interface FetchUserNotesParams {
  userId: UUID
  orderBy: NoteOrderByKey
  page: number
  per?: number
}

export interface FetchNotesParams {
  page: number
  per?: number
  productId?: UUID
}

export interface FetchProductsParams {
  page: number
  per?: number
  search?: string
  type?: ProductType
  orderBy?: ProductOrderByKey
}

export interface FetchFavoriteProductsParams {
  page: number
  per?: number
  userId?: UUID
  type?: ProductType
}

export interface FetchImageIdsParams {
  page: number
  per?: number
  productId?: UUID
  noteId?: UUID
}

// ============================================================
// 이미지 URL 헬퍼
// ============================================================
const IMAGE_BASE_URL = 'https://barnote.net/images'

/** 이미지 ID로 전체 이미지 URL 생성 */
export function getImageUrl(imageId: UUID, isProfile: boolean = false): string {
  if (isProfile) {
    return `${IMAGE_BASE_URL}/profile/${imageId}`
  }
  return `${IMAGE_BASE_URL}/${imageId}`
}
