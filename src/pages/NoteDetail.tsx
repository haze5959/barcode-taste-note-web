import { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { notesApi } from '../lib/api/notes';
import { NoteInfo } from '../types';
import { RatingView } from '../components/RatingView';
import { OQImageView } from '../components/OQImageView';
import { InfoTagView, FlavorChip, SkeletonView } from '../components/CommonUI';
import { SEO } from '../components/SEO';
import { AppPromotionDialog } from '../components/AppPromotionDialog';
import { ChevronLeft, Calendar as CalendarIcon, User as UserIcon } from 'lucide-react';
import { FLAVOR_INFO, NOTE_DETAIL_INFO, FEELING_INFO } from '../lib/mappings';

export default function NoteDetail() {
  const { noteId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  
  const showNavBar = location.state?.fromUserList === true;
  const [info, setInfo] = useState<NoteInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [promoDialogOpen, setPromoDialogOpen] = useState(false);

  useEffect(() => {
    if (!noteId) return;

    const fetchNote = async () => {
      setLoading(true);
      try {
        const res = await notesApi.getNoteDetail(noteId);
        setInfo(res);
      } catch (error) {
        console.error('Failed to fetch note detail', error);
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [noteId]);

  return (
    <div className="flex flex-col h-full bg-[var(--color-background-primary)] relative w-full">
      <SEO title={t('note.detail_title')} description={t('note.tasting_note')} url={`https://barnote.net/note/${noteId}`} />
      {info && (
        <SEO 
          title={`${info.product.name} - ${t('note.tasting_note')}`}
          description={info.note.body || `${info.product.name} ${t('note.tasting_note')}`}
          image={(info.imageIds?.[0] || info.productImageId) ? `https://barnote.net/images/${info.imageIds?.[0] || info.productImageId}` : undefined}
          url={`https://barnote.net/note/${noteId}`}
        />
      )}
      
      {/* Header */}
      {showNavBar && (
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-[var(--color-divider)] px-4 py-3 flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-black/5 transition-colors text-[var(--color-text-primary)]">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-base font-bold text-[var(--color-text-primary)] line-clamp-1 flex-1 text-center px-4">
            {info?.product.name || t('note.detail_title')}
          </h1>
          <div className="w-10" />
        </header>
      )}

      <div className="flex-1 overflow-y-auto overflow-x-hidden px-5 py-6 scrollbar-hide">
        {loading && !info ? (
          <div className="flex flex-col gap-6">
            <SkeletonView className="w-full aspect-[4/3] rounded-3xl" />
            <SkeletonView className="w-full h-40 rounded-3xl" />
            <SkeletonView className="w-full h-24 rounded-3xl" />
          </div>
        ) : !info ? (
           <div className="py-24 flex flex-col items-center justify-center text-center">
             <div className="w-16 h-16 bg-[var(--color-surface-secondary)] rounded-full flex items-center justify-center mb-5 text-2xl">🔍</div>
             <h2 className="text-[17px] font-bold text-[var(--color-text-primary)] mb-2">{t('note.not_found_title')}</h2>
             <p className="text-[14px] text-[var(--color-text-secondary)]">{t('note.not_found_desc')}</p>
           </div>
        ) : (
          <div className="flex flex-col gap-6">
            {/* Hero Section */}
            <div 
              className="relative w-full aspect-[4/3] rounded-[2rem] overflow-hidden shadow-lg border-4 border-[var(--color-surface-secondary)] cursor-pointer group"
              onClick={() => setPromoDialogOpen(true)}
            >
              <div className="absolute inset-0 bg-black/10 z-10 transition-colors group-hover:bg-black/30" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
              <OQImageView imageId={info.imageIds?.[0] || info.productImageId} className="absolute inset-0 w-full h-full object-cover z-0" />
              
              <div className="absolute top-4 left-4 right-4 z-20 flex justify-between">
                <InfoTagView text={info.note.publicScope === 'public' ? t('note.public_scope_public') : t('note.public_scope_private')} />
                {info.imageIds && info.imageIds.length > 1 && (
                  <InfoTagView text={`+${info.imageIds.length}`} icon="📸" />
                )}
              </div>

              <div className="absolute bottom-5 left-5 right-5 z-20 flex flex-col gap-1.5 focus:outline-none">
                <h2 className="text-[22px] font-extrabold text-white line-clamp-2 leading-tight drop-shadow-md">
                  {info.product.name}
                </h2>
                <div className="flex items-center gap-2">
                  <RatingView value={info.note.rating} size={18} color="#FFD700" className="drop-shadow-sm" />
                  <span className="text-white font-bold text-[14px] drop-shadow-md">{(info.note.rating / 2).toFixed(1)}</span>
                </div>
              </div>
            </div>

            {/* Tasting Note Section */}
            <div className="bg-[var(--color-surface-primary)] p-5 rounded-3xl shadow-sm border border-[var(--color-divider)]">
              <h3 className="text-[15px] font-bold text-[var(--color-text-primary)] mb-3">{t('note.tasting_note')}</h3>
              <p className="text-[15px] text-[var(--color-text-secondary)] leading-relaxed whitespace-pre-wrap min-h-[60px]">
                {info.note.body || t('note.no_detail')}
              </p>

              {info.flavors && info.flavors.length > 0 && (
                <>
                  <div className="w-full border-t border-[var(--color-divider)] my-5" />
                  <h3 className="text-[13px] font-bold text-[var(--color-text-primary)] mb-3">{t('note.flavor')}</h3>
                  <div className="flex flex-wrap gap-2">
                    {info.flavors.map(f => (
                      <FlavorChip key={f} label={FLAVOR_INFO[f] || f} active={true} />
                    ))}
                  </div>
                </>
              )}

              {info.note.details && Object.keys(info.note.details).length > 0 && (
                <>
                  <div className="w-full border-t border-[var(--color-divider)] my-5" />
                  <h3 className="text-[13px] font-bold text-[var(--color-text-primary)] mb-3">{t('note.evaluation')}</h3>
                  <div className="flex flex-col gap-3">
                    {Object.entries(info.note.details).map(([key, value]) => {
                      if (key === '9' || key === 'feeling') {
                        const feeling = FEELING_INFO[value as number];
                        if (!feeling) return null;
                        return (
                          <div key={key} className="flex items-center text-[13px] text-[var(--color-text-secondary)] mt-1">
                            <span className="w-16 font-medium text-[var(--color-text-primary)]">{t('note.feeling')}</span>
                            <div className="flex-1 flex items-center gap-2 ml-2">
                              <span className="text-xl leading-none">{feeling.emoji}</span>
                              <span className="font-semibold text-[var(--color-text-primary)]">{feeling.desc}</span>
                            </div>
                          </div>
                        );
                      }

                      if (value === 0) return null;

                      return (
                        <div key={key} className="flex items-center text-[13px] text-[var(--color-text-secondary)]">
                          <span className="w-16 font-medium text-[var(--color-text-primary)]">{NOTE_DETAIL_INFO[key] || key}</span>
                          <div className="flex-1 flex gap-1 ml-2">
                             {[1, 2, 3, 4, 5].map(step => {
                               const opacities = ['opacity-40', 'opacity-55', 'opacity-70', 'opacity-85', 'opacity-100'];
                               return (
                                 <div 
                                   key={step} 
                                   className={`h-2.5 flex-1 rounded-sm ${
                                     step <= value 
                                       ? `bg-[var(--color-accent)] ${opacities[step - 1]}`
                                       : 'bg-[var(--color-surface-secondary)]'
                                   }`}
                                 />
                               );
                             })}
                          </div>
                          <span className="ml-3 font-semibold text-[var(--color-text-primary)] w-3 text-right">{value}</span>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </div>

            {/* Meta Section */}
            <div className="bg-[var(--color-surface-secondary)] p-4 rounded-3xl border border-[var(--color-divider)]/50">
              <div className="flex items-center justify-between mb-4 px-2">
                <h3 className="text-[14px] font-bold text-[var(--color-text-primary)]">{t('note.basic_info')}</h3>
              </div>

              <div className="flex flex-col gap-0 bg-white/50 rounded-2xl overflow-hidden p-1">
                <div onClick={() => {
                  if (info.user) navigate(`/user/${info.user.id}`);
                }} className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/80 transition-colors cursor-pointer group">
                  <div className="w-10 h-10 rounded-full border border-[var(--color-divider)] bg-[var(--color-surface-secondary)] flex items-center justify-center overflow-hidden shrink-0">
                    {info.user?.imageId ? (
                      <OQImageView imageId={info.user.imageId} isProfile={true} className="w-full h-full object-cover" />
                    ) : (
                      <UserIcon className="w-4 h-4 text-[var(--color-text-secondary)]" />
                    )}
                  </div>
                  <div className="flex flex-col flex-1">
                     <span className="text-[11px] text-[var(--color-text-secondary)] font-medium">{t('note.author')}</span>
                     <span className="text-[14px] font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors">{info.user?.nickName || '-'}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl">
                  <div className="w-10 h-10 rounded-full bg-[var(--color-surface-secondary)]/50 flex items-center justify-center shrink-0">
                    <CalendarIcon className="w-4 h-4 text-[var(--color-text-secondary)]" />
                  </div>
                  <div className="flex flex-col flex-1">
                     <span className="text-[11px] text-[var(--color-text-secondary)] font-medium">{t('note.date')}</span>
                     <span className="text-[14px] font-semibold text-[var(--color-text-primary)]">{new Date(info.note.registered).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="h-4" /> {/* Bottom Padding */}
          </div>
        )}
      </div>

      {/* 앱 프로모션 다이얼로그 */}
      <AppPromotionDialog
        open={promoDialogOpen}
        onClose={() => setPromoDialogOpen(false)}
        onConfirm={() => {
          setPromoDialogOpen(false);
          navigate('/', { state: { showPromo: true } });
        }}
      />
    </div>
  );
}
