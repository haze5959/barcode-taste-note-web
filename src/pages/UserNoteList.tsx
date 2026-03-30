import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { usersApi } from '../lib/api/users';
import { notesApi } from '../lib/api/notes';
import { productsApi } from '../lib/api/products';
import { UserInfo, NoteInfo, ProductInfo } from '../types';
import { OQImageView } from '../components/OQImageView';
import { NoteRow } from '../components/NoteRow';
import { ProductRow } from '../components/ProductRow';
import { SkeletonView } from '../components/CommonUI';
import { SEO } from '../components/SEO';
import { AppPromotionDialog } from '../components/AppPromotionDialog';

type Tab = 'notes' | 'favorites';

export default function UserNoteList() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [notes, setNotes] = useState<NoteInfo[]>([]);
  const [favorites, setFavorites] = useState<ProductInfo[]>([]);
  const [activeTab, setActiveTab] = useState<Tab>('notes');
  const [loading, setLoading] = useState(true);
  const [promoDialogOpen, setPromoDialogOpen] = useState(false);

  useEffect(() => {
    if (!userId) return;
    
    const fetchData = async () => {
      setLoading(true);
      try {
        const infoRes = await usersApi.getUserInfo(userId);
        const notesRes = await notesApi.fetchUserNotes({ userId, page: 1, orderBy: 'registered', per: 20 });
        
        setUserInfo(infoRes);
        setNotes(notesRes);
      } catch (error) {
        console.error('Failed to fetch user notes:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [userId]);

  const fetchFavorites = async () => {
    if (favorites.length > 0 || !userId) return;
    try {
      const favRes = await productsApi.fetchFavoriteProducts({ userId, page: 1 });
      setFavorites(favRes);
    } catch (error) {
      console.error('Failed to fetch favorites', error);
    }
  };

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    if (tab === 'favorites') fetchFavorites();
  };

  return (
    <div className="flex flex-col h-full bg-[var(--color-background-primary)] relative pb-20 w-full">
      <SEO title={t('user.tab_notes')} description={t('user.tab_notes')} url={`https://barnote.net/user/${userId}`} />
      
      {userInfo && (
        <SEO 
          title={`${userInfo.user.nickName} - ${t('user.tab_notes')}`}
          description={userInfo.user.intro || `${userInfo.user.nickName} ${t('user.tab_notes')}`}
          image={userInfo.user.imageId ? `https://barnote.net/images/${userInfo.user.imageId}` : undefined}
          url={`https://barnote.net/user/${userId}`}
        />
      )}
      
      <div className="flex-1 overflow-y-auto overflow-x-hidden p-0 w-full">
        {/* Profile Header */}
        <section className="px-5 py-6">
          {loading && !userInfo ? (
            <SkeletonView className="w-full h-32 rounded-2xl" />
          ) : userInfo ? (
            <div className="flex items-center gap-5">
              <div className="w-[84px] h-[84px] shrink-0 rounded-full border-2 border-[var(--color-divider)] overflow-hidden bg-white shadow-sm relative">
                <OQImageView imageId={userInfo.user.imageId} isProfile={true} className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col flex-1">
                <h2 className="text-xl font-extrabold text-[var(--color-text-primary)] mb-1">{userInfo.user.nickName}</h2>
                <p className="text-[13px] text-[var(--color-text-secondary)] leading-snug line-clamp-2 min-h-10 mb-2">
                  {userInfo.user.intro || t('user.no_intro')}
                </p>
                <div className="flex items-center gap-5 mt-1">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-[var(--color-text-secondary)] font-medium mb-0.5">{t('user.note_count')}</span>
                    <span className="text-[15px] font-extrabold text-[var(--color-text-primary)] leading-none">{userInfo.noteCount}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-[var(--color-text-secondary)] font-medium mb-0.5">{t('user.follower_count')}</span>
                    <span className="text-[15px] font-extrabold text-[var(--color-text-primary)] leading-none">{userInfo.followerCount || 0}</span>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </section>

        <div className="w-full border-t border-[var(--color-divider)] my-2" />

        {/* Tabs */}
        <div className="flex px-5 pt-4 pb-0 bg-[var(--color-background-primary)] relative">
          {(['notes', 'favorites'] as Tab[]).map((tab) => (
             <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`flex-1 pb-3.5 text-[15px] font-bold relative transition-colors ${
                  activeTab === tab ? 'text-[var(--color-text-primary)]' : 'text-[var(--color-text-secondary)] font-medium'
                }`}
             >
                {tab === 'notes' ? t('user.tab_notes') : t('user.tab_favorites')}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#181820] rounded-t-full" />
                )}
             </button>
          ))}
        </div>

        <div className="w-full border-t border-[var(--color-divider)] -mt-px mb-4" />

        {/* Tab Content */}
        <section className="px-5 py-2">
          {activeTab === 'notes' && (
             <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold text-[17px] text-[var(--color-text-primary)]">{t('user.tab_notes')}</h3>
                </div>
                {loading && notes.length === 0 ? (
                  Array.from({ length: 4 }).map((_, i) => <NoteRow key={i} info={null} />)
                ) : notes.length > 0 ? (
                  <div className="flex flex-col gap-3.5">
                    {notes.map((note) => (
                      <div key={note.note.id} onClick={() => navigate(`/note/${note.note.id}`, { state: { fromUserList: true } })}>
                        <NoteRow info={note} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-20 flex flex-col items-center justify-center text-center px-4">
                    <div className="w-16 h-16 bg-[var(--color-surface-secondary)] rounded-full flex items-center justify-center mb-5 text-2xl text-[var(--color-text-secondary)]">📝</div>
                    <h4 className="text-[15px] font-bold text-[var(--color-text-primary)] mb-1.5">{t('user.no_notes_title')}</h4>
                    <p className="text-[13px] text-[var(--color-text-secondary)]">{t('user.no_notes_desc')}</p>
                  </div>
                )}
             </div>
          )}

          {activeTab === 'favorites' && (
             <div className="flex flex-col gap-4">
                {favorites.length === 0 && !loading ? (
                   <div className="py-20 flex flex-col items-center justify-center text-center px-4">
                      <div className="w-16 h-16 bg-[var(--color-surface-secondary)] rounded-full flex items-center justify-center mb-5 text-2xl text-[var(--color-text-secondary)]">❤️</div>
                      <h4 className="text-[15px] font-bold text-[var(--color-text-primary)] mb-1.5">{t('user.no_fav_title')}</h4>
                      <p className="text-[13px] text-[var(--color-text-secondary)]">{t('user.no_fav_desc')}</p>
                    </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3.5">
                    {loading ? (
                      Array.from({ length: 6 }).map((_, i) => <ProductRow key={i} info={null} />)
                    ) : (
                      favorites.map((product) => (
                        <ProductRow 
                          key={product.product.id} 
                          info={product} 
                          onClick={() => setPromoDialogOpen(true)} 
                        />
                      ))
                    )}
                  </div>
                )}
             </div>
          )}
        </section>
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
