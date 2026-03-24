import { useEffect, useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { ScanBarcode, Share2, Users, Bell, ShieldBan, PenTool } from 'lucide-react';
import { getHomeInfo } from '../lib/api/home';
import { HomeInfo } from '../types';
import { NoteRow } from '../components/NoteRow';
import { ProductRow } from '../components/ProductRow';
import { SEO } from '../components/SEO';
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

export default function Home() {
  const { t } = useTranslation();
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
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[var(--color-accent)]/15 blur-[120px] rounded-full pointer-events-none" />
        
        <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="relative z-10 flex flex-col items-center">
          <motion.img 
            variants={fadeUp}
            src="/icon-1024.png" 
            alt="Barnote Logo" 
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
          className="max-w-4xl mx-auto bg-gradient-to-br from-[var(--color-surface-primary)] to-[var(--color-surface-secondary)] rounded-3xl p-8 md:p-14 text-center shadow-sm border border-[var(--color-divider)]"
        >
          <h2 className="text-xl md:text-2xl text-[var(--color-text-secondary)] font-semibold mb-4">{t('home.counter_title')}</h2>
          <div className="text-6xl md:text-7xl lg:text-8xl font-black text-[var(--color-text-primary)] tracking-tighter tabular-nums flex justify-center items-center gap-2">
            {data ? data.productCount.toLocaleString() : '···'}
            <span className="text-4xl md:text-6xl text-[var(--color-accent)]">+</span>
          </div>
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
          4. 최근 기록 쇼케이스 
          ======================= */}
      <section className="px-6 py-16 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12">
          
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp}>
            <div className="mb-8">
              <h2 className="text-2xl font-bold">{t('home.recent_prod_title')}</h2>
              <p className="text-[var(--color-text-secondary)] text-sm mt-1">{t('home.recent_prod_sub')}</p>
            </div>
            <div className="grid grid-cols-3 gap-3 md:gap-4">
              {data ? data.recentProducts.slice(0, 3).map(p => (
                <ProductRow key={p.product.id} info={p} />
              )) : Array.from({length:3}).map((_, i) => <ProductRow key={i} />)}
            </div>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp}>
            <div className="mb-8">
              <h2 className="text-2xl font-bold">{t('home.recent_note_title')}</h2>
              <p className="text-[var(--color-text-secondary)] text-sm mt-1">{t('home.recent_note_sub')}</p>
            </div>
            <div className="flex flex-col gap-4">
              {data ? data.recentNotes.slice(0, 3).map(n => (
                <NoteRow key={n.note.id} info={n} />
              )) : Array.from({length:3}).map((_, i) => <NoteRow key={i} />)}
            </div>
          </motion.div>

        </div>
      </section>
    </div>
  );
}
