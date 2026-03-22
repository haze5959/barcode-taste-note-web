import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AppleIcon, PlayStoreIcon } from '../icons/StoreIcons';

export default function MobileLayout() {
  const { t } = useTranslation();

  return (
    <div className="min-h-[100dvh] w-full bg-[var(--color-surface-secondary)] grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] items-center justify-items-center lg:py-10">
      
      {/* Left Spacer to perfectly center the mobile view */}
      <div className="hidden lg:block w-full h-full"></div>

      {/* Mobile View Container (Centered, wider width) */}
      <div className="w-full lg:w-[460px] xl:w-[480px] h-full min-h-[100dvh] lg:min-h-[850px] lg:h-[85vh] bg-[var(--color-background-primary)] lg:rounded-[3rem] lg:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] overflow-hidden relative flex flex-col lg:border-[10px] lg:border-white z-10 shrink-0">
        <main className="flex-1 overflow-y-auto overflow-x-hidden relative scrollbar-hide">
          <Outlet />
        </main>
      </div>

      {/* Desktop Promo Area (Right Column) */}
      <div className="hidden lg:flex w-full max-w-[500px] h-full flex-col justify-center pl-10 xl:pl-16 pr-8 pb-12 justify-self-start">
        <h1 className="text-[36px] xl:text-[44px] font-bold tracking-tight mb-10 leading-[1.3] text-[var(--color-text-primary)] whitespace-pre-line">
          {t('layout.promo.title')}
        </h1>
        <div className="flex flex-col xl:flex-row gap-4">
          {/* App Store Button */}
          <a href="#" className="flex items-center justify-center xl:justify-start gap-3.5 bg-black text-white px-5 py-3 rounded-[14px] hover:bg-gray-800 transition-colors shadow-md w-full xl:w-auto">
            <AppleIcon className="w-8 h-8 shrink-0" />
            <div className="flex flex-col items-start justify-center">
              <span className="text-[11px] text-gray-300 font-medium tracking-wide mb-0.5">Download on the</span>
              <span className="text-xl font-semibold leading-none">{t('layout.promo.appStore')}</span>
            </div>
          </a>
          
          {/* Play Store Button (Coming Soon) */}
          <button disabled className="group relative flex items-center justify-center xl:justify-start gap-3.5 bg-white text-black px-5 py-3 rounded-[14px] border border-[var(--color-divider)] cursor-not-allowed opacity-[0.85] shadow-sm w-full xl:w-auto">
            <div className="absolute -top-3 -right-2 bg-[var(--color-accent)] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full z-10 shadow-sm whitespace-nowrap">
              {t('layout.promo.comingSoon')}
            </div>
            <PlayStoreIcon className="w-8 h-8 grayscale opacity-70 shrink-0" />
            <div className="flex flex-col items-start justify-center opacity-70">
              <span className="text-[11px] text-gray-500 font-medium tracking-wide mb-0.5">GET IT ON</span>
              <span className="text-xl font-semibold leading-none">{t('layout.promo.playStore')}</span>
            </div>
          </button>
        </div>
      </div>

    </div>
  );
}
