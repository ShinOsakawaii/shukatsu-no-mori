import { createBrowserRouter, Navigate } from 'react-router';
import AppLayout from '../layouts/AppLayout';
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import CompanyList from '../pages/companies/CompanyList';
import CompanyContent from '../pages/companies/CompanyDetail';
import MyPage from '../pages/mypage/MyPage';
import MyPageEdit from '../pages/mypage/MyPageEdit';
import AnalysisDetail from '../pages/analysis/AnalysisDetail';
import ReviewDetail from '../pages/review/ReviewDetail';
import CompanyForm from '../pages/companies/CompanyForm';
import AnalysisForm from '../pages/analysis/AnalysisForm';
import ReviewForm from '../pages/review/ReviewForm';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout />,
        children: [
            // 1. 메인 및 인증
            { index: true, element: <Navigate to="/companies" replace /> }, // 루트 접속 시 메인으로 이동
            { path: 'companies', element: <CompanyList /> }, // 메인 페이지
            { path: 'auth/login', element: <LoginPage /> },
            { path: 'auth/register', element: <RegisterPage /> },

            // 2. 기업 관련
            {
                path: 'companies',
                children: [
                    { path: 'new', element: <CompanyForm mode="create" /> }, // 기업 등록 화면, 기업 등록 수정 화면 == CompanyForm 컴포넌트가 mode를 props로 받아 create면 새 글 작성
                    { path: ':companyId', element: <CompanyContent /> }, // 기업 상세 조회 화면 

                    // 2-1. 기업 분석 (Detail)
                    {
                        path: ':companyId/detail',
                        children: [
                            { path: 'new', element: <AnalysisForm mode="create" /> }, // 분석 등록 화면, 수정 화면 == AnalysisForm 컴포넌트가 mode를 props로 받아 create면 새 글 작성
                            { path: ':detailId', element: <AnalysisDetail /> }, // 분석 조회 (작성자/비작성자 공통)
                        ]
                    },

                    // 2-2. 기업 후기 (Review)
                    {
                        path: ':companyId/review',
                        children: [
                            { path: 'new', element: <ReviewForm mode="create" /> }, // 후기 등록 화면, 수정 화면 == ReviewForm 컴포넌트가 mode를 props로 받아 create면 새 글 작성
                            { path: ':reviewId', element: <ReviewDetail /> }, // 후기 조회 (작성자/비작성자 공통)
                        ]
                    }
                ]
            },

            // 3. 마이페이지 (유저아이디로 하는 거 없앴다고 해서 수정했습니다)
            {
                path: 'mypage',
                children: [
                    { index: true, element: <MyPage /> }, // 마이 페이지
                    { path: 'edit', element: <MyPageEdit /> }, // 개인정보 수정
                ]
            }

        ]
    }
]);
