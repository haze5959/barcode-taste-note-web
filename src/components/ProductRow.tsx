import { ProductInfo } from '../types';
import { RatingView } from './RatingView';
import { OQImageView } from './OQImageView';
import { Image as ImageIcon } from 'lucide-react';
import { PRODUCT_TYPE_INFO } from '../lib/mappings';

export function ProductRow({ info, onClick }: { info?: ProductInfo | null, onClick?: () => void }) {
  if (!info) {
    // Skeleton View
    return (
      <div className="flex flex-col bg-[var(--color-surface-primary)] rounded-2xl border border-[var(--color-divider)] w-full overflow-hidden animate-pulse">
        <div className="aspect-square bg-[var(--color-divider)] w-full" />
        <div className="p-3 gap-2 flex flex-col">
          <div className="h-4 w-3/4 bg-[var(--color-divider)] rounded" />
          <div className="h-3 w-1/2 bg-[var(--color-divider)] rounded mt-1" />
        </div>
      </div>
    );
  }

  const { product, imageIds } = info;
  const coverImageId = imageIds?.[0];

  return (
    <div 
      className="flex flex-col bg-[var(--color-surface-primary)] rounded-2xl shadow-sm border border-[var(--color-divider)] w-full overflow-hidden transition-transform hover:scale-[0.98] cursor-pointer"
      onClick={onClick}
    >
      <div className="aspect-square w-full bg-[var(--color-surface-secondary)] relative">
        <OQImageView imageId={coverImageId} className="w-full h-full object-cover" fallbackIcon={<ImageIcon className="w-10 h-10 opacity-30" />} />
        {/* 타입 태그 */}
        <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded-md text-[10px] font-bold tracking-wider text-white shadow-sm uppercase">
          {PRODUCT_TYPE_INFO[product.type as string] || product.type}
        </div>
      </div>
      
      <div className="p-3 flex flex-col gap-1.5 flex-1 justify-between">
        <h3 className="font-semibold text-sm text-[var(--color-text-primary)] line-clamp-2 leading-snug">
          {product.name}
        </h3>
        <RatingView value={product.rating} size={12} className="mt-1" />
      </div>
    </div>
  );
}
