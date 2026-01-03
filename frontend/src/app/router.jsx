import { createBrowserRouter, Navigate } from 'react-router-dom';
import AppLayout from '../layouts/AppLayout';
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import CompanyList from '../pages/companies/CompanyList';
import CompanyDetail from '../pages/companies/CompanyDetail';
import MyPage from '../pages/mypage/MyPage';
import MyPageEdit from '../pages/mypage/MyPageEdit';
import AnalysisDetail from '../pages/analysis/AnalysisDetail';
import ReviewDetail from '../pages/review/ReviewDetail';
import AnalysisForm from '../pages/analysis/AnalysisForm';
import ReviewNew from '../pages/review/ReviewNew';
import ReviewEdit from '../pages/review/ReviewEdit';
import CompanyForm from '../pages/companies/CompanyForm';
import AnalysisForm from '../pages/analysis/AnalysisForm';

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
                    { path: ':companyId', element: <CompanyDetail /> }, // 기업 상세 조회 화면 

                    // 2-1. 기업 분석 (Detail)
                    {
                        path: ':companyId/detail',
                        children: [
                            { path: 'new', element: <AnalysisForm /> }, // 분석 등록 화면, 수정 화면 == AnalysisForm 컴포넌트가 mode를 props로 받아 create면 새 글 작성
                            { path: ':detailId', element: <AnalysisDetail /> }, // 분석 조회 (작성자/비작성자 공통)
                        ]
                    },

                    // 2-2. 기업 후기 (Review)
                    {
                        path: ':companyId/review',
                        children: [
                            { path: 'new', element: <ReviewNew /> }, // 후기 작성
                            { path: ':reviewId', element: <ReviewDetail /> }, // 후기 조회 (작성자/비작성자 공통)
                            { path: ':reviewId/edit', element: <ReviewEdit /> }, // 후기 수정
                        ]
                    }
                ]
            },

            // 3. 마이페이지
            {
                path: 'mypage/:userId',
                children: [
                    { index: true, element: <MyPage /> }, // 마이 페이지 
                    { path: 'edit', element: <MyPageEdit /> }, // 개인정보 수정
                ]
            },
        ]
    }
]);
