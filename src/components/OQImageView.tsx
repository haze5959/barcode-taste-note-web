import { useState } from 'react';
import { getImageUrl } from '../types';
import { Image as ImageIcon } from 'lucide-react';

interface OQImageViewProps {
  imageId?: string | null;
  isProfile?: boolean;
  fallbackIcon?: React.ReactNode;
  alt?: string;
  className?: string;
}

export function OQImageView({ imageId, isProfile = false, fallbackIcon, alt = 'image', className = '' }: OQImageViewProps) {
  const [error, setError] = useState(false);

  if (!imageId || error) {
    return (
      <div className={`flex items-center justify-center bg-[var(--color-surface-secondary)] text-[var(--color-text-secondary)] ${className}`}>
        {fallbackIcon || <ImageIcon className="w-1/3 h-1/3 opacity-50" />}
      </div>
    );
  }

  return (
    <img
      src={getImageUrl(imageId, isProfile)}
      alt={alt}
      className={`object-cover ${className}`}
      onError={() => setError(true)}
    />
  );
}
