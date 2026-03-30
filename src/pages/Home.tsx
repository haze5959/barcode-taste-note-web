import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, Variants, animate } from 'framer-motion';
import { ScanBarcode, Share2, Users, Bell, ShieldBan, PenTool } from 'lucide-react';
import { getHomeInfo } from '../lib/api/home';
import { HomeInfo } from '../types';
import { NoteRow } from '../components/NoteRow';
import { SEO } from '../components/SEO';
import { StoreDownloadButtons } from '../components/StoreDownloadButtons';
import { useTranslation } from 'react-i18next';

// ==========================================
// 애니메이션 프리셋 (Framer Motion)
// ==========================================
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

function AnimatedCounter({ value }: { value: number }) {
  const nodeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = nodeRef.current;
    if (node) {
      const controls = animate(0, value, {
        duration: 2,
        ease: "easeOut",
        onUpdate(v) {
          node.textContent = Math.round(v).toLocaleString();
        }
      });
      return () => controls.stop();
    }
  }, [value]);

  return <span ref={nodeRef} />;
}

export default function Home() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [data, setData] = useState<HomeInfo | null>(null);

  useEffect(() => {
    // API 호줄: 홈 정보 가져오기
    getHomeInfo().then(setData).catch(console.error);
  }, []);

  const FEATURES = [
    { icon: PenTool, title: t('home.feat1_title'), desc: t('home.feat1_desc') },
    { icon: ScanBarcode, title: t('home.feat2_title'), desc: t('home.feat2_desc') },
    { icon: Users, title: t('home.feat3_title'), desc: t('home.feat3_desc') },
    { icon: Bell, title: t('home.feat4_title'), desc: t('home.feat4_desc') },
    { icon: Share2, title: t('home.feat5_title'), desc: t('home.feat5_desc') },
    { icon: ShieldBan, title: t('home.feat6_title'), desc: t('home.feat6_desc') },
  ];

  return (
    <div className="min-h-screen bg-[var(--color-background-primary)] pb-20 overflow-x-hidden">
      <SEO />
      {/* =======================
          1. Hero Section 
          ======================= */}
      <section className="relative pt-24 pb-16 px-6 md:pt-32 md:pb-24 grid place-items-center text-center">
        {/* 무거운 CSS blur 대신 가벼운 방사형 그라디언트를 사용하여 GPU 렌더링 부하 100% 감소 */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] md:w-[600px] md:h-[600px] bg-[radial-gradient(circle,var(--color-accent)_0%,transparent_60%)] opacity-15 pointer-events-none rounded-full" />

        <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="relative z-10 flex flex-col items-center will-change-transform">
          <motion.img
            variants={fadeUp}
            src="/icon-256.png"
            alt="BarNote Logo"
            decoding="async"
            fetchPriority="high"
            className="w-24 h-24 mb-6 rounded-[22px] shadow-xl border border-[var(--color-divider)] object-cover"
          />
          <motion.h1 variants={fadeUp} className="text-4xl md:text-6xl font-extrabold tracking-tight mb-5 text-[var(--color-text-primary)] leading-[1.1]">
            {t('home.hero_title1')}<br className="md:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-accent)] to-amber-500">
              {t('home.hero_title2')}
            </span>
          </motion.h1>
          <motion.p variants={fadeUp} className="text-lg md:text-xl text-[var(--color-text-secondary)] max-w-lg mx-auto mb-10 font-medium">
            {t('home.hero_subtitle')}
          </motion.p>
          <motion.div variants={fadeUp} className="flex gap-4">
            <button className="px-8 py-4 rounded-full bg-[var(--color-accent)] text-white font-bold text-lg shadow-xl shadow-[var(--color-accent)]/20 transition-all hover:scale-105 hover:shadow-2xl active:scale-95">
              {t('home.hero_btn')}
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* =======================
          2. 등록된 제품 카운터 
          ======================= */}
      <section className="px-6 py-12 md:py-20">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}
          className="max-w-4xl mx-auto bg-gradient-to-br from-[var(--color-surface-primary)] to-[var(--color-surface-secondary)] rounded-3xl p-8 md:p-14 text-center shadow-sm border border-[var(--color-divider)] min-h-[200px] flex flex-col justify-center"
        >
          <h2 className="text-xl md:text-2xl text-[var(--color-text-secondary)] font-semibold mb-4">{t('home.counter_title')}</h2>

          {!data ? (
            <div className="flex flex-col items-center justify-center gap-3.5 py-4 opacity-80">
              <div className="relative flex items-center justify-center w-10 h-10">
                <div className="absolute inset-0 rounded-full border-4 border-[var(--color-divider)] opacity-50" />
                <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[var(--color-accent)] animate-spin" />
              </div>
              <span className="text-sm md:text-base font-semibold text-[var(--color-text-secondary)] tracking-wide animate-pulse">
                {t('home.fetching_data', { defaultValue: '최신 바코드 데이터 동기화 중...' })}
              </span>
            </div>
          ) : (
            <div className="text-6xl md:text-7xl lg:text-8xl font-black text-[var(--color-text-primary)] tracking-tighter tabular-nums flex justify-center items-center gap-2">
              <AnimatedCounter value={data.productCount} />
              <span className="text-4xl md:text-6xl text-[var(--color-accent)]">+</span>
            </div>
          )}
        </motion.div>
      </section>

      {/* =======================
          3. 핵심 피처 그리드 
          ======================= */}
      <section className="px-6 py-16 md:py-24 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('home.feat_title')}</h2>
          <p className="text-[var(--color-text-secondary)] text-lg">{t('home.feat_sub')}</p>
        </div>

        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {FEATURES.map((feat, idx) => (
            <motion.div
              key={idx} variants={fadeUp}
              className="bg-[var(--color-surface-primary)] p-8 rounded-3xl border border-[var(--color-divider)] shadow-sm hover:shadow-md transition-shadow group cursor-default"
            >
              <div className="w-14 h-14 rounded-2xl bg-[var(--color-surface-secondary)] flex items-center justify-center mb-6 text-[var(--color-accent)] group-hover:-translate-y-2 transition-transform duration-300">
                <feat.icon size={26} strokeWidth={2.5} />
              </div>
              <h3 className="text-xl font-bold mb-3">{feat.title}</h3>
              <p className="text-[var(--color-text-secondary)] leading-relaxed">{feat.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* =======================
          4. 최근 시음 노트 
          ======================= */}
      <section className="px-6 py-16 max-w-3xl mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp}>
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold">{t('home.recent_note_title')}</h2>
            <p className="text-[var(--color-text-secondary)] text-sm mt-1">{t('home.recent_note_sub')}</p>
          </div>
          <div className="flex flex-col gap-4">
            {data ? data.recentNotes.slice(0, 3).map(n => (
              <div key={n.note.id} onClick={() => navigate(`/note/${n.note.id}`)} className="cursor-pointer transition-transform hover:-translate-y-1">
                <NoteRow info={n} />
              </div>
            )) : Array.from({ length: 3 }).map((_, i) => <NoteRow key={i} />)}
          </div>
        </motion.div>
      </section>

      {/* =======================
          5. 앱 다운로드 유도 섹션
          ======================= */}
      <section className="px-6 py-20 pb-28 md:py-24 max-w-4xl mx-auto text-center border-t border-[var(--color-divider)]">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp}>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">{t('home.promo_title')}</h2>
          <p className="text-[var(--color-text-secondary)] mb-8 text-lg">{t('home.promo_desc')}</p>
          <StoreDownloadButtons />
        </motion.div>
      </section>
    </div>
  );
}
