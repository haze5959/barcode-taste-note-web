import { useTranslation } from 'react-i18next';
import { X } from 'lucide-react';

interface AppPromotionDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

/**
 * 앱에서 더 자세한 내용 확인 가능하다는 안내 다이얼로그
 * 확인 버튼 클릭 시 랜딩 페이지로 이동
 */
export function AppPromotionDialog({ open, onClose, onConfirm }: AppPromotionDialogProps) {
  const { t } = useTranslation();

  if (!open) return null;

  return (
    /* 백드롭 */
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
      onClick={onClose}
    >
      {/* 블러 배경 */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200" />

      {/* 다이얼로그 카드 */}
      <div
        className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-4 duration-300 sm:slide-in-from-bottom-0 sm:zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 상단 그라디언트 배너 */}
        <div className="relative h-32 bg-gradient-to-br from-[#2d1b69] via-[#4a2c99] to-[#7c3aed] flex items-center justify-center overflow-hidden">
          {/* 장식용 원형 도형들 */}
          <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full bg-white/10" />
          <div className="absolute -bottom-8 -left-4 w-24 h-24 rounded-full bg-white/10" />
          <div className="absolute top-4 left-8 w-10 h-10 rounded-full bg-white/10" />

          {/* 앱 아이콘 */}
          <div className="relative z-10 flex flex-col items-center gap-2">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-3xl shadow-xl">
              🍷
            </div>
          </div>
        </div>

        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/30 transition-colors"
          aria-label="닫기"
        >
          <X className="w-4 h-4" />
        </button>

        {/* 본문 콘텐츠 */}
        <div className="px-6 py-5">
          {/* 배지 */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#7c3aed]/10 mb-3">
            <span className="text-[10px] font-bold text-[#7c3aed] tracking-wide uppercase">
              {t('app_promo_dialog.badge')}
            </span>
          </div>

          <h2 className="text-[19px] font-extrabold text-[#181820] leading-snug mb-2">
            {t('app_promo_dialog.title')}
          </h2>
          <p className="text-[14px] text-[#6b7280] leading-relaxed mb-6">
            {t('app_promo_dialog.desc')}
          </p>

          {/* 기능 하이라이트 */}
          <div className="flex flex-col gap-2 mb-6">
            {(['feature1', 'feature2', 'feature3'] as const).map((key) => (
              <div key={key} className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-[#7c3aed]/10 flex items-center justify-center shrink-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#7c3aed]" />
                </div>
                <span className="text-[13px] text-[#374151] font-medium">
                  {t(`app_promo_dialog.${key}`)}
                </span>
              </div>
            ))}
          </div>

          {/* 버튼 영역 */}
          <div className="flex gap-2.5">
            <button
              onClick={onClose}
              className="flex-1 py-3 rounded-2xl border border-[var(--color-divider)] text-[14px] font-semibold text-[#6b7280] hover:bg-gray-50 transition-colors"
            >
              {t('app_promo_dialog.cancel')}
            </button>
            <button
              onClick={onConfirm}
              className="flex-[2] py-3 rounded-2xl bg-gradient-to-r from-[#4a2c99] to-[#7c3aed] text-[14px] font-bold text-white shadow-lg hover:opacity-90 active:scale-[0.98] transition-all"
            >
              {t('app_promo_dialog.confirm')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
