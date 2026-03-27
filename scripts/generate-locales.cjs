const fs = require('fs');
const path = require('path');

const locales = ['ko', 'en', 'zh-CN', 'zh-TW', 'ja', 'fr', 'de', 'es', 'pt', 'it', 'ru'];

const ko = {
  common: { app_name: "Barnote", back: "뒤로가기", loading: "로딩 중...", error: "오류가 발생했습니다." },
  home: {
    hero_title1: "당신의 모든 잔을 ", hero_title2: "완벽한 기록으로", hero_subtitle: "가장 빠르고 아름다운 AI 시음노트, 바노트", hero_btn: "지금 바로 시작하기",
    counter_title: "현재 바노트와 함께하는 제품 수",
    feat_title: "기록에만 집중할 수 있도록", feat_sub: "바노트가 제공하는 특별한 경험",
    feat1_title: "나만의 시음노트", feat1_desc: "나만의 시음노트를 작성하고 공유해보세요!",
    feat2_title: "AI 스캔 엔진", feat2_desc: "바코드 인식 및 AI 라벨 스캔을 이용한 빠른 시음노트 작성",
    feat3_title: "취향 공유 커뮤니티", feat3_desc: "팔로우 기능도 제공, 취향이 맞는 유저와 공유하세요",
    feat4_title: "순간을 온전히 즐기세요", feat4_desc: "지금은 자리를 즐기세요! 마셔본 제품으로 등록하고 나중에 알림으로 노트 작성을 도와드립니다.",
    feat5_title: "자유로운 웹 공유", feat5_desc: "내가 적어온 시음노트들을 SNS, 웹으로 자유롭게 공유해보세요",
    feat6_title: "광고 없는 청정 구역", feat6_desc: "제품 판매, 광고 없이 바로 당신의 감각적인 시음노트만을 작성하고 관리하세요",
    recent_prod_title: "최근 등록된 제품", recent_prod_sub: "유저들이 방금 맛본 특별한 술을 구경해보세요",
    recent_note_title: "최근 작성된 노트", recent_note_sub: "방금 올라온 생생한 취향의 기록들",
    fetching_data: "최신 바코드 데이터 동기화 중...",
    promo_title: "내 손안의 테이스팅 노트, 바노트", promo_desc: "지금 바로 앱을 다운로드하고 나만의 기록을 남겨보세요."
  },
  layout: {
    promo: {
      title: "바코드 스캔으로 시작하는\n가장 빠른 시음 노트",
      appStore: "App Store", playStore: "Google Play", comingSoon: "Coming Soon"
    }
  },
  user: {
    no_intro: "등록된 소개가 없습니다.", note_count: "노트", follower_count: "팔로워",
    tab_notes: "작성 노트", tab_favorites: "즐겨찾는 제품",
    no_notes_title: "작성한 노트가 없습니다", no_notes_desc: "이 유저는 아직 테이스팅 노트를 작성하지 않았습니다.",
    no_fav_title: "즐겨찾는 제품이 없습니다", no_fav_desc: "이 유저가 즐겨찾기한 제품이 없습니다."
  },
  note: {
    detail_title: "노트 상세", not_found_title: "노트를 찾을 수 없어요", not_found_desc: "잠시 후 다시 시도해 보세요.",
    public_scope_public: "전체 공개", public_scope_private: "비공개",
    tasting_note: "테이스팅 노트", no_detail: "기록된 상세 노트가 없습니다.",
    flavor: "느껴진 향미", evaluation: "상세 평가", feeling: "감정", basic_info: "기본 정보", author: "작성자", date: "작성일"
  },
  policy: {
    title: "개인정보처리방침", effective_date: "시행일: {{date}}",
    section1_title: "1. 개인정보의 처리 목적", section1_desc: "Barnote(이하 '회사')는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 사전에 동의를 구합니다.",
    s1_item1: "회원 가입 의사 확인 및 회원제 서비스 제공", s1_item2: "시음 노트 및 취향 정보 분석, 맞춤형 서비스 제공", s1_item3: "고객 문의 대응 및 민원 처리",
    section2_title: "2. 수집하는 개인정보 항목", section2_desc: "회사는 원활한 서비스 제공을 위해 다음의 개인정보를 수집하고 있습니다.",
    s2_item1: "필수항목: 이메일, 비밀번호, 닉네임, 기기 정보", s2_item2: "선택항목: 프로필 사진, 한 줄 소개", s2_item3: "서비스 이용 기록: 접속 로그, 접속 IP 정보, 시음 노트, 팔로우 등",
    section3_title: "3. 개인정보의 보유 및 이용기간", section3_desc: "원칙적으로 개인정보 처리목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. (단, 관련 법령에 의해 보존할 필요가 있는 경우 해당 법령에서 정한 기간 동안 보존)",
    section4_title: "4. 정보주체의 권리·의무 및 그 행사방법", section4_desc: "이용자는 등록되어 있는 본인의 개인정보를 조회하거나 수정할 수 있으며, 동의 철회 및 가입 해지를 요청할 수 있습니다.",
    section5_title: "5. 문의처", section5_desc: "개인정보 보호 관련 문의, 불만 처리, 피해 구제 등에 관한 사항은 아래 연락처로 문의하시기 바랍니다.", email: "- 이메일:"
  },
  terms: {
    title: "서비스 이용약관", effective_date: "시행일: {{date}}",
    section1_title: "제1조 (목적)", section1_desc: "본 약관은 Barnote(이하 '회사')가 제공하는 바노트(Barnote) 서비스(이하 '서비스')의 이용과 관련하여 회사와 이용자의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.",
    section2_title: "제2조 (용어의 정의)", s2_item1: "'이용자'란 본 약관에 따라 회사가 제공하는 서비스를 받는 회원을 말합니다.", s2_item2: "'회원'이란 서비스에 가입하여 회사가 제공하는 서비스를 이용할 수 있는 자를 말합니다.", s2_item3: "'콘텐츠'란 회원이 서비스 내에 게시한 부호, 문자, 도형, 색채, 음성, 음향, 이미지 등을 말합니다.",
    section3_title: "제3조 (약관의 효력 및 변경)", section3_desc: "회사는 합리적인 사유가 발생할 경우 관련 법령에 위배되지 않는 범위 내에서 약관을 개정할 수 있습니다.",
    section4_title: "제4조 (회원의 의무 및 삭제 권한)", section4_desc: "회원은 서비스를 이용할 때 타인의 정보 도용이나 지적재산권 침해 등 부당한 행위를 하여서는 안 되며, 위반 시 삭제될 수 있습니다.",
    section5_title: "제5조 (책임의 한계)", section5_desc: "회사는 무료로 제공되는 서비스 이용과 관련하여 관련 법률에 특별한 규정이 없는 한 책임을 지지 않습니다.",
    section6_title: "제6조 (관할법원)", section6_desc: "서비스 이용과 관련하여 분쟁이 발생한 경우 합의에 의해 해결하며, 해결되지 않는 경우 관할 법원에 제소할 수 있습니다."
  }
};

const en = {
  common: { app_name: "Barnote", back: "Back", loading: "Loading...", error: "An error occurred." },
  home: {
    hero_title1: "Turn every glass into ", hero_title2: "a perfect memory", hero_subtitle: "The fastest and most beautiful AI tasting note, Barnote", hero_btn: "Start Right Now",
    counter_title: "Products registered with Barnote", feat_title: "Focus only on your records", feat_sub: "Special experiences provided by Barnote",
    feat1_title: "Your Own Tasting Notes", feat1_desc: "Create and share your own tasting notes!",
    feat2_title: "AI Scan Engine", feat2_desc: "Fast tasting notes using barcode recognition and AI label scanning",
    feat3_title: "Taste Sharing Community", feat3_desc: "Follow feature provided, share with users who have similar tastes",
    feat4_title: "Enjoy the Moment", feat4_desc: "Enjoy your drink now! Register it as consumed and we'll remind you to write a note later.",
    feat5_title: "Free Web Sharing", feat5_desc: "Share your tasting notes freely on social media and the web",
    feat6_title: "Ad-free Clean Zone", feat6_desc: "Write and manage your sensuous tasting notes without product sales or ads",
    recent_prod_title: "Recently Registered Products", recent_prod_sub: "Check out the special drinks users just tasted",
    recent_note_title: "Recently Written Notes", recent_note_sub: "Vivid taste records just uploaded",
    fetching_data: "Syncing latest barcode data...", promo_title: "Tasting notes in your hand, Barnote", promo_desc: "Download the app now and leave your own records."
  },
  layout: { promo: { title: "The fastest tasting notes\nstarting with a barcode scan", appStore: "App Store", playStore: "Google Play", comingSoon: "Coming Soon" } },
  user: {
    no_intro: "No introduction provided.", note_count: "Notes", follower_count: "Followers", tab_notes: "Written Notes", tab_favorites: "Favorite Products",
    no_notes_title: "No notes written", no_notes_desc: "This user hasn't written any tasting notes yet.", no_fav_title: "No favorite products", no_fav_desc: "This user has no favorite products."
  },
  note: {
    detail_title: "Note Detail", not_found_title: "Note not found", not_found_desc: "Please try again in a moment.",
    public_scope_public: "Public", public_scope_private: "Private", tasting_note: "Tasting Note", no_detail: "No detailed note recorded.",
    flavor: "Flavors Felt", evaluation: "Detailed Evaluation", feeling: "Feeling", basic_info: "Basic Info", author: "Author", date: "Date"
  },
  policy: { ...ko.policy, title: "Privacy Policy", effective_date: "Effective Date: {{date}}" },
  terms: { ...ko.terms, title: "Terms of Service", effective_date: "Effective Date: {{date}}" }
};

const zhCN = {
  common: { app_name: "Barnote", back: "返回", loading: "加载中...", error: "发生错误。" },
  home: {
    hero_title1: "将每一杯美酒 ", hero_title2: "化作完美记录", hero_subtitle: "最快最美观的AI品鉴笔记，Barnote", hero_btn: "立即开始",
    counter_title: "Barnote 已收录的产品数量", feat_title: "让你专注记录", feat_sub: "Barnote 提供的独特体验",
    feat1_title: "专属品鉴笔记", feat1_desc: "创建并分享你的专属品鉴笔记！",
    feat2_title: "AI 识别引擎", feat2_desc: "使用条码识别和 AI 标签扫描快速撰写笔记",
    feat3_title: "品味分享社区", feat3_desc: "提供关注功能，与品味相投的用户分享",
    feat4_title: "享受当下", feat4_desc: "尽情享受您的美酒！登记为已饮用，稍后我们会提醒您撰写笔记。",
    feat5_title: "自由网页分享", feat5_desc: "在社交媒体和网页上自由分享你的笔记",
    feat6_title: "无广告纯净区", feat6_desc: "无产品推销和广告，专注管理您的感官体验",
    recent_prod_title: "最新收录产品", recent_prod_sub: "看看大家刚品尝了哪些特别的酒",
    recent_note_title: "最新笔记", recent_note_sub: "刚刚上传的生动品鉴记录",
    fetching_data: "正在同步最新条码数据...", promo_title: "手中的品鉴笔记，Barnote", promo_desc: "立即下载应用，留下你的专属记录。"
  },
  layout: { promo: { title: "从条码扫描开始的\n最快品鉴笔记", appStore: "App Store", playStore: "Google Play", comingSoon: "Coming Soon" } },
  user: {
    no_intro: "暂无简介。", note_count: "笔记", follower_count: "关注者", tab_notes: "已写笔记", tab_favorites: "收藏产品",
    no_notes_title: "没有撰写笔记", no_notes_desc: "该用户尚未撰写任何品鉴笔记。", no_fav_title: "没有收藏产品", no_fav_desc: "该用户还没有收藏任何产品。"
  },
  note: {
    detail_title: "笔记详情", not_found_title: "找不到笔记", not_found_desc: "请稍后重试。",
    public_scope_public: "公开", public_scope_private: "私密", tasting_note: "品鉴笔记", no_detail: "没有详细记录。",
    flavor: "风味感受", evaluation: "详细评价", feeling: "心情", basic_info: "基本信息", author: "作者", date: "日期"
  },
  policy: { ...en.policy, title: "隐私政策" },
  terms: { ...en.terms, title: "服务条款" }
};

const zhTW = {
  common: { app_name: "Barnote", back: "返回", loading: "載入中...", error: "發生錯誤。" },
  home: {
    hero_title1: "將每一杯美酒 ", hero_title2: "化作完美記錄", hero_subtitle: "最快最美觀的AI品鑑筆記，Barnote", hero_btn: "立即開始",
    counter_title: "Barnote 已收錄的產品數量", feat_title: "讓你專注記錄", feat_sub: "Barnote 提供的獨特體驗",
    feat1_title: "專屬品鑑筆記", feat1_desc: "創建並分享你的專屬品鑑筆記！",
    feat2_title: "AI 識別引擎", feat2_desc: "使用條碼識別和 AI 標籤掃描快速撰寫筆記",
    feat3_title: "品味分享社區", feat3_desc: "提供關注功能，與品味相投的用戶分享",
    feat4_title: "享受當下", feat4_desc: "盡情享受您的美酒！登記為已飲用，稍後我們會提醒您撰寫筆記。",
    feat5_title: "自由網頁分享", feat5_desc: "在社交媒體和網頁上自由分享你的筆記",
    feat6_title: "無廣告純淨區", feat6_desc: "無產品推銷和廣告，專注管理您的感官體驗",
    recent_prod_title: "最新收錄產品", recent_prod_sub: "看看大家剛品嘗了哪些特別的酒",
    recent_note_title: "最新筆記", recent_note_sub: "剛剛上傳的生動品鑑記錄",
    fetching_data: "正在同步最新條碼數據...", promo_title: "手中的品鑑筆記，Barnote", promo_desc: "立即下載應用，留下你的專屬記錄。"
  },
  layout: { promo: { title: "從條碼掃描開始的\n最快品鑑筆記", appStore: "App Store", playStore: "Google Play", comingSoon: "Coming Soon" } },
  user: {
    no_intro: "暫無簡介。", note_count: "筆記", follower_count: "關注者", tab_notes: "已寫筆記", tab_favorites: "收藏產品",
    no_notes_title: "沒有撰寫筆記", no_notes_desc: "該用戶尚未撰寫任何品鑑筆記。", no_fav_title: "沒有收藏產品", no_fav_desc: "該用戶還沒有收藏任何產品。"
  },
  note: {
    detail_title: "筆記詳情", not_found_title: "找不到筆記", not_found_desc: "請稍後重試。",
    public_scope_public: "公開", public_scope_private: "私密", tasting_note: "品鑑筆記", no_detail: "沒有詳細記錄。",
    flavor: "風味感受", evaluation: "詳細評價", feeling: "心情", basic_info: "基本信息", author: "作者", date: "日期"
  },
  policy: { ...zhCN.policy, title: "隱私政策" },
  terms: { ...zhCN.terms, title: "服務條款" }
};

const ja = {
  common: { app_name: "Barnote", back: "戻る", loading: "読み込み中...", error: "エラーが発生しました。" },
  home: {
    hero_title1: "すべてのグラスを ", hero_title2: "完璧な記録に", hero_subtitle: "最速で最も美しいAIテイスティングノート、Barnote", hero_btn: "今すぐ始める",
    counter_title: "Barnoteに登録されている製品数", feat_title: "記録に集中できるように", feat_sub: "Barnoteが提供する特別な体験",
    feat1_title: "あなた専用のノート", feat1_desc: "自分だけのテイスティングノートを作成して共有しましょう！",
    feat2_title: "AIスキャンエンジン", feat2_desc: "バーコード認識とAIラベルスキャンを使用した高速ノート作成",
    feat3_title: "好みを共有するコミュニティ", feat3_desc: "フォロー機能も提供、趣味が合うユーザーと共有しましょう",
    feat4_title: "瞬間を楽しんで", feat4_desc: "今はお酒を楽しんで！登録しておけば、後で通知でノート作成をサポートします。",
    feat5_title: "自由な共有", feat5_desc: "SNSやWebでテイスティングノートを自由に共有",
    feat6_title: "広告なしのクリーンゾーン", feat6_desc: "製品の販売や広告なしに、感覚的なノートだけを管理できます",
    recent_prod_title: "最近登録された製品", recent_prod_sub: "ユーザーがたった今味わった特別なお酒",
    recent_note_title: "最近投稿されたノート", recent_note_sub: "たった今アップロードされた鮮やかな記録",
    fetching_data: "データを同期中...", promo_title: "あなたの手の中のノート、Barnote", promo_desc: "今すぐアプリをダウンロードして、専用の記録を残しましょう。"
  },
  layout: { promo: { title: "バーコードスキャンで始まる\n最速のテイスティングノート", appStore: "App Store", playStore: "Google Play", comingSoon: "Coming Soon" } },
  user: {
    no_intro: "紹介文がありません。", note_count: "ノート", follower_count: "フォロワー", tab_notes: "作成したノート", tab_favorites: "お気に入り製品",
    no_notes_title: "ノートがありません", no_notes_desc: "このユーザーはまだノートを作成していません。", no_fav_title: "お気に入りがありません", no_fav_desc: "お気に入り製品はありません。"
  },
  note: {
    detail_title: "ノート詳細", not_found_title: "ノートが見つかりません", not_found_desc: "しばらくしてからもう一度お試しください。",
    public_scope_public: "全体公開", public_scope_private: "非公開", tasting_note: "テイスティングノート", no_detail: "詳細なノートが記録されていません。",
    flavor: "感じた香り・味わい", evaluation: "詳細評価", feeling: "感情", basic_info: "基本情報", author: "作成者", date: "作成日"
  },
  policy: { ...en.policy, title: "プライバシーポリシー" },
  terms: { ...en.terms, title: "利用規約" }
};

const fr = {
  common: { app_name: "Barnote", back: "Retour", loading: "Chargement...", error: "Une erreur s'est produite." },
  home: {
    hero_title1: "Transformez chaque verre en ", hero_title2: "un souvenir parfait", hero_subtitle: "La note de dégustation IA la plus rapide, Barnote", hero_btn: "Commencer",
    counter_title: "Produits enregistrés avec Barnote", feat_title: "Concentrez-vous sur vos notes", feat_sub: "L'expérience spéciale offerte par Barnote",
    feat1_title: "Vos propres notes", feat1_desc: "Créez et partagez vos notes !",
    feat2_title: "Moteur de numérisation IA", feat2_desc: "Notes rapides utilisant la reconnaissance IA",
    feat3_title: "Communauté de partage", feat3_desc: "Partagez avec des utilisateurs partageant vos goûts",
    feat4_title: "Profitez du moment", feat4_desc: "Enregistrez votre verre, nous vous rappellerons de noter plus tard.",
    feat5_title: "Partage web gratuit", feat5_desc: "Partagez librement vos notes sur les réseaux sociaux",
    feat6_title: "Zone sans publicité", feat6_desc: "Gérez vos notes sans publicité intrusive",
    recent_prod_title: "Produits récents", recent_prod_sub: "Découvrez les boissons récemment testées",
    recent_note_title: "Notes récentes", recent_note_sub: "Notes de dégustation récemment publiées",
    fetching_data: "Synchronisation des données...", promo_title: "Vos notes de dégustation, Barnote", promo_desc: "Téléchargez l'application maintenant."
  },
  layout: { promo: { title: "Les notes de dégustation\nles plus rapides", appStore: "App Store", playStore: "Google Play", comingSoon: "Coming Soon" } },
  user: {
    no_intro: "Aucune introduction fournie.", note_count: "Notes", follower_count: "Abonnés", tab_notes: "Notes Rédigées", tab_favorites: "Favoris",
    no_notes_title: "Aucune note", no_notes_desc: "Cet utilisateur n'a rédigé aucune note.", no_fav_title: "Aucun favori", no_fav_desc: "Cet utilisateur n'a aucun favori."
  },
  note: {
    detail_title: "Détail de la Note", not_found_title: "Note introuvable", not_found_desc: "Veuillez réessayer.",
    public_scope_public: "Public", public_scope_private: "Privé", tasting_note: "Note de Dégustation", no_detail: "Aucune note détaillée enregistrée.",
    flavor: "Saveurs", evaluation: "Évaluation", feeling: "Sentiment", basic_info: "Infos", author: "Auteur", date: "Date"
  },
  policy: { ...en.policy, title: "Politique de confidentialité" },
  terms: { ...en.terms, title: "Conditions d'utilisation" }
};

const de = {
  common: { app_name: "Barnote", back: "Zurück", loading: "Laden...", error: "Ein Fehler ist aufgetreten." },
  home: {
    hero_title1: "Mach jedes Glas zu ", hero_title2: "einer perfekten Erinnerung", hero_subtitle: "Die schnellste AI-Verkostungsnotiz, Barnote", hero_btn: "Jetzt Beginnen",
    counter_title: "Registrierte Produkte", feat_title: "Fokus auf deine Notizen", feat_sub: "Das besondere Barnote-Erlebnis",
    feat1_title: "Deine eigenen Notizen", feat1_desc: "Erstelle und teile sie!",
    feat2_title: "AI-Scan-Engine", feat2_desc: "Schnelle Notizen mit AI-Erkennung",
    feat3_title: "Teilen-Community", feat3_desc: "Folge und teile mit anderen",
    feat4_title: "Genieße den Moment", feat4_desc: "Genieße jetzt, wir erinnern dich später an die Notiz.",
    feat5_title: "Web-Sharing", feat5_desc: "Teile Notizen frei online",
    feat6_title: "Werbefrei", feat6_desc: "Keine Werbung, nur deine Notizen",
    recent_prod_title: "Kürzlich registriert", recent_prod_sub: "Entdecke neue Getränke",
    recent_note_title: "Aktuelle Notizen", recent_note_sub: "Frisch hochgeladene Verkostungen",
    fetching_data: "Daten synchronisieren...", promo_title: "Deine Notizen, Barnote", promo_desc: "Lade die App jetzt herunter."
  },
  layout: { promo: { title: "Die schnellsten Verkostungsnotizen\nmit Barcode-Scan", appStore: "App Store", playStore: "Google Play", comingSoon: "Coming Soon" } },
  user: {
    no_intro: "Keine Vorstellung.", note_count: "Notizen", follower_count: "Follower", tab_notes: "Verfasste Notizen", tab_favorites: "Favoriten",
    no_notes_title: "Keine Notizen", no_notes_desc: "Dieser Nutzer hat noch keine Notizen geschrieben.", no_fav_title: "Keine Favoriten", no_fav_desc: "Dieser Nutzer hat keine Favoriten."
  },
  note: {
    detail_title: "Notiz-Detail", not_found_title: "Nicht gefunden", not_found_desc: "Bitte versuche es erneut.",
    public_scope_public: "Öffentlich", public_scope_private: "Privat", tasting_note: "Verkostungsnotiz", no_detail: "Keine Detailnotiz vorhanden.",
    flavor: "Aromen", evaluation: "Bewertung", feeling: "Gefühl", basic_info: "Basis-Infos", author: "Autor", date: "Datum"
  },
  policy: { ...en.policy, title: "Datenschutzrichtlinie" },
  terms: { ...en.terms, title: "Nutzungsbedingungen" }
};

const es = {
  common: { app_name: "Barnote", back: "Atrás", loading: "Cargando...", error: "Ocurrió un error." },
  home: {
    hero_title1: "Convierte cada copa en ", hero_title2: "un recuerdo perfecto", hero_subtitle: "La nota de cata IA más rápida y hermosa", hero_btn: "Empezar Ahora",
    counter_title: "Productos registrados", feat_title: "Concéntrate en tus registros", feat_sub: "La experiencia especial de Barnote",
    feat1_title: "Tus propias notas", feat1_desc: "¡Crea y comparte tus notas!",
    feat2_title: "Motor de escaneo IA", feat2_desc: "Notas rápidas con reconocimiento IA",
    feat3_title: "Comunidad de degustación", feat3_desc: "Comparte con usuarios con gustos similares",
    feat4_title: "Disfruta el momento", feat4_desc: "¡Disfruta tu bebida, te recordaremos escribir después!",
    feat5_title: "Compartir libre en web", feat5_desc: "Comparte libremente en redes sociales",
    feat6_title: "Zona sin anuncios", feat6_desc: "Administra tus notas sin publicidad",
    recent_prod_title: "Productos recientes", recent_prod_sub: "Descubre las bebidas recién probadas",
    recent_note_title: "Notas recientes", recent_note_sub: "Registros recién subidos",
    fetching_data: "Sincronizando...", promo_title: "Tus notas en tu mano, Barnote", promo_desc: "Descarga la aplicación ahora."
  },
  layout: { promo: { title: "Las notas más rápidas\ncon un escáner", appStore: "App Store", playStore: "Google Play", comingSoon: "Coming Soon" } },
  user: {
    no_intro: "Sin introducción.", note_count: "Notas", follower_count: "Seguidores", tab_notes: "Notas Escritas", tab_favorites: "Favoritos",
    no_notes_title: "Sin notas", no_notes_desc: "Este usuario no tiene notas aún.", no_fav_title: "Sin favoritos", no_fav_desc: "Ningún producto favorito."
  },
  note: {
    detail_title: "Detalle de Nota", not_found_title: "Nota no encontrada", not_found_desc: "Inténtalo de nuevo.",
    public_scope_public: "Público", public_scope_private: "Privado", tasting_note: "Nota de Cata", no_detail: "No hay detalles registrados.",
    flavor: "Sabores", evaluation: "Evaluación", feeling: "Sentimiento", basic_info: "Info Básica", author: "Autor", date: "Fecha"
  },
  policy: { ...en.policy, title: "Política de Privacidad" },
  terms: { ...en.terms, title: "Términos de Servicio" }
};

const pt = {
  common: { app_name: "Barnote", back: "Voltar", loading: "Carregando...", error: "Ocorreu um erro." },
  home: {
    hero_title1: "Transforme cada taça em ", hero_title2: "uma memória perfeita", hero_subtitle: "A nota de degustação mais rápida, Barnote", hero_btn: "Começar Agora",
    counter_title: "Produtos registrados", feat_title: "Foque nos seus registros", feat_sub: "O que o Barnote proporciona",
    feat1_title: "Suas próprias notas", feat1_desc: "Crie e compartilhe suas notas!",
    feat2_title: "Motor de IA", feat2_desc: "Reconhecimento rápido de IA",
    feat3_title: "Comunidade", feat3_desc: "Compartilhe com quem tem gostos similares",
    feat4_title: "Aproveite o momento", feat4_desc: "Aproveite agora, lembre-se de anotar depois.",
    feat5_title: "Compartilhamento Web", feat5_desc: "Compartilhe notas livremente",
    feat6_title: "Sem Anúncios", feat6_desc: "Apenas as suas notas, sem poluição",
    recent_prod_title: "Produtos recentes", recent_prod_sub: "Confira as bebidas recentes",
    recent_note_title: "Notas recentes", recent_note_sub: "Registros de degustação recentes",
    fetching_data: "Sincronizando...", promo_title: "Suas notas na mão, Barnote", promo_desc: "Baixe o aplicativo agora."
  },
  layout: { promo: { title: "As notas mais rápidas\ncom um toque", appStore: "App Store", playStore: "Google Play", comingSoon: "Coming Soon" } },
  user: {
    no_intro: "Sem introdução.", note_count: "Notas", follower_count: "Seguidores", tab_notes: "Notas Escritas", tab_favorites: "Favoritos",
    no_notes_title: "Sem notas", no_notes_desc: "Usuário ainda não escreveu nada.", no_fav_title: "Sem favoritos", no_fav_desc: "Nenhum favorito."
  },
  note: {
    detail_title: "Detalhe da Nota", not_found_title: "Não encontrado", not_found_desc: "Tente novamente.",
    public_scope_public: "Público", public_scope_private: "Privado", tasting_note: "Nota de Degustação", no_detail: "Sem detalhes extras.",
    flavor: "Sabores", evaluation: "Avaliação", feeling: "Sentimento", basic_info: "Info", author: "Autor", date: "Data"
  },
  policy: { ...en.policy, title: "Política de Privacidade" },
  terms: { ...en.terms, title: "Termos de Serviço" }
};

const it = {
  common: { app_name: "Barnote", back: "Indietro", loading: "Caricamento...", error: "Errore." },
  home: {
    hero_title1: "Rendi ogni bicchiere ", hero_title2: "un ricordo perfetto", hero_subtitle: "Le note IA più veloci, Barnote", hero_btn: "Inizia Ora",
    counter_title: "Prodotti registrati", feat_title: "Concentrati sulle note", feat_sub: "L'esperienza speciale",
    feat1_title: "Le tue note", feat1_desc: "Crea e condividi note!",
    feat2_title: "Scansione IA", feat2_desc: "Riconoscimento IA veloce",
    feat3_title: "Community", feat3_desc: "Condividi con i tuoi amici",
    feat4_title: "Goditi il momento", feat4_desc: "Bevi ora, annota dopo.",
    feat5_title: "Condivisione Web", feat5_desc: "Condividi online le tue note",
    feat6_title: "Senza pubblicità", feat6_desc: "Ambiente pulito senza annunci",
    recent_prod_title: "Prodotti recenti", recent_prod_sub: "Scopri cosa bevono gli altri",
    recent_note_title: "Note recenti", recent_note_sub: "Nuove registrazioni caricate",
    fetching_data: "Sincronizzazione...", promo_title: "Le tue note libere, Barnote", promo_desc: "Scarica l'app ora."
  },
  layout: { promo: { title: "Le note più veloci\ncon lo scanner", appStore: "App Store", playStore: "Google Play", comingSoon: "Coming Soon" } },
  user: {
    no_intro: "Nessuna introduzione.", note_count: "Note", follower_count: "Follower", tab_notes: "Note Scritte", tab_favorites: "Preferiti",
    no_notes_title: "Nessuna nota", no_notes_desc: "L'utente non ha ancora note.", no_fav_title: "Nessun preferito", no_fav_desc: "Nessun prodotto preferito."
  },
  note: {
    detail_title: "Dettaglio", not_found_title: "Non trovato", not_found_desc: "Riprova.",
    public_scope_public: "Pubblico", public_scope_private: "Privato", tasting_note: "Nota di Degustazione", no_detail: "Nessun dettaglio extra.",
    flavor: "Sapori", evaluation: "Valutazione", feeling: "Sensazione", basic_info: "Info Base", author: "Autore", date: "Data"
  },
  policy: { ...en.policy, title: "Informativa sulla Privacy" },
  terms: { ...en.terms, title: "Termini di Servizio" }
};

const ru = {
  common: { app_name: "Barnote", back: "Назад", loading: "Загрузка...", error: "Произошла ошибка." },
  home: {
    hero_title1: "Превратите каждый бокал в ", hero_title2: "идеальное воспоминание", hero_subtitle: "Самое быстрое и красивое приложение ИИ для дегустаций", hero_btn: "Начать",
    counter_title: "Зарегистрированные продукты", feat_title: "Сосредоточьтесь на записях", feat_sub: "Особый опыт Barnote",
    feat1_title: "Ваши собственные заметки", feat1_desc: "Создавайте и делитесь заметками!",
    feat2_title: "ИИ-сканер", feat2_desc: "Быстрые записи с помощью распознавания штрихкодов",
    feat3_title: "Сообщество", feat3_desc: "Следите за единомышленниками",
    feat4_title: "Наслаждайтесь моментом", feat4_desc: "Оцените сейчас, напишите потом.",
    feat5_title: "Веб-поделиться", feat5_desc: "Свободно делитесь заметками",
    feat6_title: "Без рекламы", feat6_desc: "Никакой навязчивой рекламы",
    recent_prod_title: "Недавние продукты", recent_prod_sub: "Посмотрите, что пробовали другие",
    recent_note_title: "Недавние заметки", recent_note_sub: "Только что загруженные дегустации",
    fetching_data: "Синхронизация...", promo_title: "Ваши заметки в ваших руках, Barnote", promo_desc: "Скачайте приложение сейчас."
  },
  layout: { promo: { title: "Самые быстрые заметки\nсо сканером", appStore: "App Store", playStore: "Google Play", comingSoon: "Coming Soon" } },
  user: {
    no_intro: "Нет информации.", note_count: "Заметки", follower_count: "Подписчики", tab_notes: "Написанные", tab_favorites: "Избранное",
    no_notes_title: "Нет заметок", no_notes_desc: "Пользователь не оставил заметок.", no_fav_title: "Нет избранного", no_fav_desc: "Нет избранных продуктов."
  },
  note: {
    detail_title: "Детали Заметки", not_found_title: "Не найдено", not_found_desc: "Попробуйте позже.",
    public_scope_public: "Публичная", public_scope_private: "Приватная", tasting_note: "Дегустационная заметка", no_detail: "Нет подробностей.",
    flavor: "Вкусы", evaluation: "Оценка", feeling: "Ощущение", basic_info: "Информация", author: "Автор", date: "Дата"
  },
  policy: { ...en.policy, title: "Политика конфиденциальности" },
  terms: { ...en.terms, title: "Условия использования" }
};

const strings = { ko, en, 'zh-CN': zhCN, 'zh-TW': zhTW, ja, fr, de, es, pt, it, ru };

Object.entries(strings).forEach(([lang, data]) => {
  const dir = path.join(__dirname, '..', 'public', 'locales', lang);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'translation.json'), JSON.stringify(data, null, 2), 'utf-8');
});

console.log('✅ Generated 11 absolute translations across all UI components successfully.');
