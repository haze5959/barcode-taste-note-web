import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MobileLayout from './components/layout/MobileLayout';
import Home from './pages/Home';
import UserNoteList from './pages/UserNoteList';
import NoteDetail from './pages/NoteDetail';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MobileLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/index.html" element={<Navigate to="/" replace />} />
          <Route path="/user/:userId" element={<UserNoteList />} />
          <Route path="/note/:noteId" element={<NoteDetail />} />
          <Route path="/privacy_policy" element={<PrivacyPolicy />} />
          <Route path="/terms_of_service" element={<TermsOfService />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
