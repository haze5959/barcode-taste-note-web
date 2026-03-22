import { apiClient } from '@/lib/apiClient'
import type {
  ProductInfo,
  UUID,
  FetchProductsParams,
  FetchFavoriteProductsParams,
} from '@/types'

const DEFAULT_PER = 20

/**
 * 제품 단건 조회
 * GET /products/{productId}
 */
export async function getProductDetail(productId: UUID): Promise<ProductInfo> {
  return apiClient.get<ProductInfo>(`/products/${productId}`)
}

/**
 * 제품 목록 조회 (검색, 타입 필터, 정렬, 페이징)
 * GET /products?page=&per=&name=&type=&order_by=
 */
export async function fetchProducts({
  page,
  per = DEFAULT_PER,
  search,
  type,
  orderBy,
}: FetchProductsParams): Promise<ProductInfo[]> {
  return apiClient.get<ProductInfo[]>('/products', {
    page,
    per,
    name: search,
    type,
    order_by: orderBy,
  })
}

/**
 * 유저의 즐겨찾기 제품 목록 조회
 * GET /products/favorite?page=&per=&user_id=&type=
 */
export async function fetchFavoriteProducts({
  page,
  per = DEFAULT_PER,
  userId,
  type,
}: FetchFavoriteProductsParams): Promise<ProductInfo[]> {
  return apiClient.get<ProductInfo[]>('/products/favorite', {
    page,
    per,
    user_id: userId,
    type,
  })
}

/**
 * 바코드로 제품 검색
 * GET /products/barcode/{barcode}
 */
export async function findProductByBarcode(barcode: string): Promise<ProductInfo> {
  return apiClient.get<ProductInfo>(`/products/barcode/${barcode}`)
}

export const productsApi = {
  getProductDetail,
  fetchProducts,
  fetchFavoriteProducts,
  findProductByBarcode,
  DEFAULT_PER,
}
