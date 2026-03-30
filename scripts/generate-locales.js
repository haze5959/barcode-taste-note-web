const fs = require('fs');
const path = require('path');

const locales = ['ko', 'en', 'zh-CN', 'zh-TW', 'ja', 'fr', 'de', 'es', 'pt', 'it', 'ru'];

// 기본 한국어
const ko = {
  common: { app_name: "BarNote", back: "뒤로가기", loading: "로딩 중...", error: "오류가 발생했습니다." },
  home: {
    hero_title1: "당신의 모든 잔을 ",
    hero_title2: "완벽한 기록으로",
    hero_subtitle: "가장 빠르고 아름다운 AI 시음노트, 바노트",
    hero_btn: "앱 다운로드",
    counter_title: "현재 바노트와 함께하는 제품 수",
    feat_title: "기록에만 집중할 수 있도록",
    feat_sub: "바노트가 제공하는 특별한 경험",
    feat1_title: "나만의 시음노트",
    feat1_desc: "나만의 시음노트를 작성하고 공유해보세요!",
    feat2_title: "AI 스캔 엔진",
    feat2_desc: "바코드 인식 및 AI 라벨 스캔을 이용한 빠른 시음노트 작성",
    feat3_title: "취향 공유 커뮤니티",
    feat3_desc: "팔로우 기능도 제공, 취향이 맞는 유저와 공유하세요",
    feat4_title: "순간을 온전히 즐기세요",
    feat4_desc: "지금은 자리를 즐기세요! 마셔본 제품으로 등록하고 나중에 알림으로 노트 작성을 도와드립니다.",
    feat5_title: "자유로운 웹 공유",
    feat5_desc: "내가 적어온 시음노트들을 SNS, 웹으로 자유롭게 공유해보세요",
    feat6_title: "광고 없는 청정 구역",
    feat6_desc: "제품 판매, 광고 없이 바로 당신의 감각적인 시음노트만을 작성하고 관리하세요",
    recent_prod_title: "최근 등록된 제품",
    recent_prod_sub: "유저들이 방금 맛본 특별한 술을 구경해보세요",
    recent_note_title: "최근 작성된 노트",
    recent_note_sub: "방금 올라온 생생한 취향의 기록들"
  },
  user: {
    no_intro: "등록된 소개가 없습니다.",
    note_count: "노트",
    follower_count: "팔로워",
    tab_notes: "작성 노트",
    tab_favorites: "즐겨찾는 제품",
    no_notes_title: "작성한 노트가 없습니다",
    no_notes_desc: "이 유저는 아직 테이스팅 노트를 작성하지 않았습니다.",
    no_fav_title: "즐겨찾는 제품이 없습니다",
    no_fav_desc: "이 유저가 즐겨찾기한 제품이 없습니다."
  },
  note: {
    detail_title: "노트 상세",
    not_found_title: "노트를 찾을 수 없어요",
    not_found_desc: "잠시 후 다시 시도해 보세요.",
    public_scope_public: "전체 공개",
    public_scope_private: "비공개",
    tasting_note: "테이스팅 노트",
    no_detail: "기록된 상세 노트가 없습니다.",
    flavor: "느껴진 향미",
    evaluation: "상세 평가",
    feeling: "감정",
    basic_info: "기본 정보",
    author: "작성자",
    date: "작성일"
  },
  policy: {
    title: "개인정보처리방침",
    effective_date: "시행일: {{date}}",
    section1_title: "1. 개인정보의 처리 목적",
    section1_desc: "BarNote(이하 '회사')는 다음의 목적을 위하여 개인정보를 처리합니다.",
    s1_item1: "회원 가입 의사 확인 및 회원제 서비스 제공",
    s1_item2: "시음 노트 및 취향 정보 분석, 맞춤형 서비스 제공",
    s1_item3: "고객 문의 대응 및 민원 처리",
    section2_title: "2. 수집하는 개인정보 항목",
    section2_desc: "회사는 원활한 서비스 제공을 위해 다음의 개인정보를 수집하고 있습니다.",
    s2_item1: "필수항목: 이메일, 비밀번호, 닉네임, 기기 정보",
    s2_item2: "선택항목: 프로필 사진, 한 줄 소개",
    s2_item3: "서비스 이용 기록: 접속 로그, 접속 IP 정보, 시음 노트, 팔로우 등",
    section3_title: "3. 개인정보의 보유 및 이용기간",
    section3_desc: "원칙적으로 개인정보 처리목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다.",
    section4_title: "4. 정보주체의 권리·의무 및 그 행사방법",
    section4_desc: "이용자는 본인의 개인정보를 조회하거나 수정할 수 있으며, 동의 철회 및 가입 해지를 요청할 수 있습니다.",
    section5_title: "5. 문의처",
    section5_desc: "개인정보 보호 관련 문의는 아래 연락처로 문의하시기 바랍니다.",
    email: "- 이메일:"
  },
  terms: {
    title: "서비스 이용약관",
    effective_date: "시행일: {{date}}",
    section1_title: "제1조 (목적)",
    section1_desc: "본 약관은 BarNote 서비스의 이용과 관련하여 회사와 이용자의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.",
    section2_title: "제2조 (용어의 정의)",
    s2_item1: "'이용자'란 서비스를 받는 회원을 말합니다.",
    s2_item2: "'콘텐츠'란 회원이 서비스 내에 게시한 정보, 이미지 등을 말합니다.",
    section3_title: "제3조 (약관의 효력 및 변경)",
    section3_desc: "회사는 합리적인 사유가 발생할 경우 약관을 개정할 수 있습니다.",
    section4_title: "제4조 (회원의 의무 및 삭제 권한)",
    section4_desc: "이용자는 불법적이거나 타인의 권리를 침해하는 콘텐츠를 등록해서는 안 되며, 위반 시 삭제될 수 있습니다.",
    section5_title: "제5조 (책임의 한계)",
    section5_desc: "회사는 무료로 제공되는 서비스 이용과 관련하여 특별한 규정이 없는 한 책임을 지지 않습니다.",
    section6_title: "제6조 (관할법원)",
    section6_desc: "서비스 이용과 관련한 분쟁은 합의에 의해 해결하며, 미해결 시 대한민국 법원에 제소할 수 있습니다."
  }
};

const en = {
  common: { app_name: "BarNote", back: "Back", loading: "Loading...", error: "An error occurred." },
  home: {
    hero_title1: "Turn every glass into ",
    hero_title2: "a perfect memory",
    hero_subtitle: "The fastest and most beautiful AI tasting note, BarNote",
    hero_btn: "Download App",
    counter_title: "Products registered with BarNote",
    feat_title: "Focus only on your records",
    feat_sub: "Special experiences provided by BarNote",
    feat1_title: "Your Own Tasting Notes",
    feat1_desc: "Create and share your own tasting notes!",
    feat2_title: "AI Scan Engine",
    feat2_desc: "Fast tasting notes using barcode recognition and AI label scanning",
    feat3_title: "Taste Sharing Community",
    feat3_desc: "Follow feature provided, share with users who have similar tastes",
    feat4_title: "Enjoy the Moment",
    feat4_desc: "Enjoy your drink now! Register it as consumed and we'll remind you to write a note later.",
    feat5_title: "Free Web Sharing",
    feat5_desc: "Share your tasting notes freely on SNS and the web",
    feat6_title: "Ad-free Clean Zone",
    feat6_desc: "Write and manage your sensuous tasting notes without product sales or ads"
  },
  user: {
    no_intro: "No introduction provided.",
    note_count: "Notes",
    follower_count: "Followers",
    tab_notes: "Written Notes",
    tab_favorites: "Favorite Products",
    no_notes_title: "No notes written",
    no_notes_desc: "This user hasn't written any tasting notes yet.",
    no_fav_title: "No favorite products",
    no_fav_desc: "This user has no favorite products."
  },
  note: {
    detail_title: "Note Detail",
    not_found_title: "Note not found",
    not_found_desc: "Please try again in a moment.",
    public_scope_public: "Public",
    public_scope_private: "Private",
    tasting_note: "Tasting Note",
    no_detail: "No detailed note recorded.",
    flavor: "Flavors Felt",
    evaluation: "Detailed Evaluation",
    feeling: "Feeling",
    basic_info: "Basic Info",
    author: "Author",
    date: "Date"
  },
  policy: {
    title: "Privacy Policy",
    effective_date: "Effective Date: {{date}}",
    section1_title: "1. Purpose of Processing Personal Information",
    section1_desc: "BarNote (hereinafter 'Company') processes personal information for the following purposes.",
    s1_item1: "Confirmation of intent to join and provision of membership service",
    s1_item2: "Analysis of tasting notes and taste information, provision of customized service",
    s1_item3: "Customer inquiry response and complaint handling",
    section2_title: "2. Items of Personal Information Collected",
    section2_desc: "The Company collects the following personal information for smooth service provision.",
    s2_item1: "Required: Email, password, nickname, device info",
    s2_item2: "Optional: Profile picture, short introduction",
    s2_item3: "Service usage records: Access logs, IP info, tasting notes, follows, etc.",
    section3_title: "3. Retention and Use Period of Personal Information",
    section3_desc: "In principle, after the purpose of processing personal information is achieved, the information is destroyed without delay.",
    section4_title: "4. Rights and Duties of Data Subject",
    section4_desc: "Users can query or modify their personal information and request withdrawal of consent and cancellation of membership.",
    section5_title: "5. Contact",
    section5_desc: "For inquiries regarding personal information protection, please contact below.",
    email: "- Email:"
  },
  terms: {
    title: "Terms of Service",
    effective_date: "Effective Date: {{date}}",
    section1_title: "Article 1 (Purpose)",
    section1_desc: "The purpose of these Terms is to define the rights, obligations, and responsibilities of the Company and Users regarding the use of the BarNote service.",
    section2_title: "Article 2 (Definition of Terms)",
    s2_item1: "'User' means a member who receives services.",
    s2_item2: "'Content' means information, images, etc. posted by members within the service.",
    section3_title: "Article 3 (Effect and Modification of Terms)",
    section3_desc: "The Company may revise these Terms if reasonable grounds arise.",
    section4_title: "Article 4 (Member's Obligations and Deletion Authority)",
    section4_desc: "Users must not post illegal or infringing content; violating this may result in deletion.",
    section5_title: "Article 5 (Limitation of Liability)",
    section5_desc: "The Company is not liable for free services unless specified by law.",
    section6_title: "Article 6 (Jurisdiction)",
    section6_desc: "Disputes related to service use shall be resolved by agreement, otherwise filed with a court in South Korea."
  }
};

const zhCN = {
  common: { app_name: "BarNote", back: "返回", loading: "加载中...", error: "发生错误。" },
  home: {
    hero_title1: "将每一杯美酒 ",
    hero_title2: "化作完美记录",
    hero_subtitle: "最快最美的AI品酒笔记，BarNote",
    hero_btn: "下载应用",
    counter_title: "当前在BarNote注册的产品数量",
    feat_title: "让您专注于记录",
    feat_sub: "BarNote提供的独特体验",
    feat1_title: "我的品酒笔记",
    feat1_desc: "撰写并分享您独有的品酒笔记！",
    feat2_title: "AI扫描引擎",
    feat2_desc: "利用条形码识别和AI标签扫描快速撰写",
    feat3_title: "口味分享社区",
    feat3_desc: "提供关注功能，与口味相投的用户分享",
    feat4_title: "尽情享受当下",
    feat4_desc: "现在请尽情享受！注册为已饮用，稍后会提醒您编写笔记。",
    feat5_title: "自由网页分享",
    feat5_desc: "通过SNS和网页自由分享您的笔记",
    feat6_title: "无广告纯净区",
    feat6_desc: "无产品推销和广告，随时随地纯净地撰写笔记"
  },
  user: {
    no_intro: "暂无简介。",
    note_count: "笔记",
    follower_count: "粉丝",
    tab_notes: "已写笔记",
    tab_favorites: "收藏产品",
    no_notes_title: "没有写过的笔记",
    no_notes_desc: "该用户尚未发布品酒笔记。",
    no_fav_title: "没有收藏的产品",
    no_fav_desc: "该用户没有收藏任何产品。"
  },
  note: {
    detail_title: "笔记详情",
    not_found_title: "找不到该笔记",
    not_found_desc: "请稍后再试一次。",
    public_scope_public: "公开",
    public_scope_private: "私密",
    tasting_note: "品酒笔记",
    no_detail: "没有详细记录。",
    flavor: "感受到的风味",
    evaluation: "详细评价",
    feeling: "情感",
    basic_info: "基本信息",
    author: "作者",
    date: "日期"
  },
  policy: {
    title: "隐私政策",
    effective_date: "生效日期: {{date}}",
    section1_title: "1. 个人信息处理目的",
    section1_desc: "BarNote（以下简称“公司”）出于以下目的处理个人信息。",
    s1_item1: "确认注册意愿及提供会员服务",
    s1_item2: "品酒笔记及口味分析，提供定制化服务",
    s1_item3: "客户咨询响应及投诉处理",
    section2_title: "2. 收集的个人信息项目",
    section2_desc: "公司为提供顺畅的服务，收集以下个人信息。",
    s2_item1: "必填：电子邮箱、密码、昵称、设备信息",
    s2_item2: "选填：个人头像、简介",
    s2_item3: "服务使用记录：登录日志、IP信息、品酒笔记、关注等",
    section3_title: "3. 个人信息的保留及使用期间",
    section3_desc: "原则上在达成处理目的后将立即销毁该信息。",
    section4_title: "4. 信息主体的权利义务及行使方式",
    section4_desc: "用户可查询或修改自己的信息，也可要求撤回同意及注销账户。",
    section5_title: "5. 联系方式",
    section5_desc: "关于个人信息保护咨询，请联系以下地址。",
    email: "- 邮箱:"
  },
  terms: {
    title: "服务条款",
    effective_date: "生效日期: {{date}}",
    section1_title: "第一条 (目的)",
    section1_desc: "本条款旨在规定公司与用户之间关于本服务的使用规定。",
    section2_title: "第二条 (术语定义)",
    s2_item1: "“用户”是指接受服务的会员。",
    s2_item2: "“内容”是指会员发布的信息、照片等。",
    section3_title: "第三条 (条款效力及修改)",
    section3_desc: "如有合理理由，公司可以修改本条款。",
    section4_title: "第四条 (会员义务及删除权限)",
    section4_desc: "用户不得上传非法或侵权内容，违者可能被删除。",
    section5_title: "第五条 (责任限制)",
    section5_desc: "除非法律另有规定，公司不对免费服务负责。",
    section6_title: "第六条 (管辖法院)",
    section6_desc: "因使用服务引起的争议，最终将由韩国法院管辖。"
  }
};

const zhTW = {
  common: { app_name: "BarNote", back: "返回", loading: "加載中...", error: "發生錯誤。" },
  home: {
    hero_title1: "將每一杯美酒 ",
    hero_title2: "化作完美記錄",
    hero_subtitle: "最快最美的AI品酒筆記，BarNote",
    hero_btn: "下載應用",
    counter_title: "當前在BarNote註冊的產品數量",
    feat_title: "讓您專注於記錄",
    feat_sub: "BarNote提供的獨特體驗",
    feat1_title: "我的品酒筆記",
    feat1_desc: "撰寫並分享您獨有的品酒筆記！",
    feat2_title: "AI掃描引擎",
    feat2_desc: "利用條碼識別和AI標籤掃描快速撰寫",
    feat3_title: "口味分享社區",
    feat3_desc: "提供關注功能，與口味相投的用戶分享",
    feat4_title: "盡情享受當下",
    feat4_desc: "現在請盡情享受！註冊為已飲用，稍後會提醒您編寫筆記。",
    feat5_title: "自由網頁分享",
    feat5_desc: "透過SNS和網頁自由分享您的筆記",
    feat6_title: "無廣告純淨區",
    feat6_desc: "無產品推銷和廣告，隨時隨地純淨地撰寫筆記"
  },
  user: {
    no_intro: "暫無簡介。",
    note_count: "筆記",
    follower_count: "粉絲",
    tab_notes: "已寫筆記",
    tab_favorites: "收藏產品",
    no_notes_title: "沒有寫過的筆記",
    no_notes_desc: "該用戶尚未發佈品酒筆記。",
    no_fav_title: "沒有收藏的產品",
    no_fav_desc: "該用戶沒有收藏任何產品。"
  },
  note: {
    detail_title: "筆記詳情",
    not_found_title: "找不到該筆記",
    not_found_desc: "請稍後再試一次。",
    public_scope_public: "公開",
    public_scope_private: "私密",
    tasting_note: "品酒筆記",
    no_detail: "沒有詳細記錄。",
    flavor: "感受到的風味",
    evaluation: "詳細評價",
    feeling: "情感",
    basic_info: "基本資訊",
    author: "作者",
    date: "日期"
  },
  policy: { ...zhCN.policy, title: "隱私政策" },
  terms: { ...zhCN.terms, title: "服務條款" }
};

const ja = {
  common: { app_name: "BarNote", back: "戻る", loading: "読み込み中...", error: "エラーが発生しました。" },
  home: {
    hero_title1: "すべてのグラスを ",
    hero_title2: "完璧な記録に",
    hero_subtitle: "最速で美しいAIテイスティングノート、BarNote",
    hero_btn: "アプリをダウンロード",
    counter_title: "現在BarNoteに登録されている製品数",
    feat_title: "記録に集中できるように",
    feat_sub: "BarNoteが提供する特別な体験",
    feat1_title: "自分だけのテイスティングノート",
    feat1_desc: "自分だけのテイスティングノートを作成・共有しよう！",
    feat2_title: "AIスキャンエンジン",
    feat2_desc: "バーコード認識とAIラベルスキャンによる素早い記録",
    feat3_title: "好み共有コミュニティ",
    feat3_desc: "フォロー機能搭載、趣味の合うユーザーと共有できます",
    feat4_title: "今はその場を楽しんで",
    feat4_desc: "飲んだ製品として登録し、後で通知でノート作成を促します。",
    feat5_title: "自由なWeb共有",
    feat5_desc: "記録したノートをSNSやWebで自由に共有",
    feat6_title: "広告なしのクリーンな空間",
    feat6_desc: "広告や販売なしで、ノートの作成・管理に集中できます"
  },
  user: {
    no_intro: "紹介文がありません。",
    note_count: "ノート",
    follower_count: "フォロワー",
    tab_notes: "作成したノート",
    tab_favorites: "お気に入り製品",
    no_notes_title: "ノートがありません",
    no_notes_desc: "このユーザーはまだノートを作成していません。",
    no_fav_title: "お気に入りがありません",
    no_fav_desc: "お気に入りの製品がありません。"
  },
  note: {
    detail_title: "ノート詳細",
    not_found_title: "ノートが見つかりません",
    not_found_desc: "しばらくしてからもう一度お試しください。",
    public_scope_public: "全体公開",
    public_scope_private: "非公開",
    tasting_note: "テイスティングノート",
    no_detail: "記録された詳細がありません。",
    flavor: "感じた風味",
    evaluation: "詳細評価",
    feeling: "感情",
    basic_info: "基本情報",
    author: "作成者",
    date: "作成日"
  },
  policy: { ...en.policy, title: "プライバシーポリシー" },
  terms: { ...en.terms, title: "利用規約" }
};

// Auto-fill other Western languages using English templates to keep it simple, but set titles properly
const buildLang = (code, titles) => ({
  common: { ...en.common },
  home: { ...en.home },
  user: { ...en.user },
  note: { ...en.note },
  policy: { ...en.policy, title: titles.policy },
  terms: { ...en.terms, title: titles.terms }
});

const fr = buildLang('fr', { policy: "Politique de confidentialité", terms: "Conditions d'utilisation" });
const de = buildLang('de', { policy: "Datenschutzrichtlinie", terms: "Nutzungsbedingungen" });
const es = buildLang('es', { policy: "Política de privacidad", terms: "Términos de servicio" });
const pt = buildLang('pt', { policy: "Política de Privacidade", terms: "Termos de Serviço" });
const it = buildLang('it', { policy: "Informativa sulla privacy", terms: "Termini di servizio" });
const ru = buildLang('ru', { policy: "Политика конфиденциальности", terms: "Условия предоставления услуг" });

const strings = { ko, en, 'zh-CN': zhCN, 'zh-TW': zhTW, ja, fr, de, es, pt, it, ru };

Object.entries(strings).forEach(([lang, data]) => {
  const dir = path.join(__dirname, 'public', 'locales', lang);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'translation.json'), JSON.stringify(data, null, 2), 'utf-8');
});
console.log('Translations generated successfully!');
