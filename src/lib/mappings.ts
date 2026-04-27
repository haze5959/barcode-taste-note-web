export const PRODUCT_TYPE_INFO: Record<string | number, string> = {
  0: '🍷 Wine',
  1: '🥃 Whisky',
  2: '🍺 Beer',
  3: '🍶 Soju & Sake',
  4: '🍸 Liquor & Spirits',
  5: '🍹 Cocktail',
  6: '☕️ Coffee',
  7: '🥤 Beverage',
  8: '🍾 Other',
  // 기존 문자열 호환성
  wine: '🍷 Wine',
  whisky: '🥃 Whisky',
  beer: '🍺 Beer',
  soju: '🍶 Soju & Sake',
  liqueur: '🍸 Liquor & Spirits',
  cocktail: '🍹 Cocktail',
  coffee: '☕️ Coffee',
  beverage: '🥤 Beverage',
  other: '🍾 Other'
};

export const PUBLIC_SCOPE_INFO: Record<string | number, string> = {
  0: '비공개',
  1: '친구공개',
  2: '전체공개',
  // 기존 문자열 호환성
  private: '비공개',
  friendsOnly: '친구공개',
  public: '전체공개'
};

export const FLAVOR_INFO: Record<string | number, string> = {
  0: '🍎 과일',
  1: '🍊 시트러스',
  2: '🌸 플로럴',
  3: '🍦 바닐라',
  4: '🪵 우디',
  5: '🌰 너티',
  6: '🍫 초콜릿',
  7: '🍯 허니',
  8: '🌾 곡물',
  9: '🌶️ 스파이시',
  10: '🔥 스모키',
  11: '🌿 허벌',
  12: '🪴 어시',
};

export const NOTE_DETAIL_INFO: Record<string | number, string> = {
  0: '단맛',
  1: '신맛',
  2: '쓴맛',
  3: '바디감',
  4: '탄닌',
  5: '알코올',
  6: '여운',
  7: '풍미',
  8: '밸런스',
  9: '감정',
  // 기존 문자열 호환성
  sweetness: '단맛',
  acidity: '신맛',
  bitterness: '쓴맛',
  body: '바디감',
  tannin: '탄닌',
  alcoholic: '알코올',
  finish: '여운',
  aromatic: '풍미',
  balance: '밸런스',
  feeling: '감정'
};

export const FEELING_INFO: Record<number | string, { emoji: string; desc: string }> = {
  0: { emoji: '😊', desc: '기분 좋은' },
  1: { emoji: '😋', desc: '만족스런' },
  2: { emoji: '😍', desc: '반해버린' },
  3: { emoji: '😎', desc: '개운한' },
  4: { emoji: '💪', desc: '활력충전' },
  5: { emoji: '🤤', desc: '입맛 당기는' },
  10: { emoji: '🙁', desc: '실망스런' },
  11: { emoji: '🤢', desc: '더부룩한' },
  12: { emoji: '🫠', desc: '후회되는' },
  13: { emoji: '🤕', desc: '상태별로' },
};
