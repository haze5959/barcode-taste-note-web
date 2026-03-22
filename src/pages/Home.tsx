import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function Home() {
  const location = useLocation();
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (location.state?.showPromo) {
      setShowToast(true);
      const timer = setTimeout(() => setShowToast(false), 3500);
      return () => clearTimeout(timer);
    }
  }, [location]);

  return (
    <div className="flex flex-col h-full bg-[var(--color-background-primary)] relative items-center justify-center p-6 text-center w-full xl:w-[480px]">
      <div className="w-20 h-20 bg-[var(--color-surface-secondary)] rounded-3xl flex items-center justify-center mb-6 text-4xl shadow-sm">
        🍷
      </div>
      <h1 className="text-2xl font-extrabold text-[var(--color-text-primary)] mb-3 tracking-tight">Barcode Taste Note</h1>
      <p className="text-[var(--color-text-secondary)] text-[15px] leading-relaxed mb-10 max-w-[260px]">
        나만의 테이스팅 노트를 기록하고<br />다양한 주류 정보를 탐색해보세요.
      </p>

      {/* Placeholder Buttons */}
      <div className="flex flex-col gap-3 w-full max-w-[280px]">
        <div className="w-full py-3.5 bg-black text-white rounded-xl font-bold border border-white/10 opacity-50 flex items-center justify-center gap-2">
           <span>App Store</span>
        </div>
        <div className="w-full py-3.5 bg-black text-white rounded-xl font-bold border border-white/10 opacity-50 flex items-center justify-center gap-2">
           <span>Google Play</span>
        </div>
      </div>

      {showToast && (
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 bg-black/85 backdrop-blur-xl text-white px-5 py-3.5 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.25)] flex items-center gap-3.5 z-50 animate-in fade-in slide-in-from-bottom-6 duration-300 min-w-max">
          <span className="text-2xl bg-white/20 w-8 h-8 rounded-full flex items-center justify-center p-1.5 shrink-0">✨</span>
          <div className="flex flex-col text-left">
            <span className="text-[14px] font-bold leading-tight mb-0.5">앱을 다운로드 해보세요!</span>
            <span className="text-[12px] font-medium text-white/80 leading-tight">더 많은 시음 노트와 정보를 만날 수 있어요.</span>
          </div>
        </div>
      )}
    </div>
  );
}
