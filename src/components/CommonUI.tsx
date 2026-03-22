import { ReactNode } from 'react';

// ================= InfoTagView =================
export function InfoTagView({ text, icon, className = '' }: { text: string; icon?: ReactNode; className?: string }) {
  return (
    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/40 text-white backdrop-blur-md text-xs font-medium border border-white/20 shadow-sm ${className}`}>
      {icon && <span className="opacity-90">{icon}</span>}
      <span>{text}</span>
    </div>
  );
}

// ================= FlavorChip =================
export function FlavorChip({ label, active = false, className = '' }: { label: string; active?: boolean; className?: string }) {
  return (
    <div className={`inline-flex items-center justify-center px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-colors border ${
      active 
        ? 'bg-[var(--color-accent)] text-white border-[var(--color-accent)]' 
        : 'bg-[var(--color-surface-primary)] text-[var(--color-text-secondary)] border-[var(--color-divider)]'
    } ${className}`}>
      {label}
    </div>
  );
}

// ================= SkeletonView =================
export function SkeletonView({ className = '' }: { className?: string }) {
  return (
    <div className={`animate-pulse bg-[var(--color-divider)] rounded-md ${className}`} />
  );
}
