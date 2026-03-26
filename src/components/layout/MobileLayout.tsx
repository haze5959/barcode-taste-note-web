import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { StoreDownloadButtons } from '../StoreDownloadButtons';

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
        <StoreDownloadButtons 
          className="flex flex-col xl:flex-row gap-4 items-start" 
          buttonClassName="w-full xl:w-auto" 
        />
      </div>

    </div>
  );
}
