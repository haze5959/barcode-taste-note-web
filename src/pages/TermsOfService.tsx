import { SEO } from '../components/SEO';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function TermsOfService() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="flex flex-col h-full bg-[var(--color-background-primary)] relative pb-20 w-full xl:w-[480px]">
      <SEO title={t('terms.title')} description={t('terms.title')} url="https://barnote.net/terms_of_service" />
      
      <header className="sticky top-0 z-30 bg-[#f7f5f2]/80 dark:bg-[#050505]/80 backdrop-blur-md border-b border-[var(--color-divider)] px-4 py-3 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-[var(--color-text-primary)]">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-base font-bold text-[var(--color-text-primary)]">{t('terms.title')}</h1>
        <div className="w-10" />
      </header>

      <div className="px-6 py-8 text-[var(--color-text-primary)] leading-relaxed text-[15px] break-keep">
        <h2 className="text-2xl font-extrabold mb-6">{t('terms.title')}</h2>
        <p className="mb-6 text-[14px] text-[var(--color-text-secondary)] font-medium">
          {t('terms.effective_date', { date: '2026-06-11' })}
        </p>

        {Array.from({ length: 12 }, (_, i) => i + 1).map((num) => {
          const titleKey = `terms.section${num}_title`;
          const descKey = `terms.section${num}_desc`;

          if (t(titleKey) === titleKey) return null;

          // 항목 목록을 동적으로 수집 (terms.s{num}_item{i}, 개수 제한 없음)
          const items: string[] = [];
          for (let i = 1; i <= 12; i++) {
            const itemKey = `terms.s${num}_item${i}`;
            if (t(itemKey) === itemKey) break;
            items.push(t(itemKey));
          }
          const hasList = items.length > 0;

          return (
            <section key={num} className="mb-8">
              <h3 className="text-[17px] font-bold mb-3">{t(titleKey)}</h3>

              {t(descKey) !== descKey && (
                <p className={hasList ? "mb-3 text-[var(--color-text-secondary)]" : "text-[var(--color-text-secondary)]"}>
                  {t(descKey)}
                </p>
              )}

              {hasList && (
                <ul className="list-disc pl-5 space-y-1.5 text-[var(--color-text-secondary)]">
                  {items.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
