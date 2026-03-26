import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AnalyticsTracker } from './components/AnalyticsTracker';
import MobileLayout from './components/layout/MobileLayout';
import Home from './pages/Home';
import UserNoteList from './pages/UserNoteList';
import NoteDetail from './pages/NoteDetail';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';

function App() {
  return (
    <BrowserRouter>
      <AnalyticsTracker />
      <Routes>
        {/* 반응형 레이아웃 (PC & 모바일) */}
        <Route path="/" element={<Home />} />
        <Route path="/index.html" element={<Navigate to="/" replace />} />
        
        {/* 모바일 앱 전용 레이아웃 */}
        <Route element={<MobileLayout />}>
          <Route path="/user/:userId" element={<UserNoteList />} />
          <Route path="/note/:noteId" element={<NoteDetail />} />
          <Route path="/privacy_policy" element={<PrivacyPolicy />} />
          <Route path="/terms_of_service" element={<TermsOfService />} />
        </Route>
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
