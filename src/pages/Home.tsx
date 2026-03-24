import { useEffect, useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { ScanBarcode, Share2, Users, Bell, ShieldBan, PenTool } from 'lucide-react';
import { getHomeInfo } from '../lib/api/home';
import { HomeInfo } from '../types';
import { NoteRow } from '../components/NoteRow';
import { ProductRow } from '../components/ProductRow';

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

// ==========================================
// 피처 목록
// ==========================================
const FEATURES = [
  { icon: PenTool, title: '나만의 시음노트', desc: '나만의 시음노트를 작성하고 공유해보세요!' },
  { icon: ScanBarcode, title: 'AI 스캔 엔진', desc: '바코드 인식 및 AI 라벨 스캔을 이용한 빠른 시음노트 작성' },
  { icon: Users, title: '취향 공유 커뮤니티', desc: '팔로우 기능도 제공, 취향이 맞는 유저와 공유하세요' },
  { icon: Bell, title: '순간을 온전히 즐기세요', desc: '지금은 자리를 즐기세요! 마셔본 제품으로 등록하고 나중에 알림으로 노트 작성을 도와드립니다.' },
  { icon: Share2, title: '자유로운 웹 공유', desc: '내가 적어온 시음노트들을 SNS, 웹으로 자유롭게 공유해보세요' },
  { icon: ShieldBan, title: '광고 없는 청정 구역', desc: '제품 판매, 광고 없이 바로 당신의 감각적인 시음노트만을 작성하고 관리하세요' },
];

export default function Home() {
  const [data, setData] = useState<HomeInfo | null>(null);

  useEffect(() => {
    // API 호줄: 홈 정보 가져오기
    getHomeInfo().then(setData).catch(console.error);
  }, []);

  return (
    <div className="min-h-screen bg-[var(--color-background-primary)] pb-20 overflow-x-hidden">
      {/* =======================
          1. Hero Section 
          ======================= */}
      <section className="relative pt-24 pb-16 px-6 md:pt-32 md:pb-24 grid place-items-center text-center">
        {/* 우아한 Glow 배경 효과 */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[var(--color-accent)]/15 blur-[120px] rounded-full pointer-events-none" />
        
        <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="relative z-10 flex flex-col items-center">
          <motion.img 
            variants={fadeUp}
            src="/icon-1024.png" 
            alt="Barnote Logo" 
            className="w-24 h-24 mb-6 rounded-[22px] shadow-xl border border-[var(--color-divider)] object-cover"
          />
          <motion.h1 variants={fadeUp} className="text-4xl md:text-6xl font-extrabold tracking-tight mb-5 text-[var(--color-text-primary)] leading-[1.1]">
            당신의 모든 잔을 <br className="md:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-accent)] to-amber-500">
              완벽한 기록으로
            </span>
          </motion.h1>
          <motion.p variants={fadeUp} className="text-lg md:text-xl text-[var(--color-text-secondary)] max-w-lg mx-auto mb-10 font-medium">
            가장 빠르고 아름다운 AI 시음노트, 바노트
          </motion.p>
          <motion.div variants={fadeUp} className="flex gap-4">
            <button className="px-8 py-4 rounded-full bg-[var(--color-accent)] text-white font-bold text-lg shadow-xl shadow-[var(--color-accent)]/20 transition-all hover:scale-105 hover:shadow-2xl active:scale-95">
              지금 바로 시작하기
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
          <h2 className="text-xl md:text-2xl text-[var(--color-text-secondary)] font-semibold mb-4">현재 바노트와 함께하는 제품 수</h2>
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">기록에만 집중할 수 있도록</h2>
          <p className="text-[var(--color-text-secondary)] text-lg">바노트가 제공하는 특별한 경험</p>
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
          
          {/* 최근 등록 제품 3개 */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp}>
            <div className="mb-8">
              <h2 className="text-2xl font-bold">최근 등록된 제품</h2>
              <p className="text-[var(--color-text-secondary)] text-sm mt-1">유저들이 방금 맛본 특별한 술을 구경해보세요</p>
            </div>
            {/* ProductRow는 정사각형 영역을 차지하므로 3열 그리드로 처리 */}
            <div className="grid grid-cols-3 gap-3 md:gap-4">
              {data ? data.recentProducts.slice(0, 3).map(p => (
                <ProductRow key={p.product.id} info={p} />
              )) : Array.from({length:3}).map((_, i) => <ProductRow key={i} />)}
            </div>
          </motion.div>

          {/* 최근 작성 노트 3개 */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp}>
            <div className="mb-8">
              <h2 className="text-2xl font-bold">최근 작성된 노트</h2>
              <p className="text-[var(--color-text-secondary)] text-sm mt-1">방금 올라온 생생한 취향의 기록들</p>
            </div>
            {/* NoteRow는 가로형 컴포넌트이므로 세로 스택으로 처리 */}
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
