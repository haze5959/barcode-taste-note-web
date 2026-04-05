import { useTranslation } from 'react-i18next';
import { AppleIcon, PlayStoreIcon } from './icons/StoreIcons';
import { APPLE_APP_URL } from '../lib/constants';

interface StoreDownloadButtonsProps {
  className?: string;
  buttonClassName?: string;
}

export function StoreDownloadButtons({ 
  className = "flex flex-col sm:flex-row gap-4 items-center justify-center", 
  buttonClassName = "w-full sm:w-auto" 
}: StoreDownloadButtonsProps) {
  const { t } = useTranslation();
  return (
    <div className={className}>
      {/* App Store Button */}
      <a 
        href={APPLE_APP_URL} 
        target="_blank" 
        rel="noopener noreferrer"
        className={`flex items-center justify-center xl:justify-start gap-3.5 bg-black text-white px-5 py-3 rounded-[14px] hover:bg-gray-800 transition-colors shadow-md ${buttonClassName}`}
      >
        <AppleIcon className="w-8 h-8 shrink-0" />
        <div className="flex flex-col items-start justify-center">
          <span className="text-[11px] text-gray-300 font-medium tracking-wide mb-0.5">Download on the</span>
          <span className="text-xl font-semibold leading-none">{t('layout.promo.appStore') || 'App Store'}</span>
        </div>
      </a>
      
      {/* Play Store Button (Coming Soon) */}
      <button disabled className={`group relative flex items-center justify-center xl:justify-start gap-3.5 bg-white text-black px-5 py-3 rounded-[14px] border border-[var(--color-divider)] cursor-not-allowed opacity-[0.85] shadow-sm ${buttonClassName}`}>
        <div className="absolute -top-3 -right-2 bg-[var(--color-accent)] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full z-10 shadow-sm whitespace-nowrap">
          {t('layout.promo.comingSoon') || 'Coming Soon'}
        </div>
        <PlayStoreIcon className="w-8 h-8 grayscale opacity-70 shrink-0" />
        <div className="flex flex-col items-start justify-center opacity-70">
          <span className="text-[11px] text-gray-500 font-medium tracking-wide mb-0.5">GET IT ON</span>
          <span className="text-xl font-semibold leading-none">{t('layout.promo.playStore') || 'Google Play'}</span>
        </div>
      </button>
    </div>
  );
}
