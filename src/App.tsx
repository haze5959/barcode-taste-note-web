import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 페이지 라우트는 추후 각 페이지 컴포넌트 생성 후 추가 */}
        <Route path="/" element={<div>Barnote Web</div>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
