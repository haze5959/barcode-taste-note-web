import type { TFunction } from 'i18next';

// 제품 타입 코드 -> 이모지 (라벨은 i18n: mappings.product_type.{id})
export const PRODUCT_TYPE_EMOJIS: Record<string | number, string> = {
  0: '🍷',
  1: '🥃',
  2: '🍺',
  3: '🍶',
  4: '🍸',
  5: '🍹',
  6: '☕️',
  7: '🥤',
  8: '🍾',
  // 기존 문자열 키 호환성
  wine: '🍷',
  whisky: '🥃',
  beer: '🍺',
  soju: '🍶',
  liqueur: '🍸',
  cocktail: '🍹',
  coffee: '☕️',
  beverage: '🥤',
  other: '🍾',
};

// 문자열 키 -> 숫자 키 변환 (i18n 키는 숫자 기준으로 통일)
const PRODUCT_TYPE_KEY_MAP: Record<string, number> = {
  wine: 0,
  whisky: 1,
  beer: 2,
  soju: 3,
  liqueur: 4,
  cocktail: 5,
  coffee: 6,
  beverage: 7,
  other: 8,
};

const PUBLIC_SCOPE_KEY_MAP: Record<string, number> = {
  private: 0,
  friendsOnly: 1,
  public: 2,
};

const NOTE_DETAIL_KEY_MAP: Record<string, number> = {
  sweetness: 0,
  acidity: 1,
  bitterness: 2,
  body: 3,
  tannin: 4,
  alcoholic: 5,
  finish: 6,
  aromatic: 7,
  balance: 8,
  feeling: 9,
};

// 향미 코드 -> 이모지 (Swift Flavor enum 기준)
export const FLAVOR_EMOJIS: Record<number, string> = {
  0: '🍎',
  1: '🍓',
  2: '🍊',
  3: '🍍',
  4: '🌸',
  5: '🌿',
  6: '🪴',
  7: '🍦',
  8: '🍫',
  9: '🍯',
  10: '🌰',
  11: '🌾',
  12: '🪵',
  13: '🌶️',
  14: '🔥',
};

// 감정 코드 -> 이모지
export const FEELING_EMOJIS: Record<number, string> = {
  0: '😊',
  1: '😋',
  2: '😍',
  3: '😎',
  4: '💪',
  5: '🤤',
  10: '🙁',
  11: '🤢',
  12: '🫠',
  13: '🤕',
};

// 입력값을 i18n 키 용도의 숫자 ID로 정규화
const toNumericKey = (id: number | string, stringMap: Record<string, number>): number | null => {
  if (typeof id === 'number') return id;
  if (id in stringMap) return stringMap[id];
  const parsed = Number(id);
  return Number.isNaN(parsed) ? null : parsed;
};

export const getProductTypeLabel = (type: number | string, t: TFunction): string => {
  const numericId = toNumericKey(type, PRODUCT_TYPE_KEY_MAP);
  const emoji = PRODUCT_TYPE_EMOJIS[type] ?? (numericId !== null ? PRODUCT_TYPE_EMOJIS[numericId] : '');
  if (numericId === null) return String(type);
  const label = t(`mappings.product_type.${numericId}`);
  return emoji ? `${emoji} ${label}` : label;
};

export const getPublicScopeLabel = (scope: number | string, t: TFunction): string => {
  const numericId = toNumericKey(scope, PUBLIC_SCOPE_KEY_MAP);
  if (numericId === null) return String(scope);
  return t(`mappings.public_scope.${numericId}`);
};

export const getFlavorLabel = (id: number | string, t: TFunction): string => {
  const numericId = typeof id === 'number' ? id : Number(id);
  if (Number.isNaN(numericId)) return String(id);
  const emoji = FLAVOR_EMOJIS[numericId] ?? '';
  const label = t(`mappings.flavor.${numericId}`);
  return emoji ? `${emoji} ${label}` : label;
};

export const getNoteDetailLabel = (key: number | string, t: TFunction): string => {
  const numericId = toNumericKey(key, NOTE_DETAIL_KEY_MAP);
  if (numericId === null) return String(key);
  return t(`mappings.note_detail.${numericId}`);
};

export interface FeelingInfo {
  emoji: string;
  desc: string;
}

export const getFeelingInfo = (id: number | string, t: TFunction): FeelingInfo | null => {
  const numericId = typeof id === 'number' ? id : Number(id);
  if (Number.isNaN(numericId)) return null;
  const emoji = FEELING_EMOJIS[numericId];
  if (!emoji) return null;
  return {
    emoji,
    desc: t(`mappings.feeling.${numericId}`),
  };
};
