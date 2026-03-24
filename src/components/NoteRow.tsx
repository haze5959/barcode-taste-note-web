import { NoteInfo } from '../types';
import { RatingView } from './RatingView';
import { OQImageView } from './OQImageView';
import { Image as ImageIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function NoteRow({ info }: { info?: NoteInfo | null }) {
  const { t } = useTranslation();
  if (!info) {
    // Skeleton View
    return (
      <div className="flex bg-[var(--color-surface-primary)] p-4 rounded-2xl border border-[var(--color-divider)] w-full gap-4 animate-pulse">
        <div className="w-20 h-20 bg-[var(--color-divider)] rounded-xl shrink-0" />
        <div className="flex flex-col flex-1 gap-2 pt-1">
          <div className="h-5 w-3/4 bg-[var(--color-divider)] rounded" />
          <div className="h-4 w-1/2 bg-[var(--color-divider)] rounded" />
          <div className="mt-auto h-4 w-20 bg-[var(--color-divider)] rounded" />
        </div>
      </div>
    );
  }

  const { note, product, imageIds, productImageId } = info;
  // 대표 이미지 결정: 사용자가 올린 노트 이미지가 있으면 첫 번째, 없으면 제품 이미지
  const coverImageId = imageIds?.[0] || productImageId;

  // 날짜 변환 (YYYY-MM-DD)
  const dateStr = new Date(note.registered).toLocaleDateString();

  return (
    <div className="flex bg-[var(--color-surface-primary)] p-4 rounded-2xl shadow-sm border border-[var(--color-divider)] w-full gap-4 items-center transition-transform hover:scale-[0.99] cursor-pointer">
      <div className="w-20 h-20 shrink-0 rounded-xl overflow-hidden bg-[var(--color-surface-secondary)] border border-[var(--color-divider)]">
        <OQImageView imageId={coverImageId} className="w-full h-full" fallbackIcon={<ImageIcon className="w-8 h-8 opacity-40" />} />
      </div>
      
      <div className="flex flex-col flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 mb-1">
          <h3 className="font-bold text-[var(--color-text-primary)] truncate text-base">{product.name}</h3>
        </div>
        
        <p className="text-sm text-[var(--color-text-secondary)] line-clamp-2 mb-2 leading-relaxed h-10">
          {note.body || t('note.no_detail')}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <RatingView value={note.rating} size={14} />
          <span className="text-xs text-[var(--color-text-secondary)] font-medium bg-[var(--color-surface-secondary)] px-2 py-0.5 rounded-md">
            {dateStr}
          </span>
        </div>
      </div>
    </div>
  );
}
