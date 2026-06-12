import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import './lib/i18n'
import './lib/firebase'
import App from './App.tsx'

// 크롤러용 정적 메타태그(index.html) 제거 — 이후 SEO 컴포넌트(react-helmet)가 동적 값을 넣는다.
// JS를 실행하지 않는 크롤러는 이 코드가 돌지 않으므로 정적 태그를 그대로 읽는다.
document.querySelectorAll('[data-static-seo]').forEach((el) => el.remove())

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>,
)
