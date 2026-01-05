import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ReviewList from './pages/reviews/ReviewList';
import ReviewDetail from './pages/reviews/ReviewDetail';
import ReviewForm from './pages/reviews/ReviewForm';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 목록 조회 */}
        <Route path="/companies/:companyId/review" element={<ReviewList />} />
        {/* 새 후기 작성 */}
        <Route path="/companies/:companyId/review/new" element={<ReviewForm mode="create" />} />
        {/* 상세 조회 */}
        <Route path="/companies/:companyId/review/:reviewId" element={<ReviewDetail />} />
        {/* 수정 및 삭제 */}
        <Route path="/companies/:companyId/review/:reviewId/edit" element={<ReviewForm mode="edit" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;