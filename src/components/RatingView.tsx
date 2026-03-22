import { Star } from 'lucide-react';

interface RatingViewProps {
  value: number; // 0 to 5
  size?: number;
  color?: string;
  className?: string;
}

export function RatingView({ value, size = 16, color = 'var(--color-accent)', className = '' }: RatingViewProps) {
  const scaledValue = value / 2;
  const fullStars = Math.floor(scaledValue);
  const hasHalfStar = scaledValue % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className={`flex items-center gap-0.5 ${className}`}>
      {Array.from({ length: fullStars }).map((_, i) => (
        <Star key={`full-${i}`} size={size} fill={color} color={color} />
      ))}
      {hasHalfStar && (
        <div style={{ position: 'relative', width: size, height: size }}>
          <Star size={size} color={color} className="absolute inset-0 opacity-30" />
          <div className="absolute inset-0 overflow-hidden" style={{ width: '50%' }}>
            <Star size={size} fill={color} color={color} />
          </div>
        </div>
      )}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <Star key={`empty-${i}`} size={size} color={color} className="opacity-30" />
      ))}
    </div>
  );
}
