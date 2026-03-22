import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MobileLayout from './components/layout/MobileLayout';
import Home from './pages/Home';
import UserNoteList from './pages/UserNoteList';
import NoteDetail from './pages/NoteDetail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MobileLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/user/:userId" element={<UserNoteList />} />
          <Route path="/note/:noteId" element={<NoteDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
