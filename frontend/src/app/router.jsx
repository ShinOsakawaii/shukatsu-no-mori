import { createBrowserRouter, Navigate } from 'react-router-dom';
import AppLayout from '../layouts/AppLayout';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout />,
        children: [
            // 1. 메인 및 인증
            { index: true, element: <Navigate to="/companies" replace /> }, // 루트 접속 시 메인으로 이동
            { path: 'companies', element: <HomePage /> }, // 메인 페이지
            { path: 'login', element: <LoginPage /> },
            { path: 'signup', element: <SignupPage /> },

            // 2. 기업 관련
            {
                path: 'companies',
                children: [
                    { path: 'new', element: <CompanyCreatePage /> }, // 기업 등록
                    { path: ':companyId', element: <CompanyDetailPage /> }, // 기업 상세
                    { path: ':companyId/edit', element: <CompanyEditPage /> }, // 기업 수정

                    // 2-1. 기업 분석 (Detail)
                    {
                        path: ':companyId/detail',
                        children: [
                            { path: 'new', element: <AnalysisCreatePage /> }, // 분석 작성
                            { path: ':detailId', element: <AnalysisDetailPage /> }, // 분석 조회 (작성자/비작성자 공통)
                            { path: ':detailId/edit', element: <AnalysisEditPage /> }, // 분석 수정
                        ]
                    },

                    // 2-2. 기업 후기 (Review)
                    {
                        path: ':companyId/review',
                        children: [
                            { path: 'new', element: <ReviewCreatePage /> }, // 후기 작성
                            { path: ':reviewId', element: <ReviewDetailPage /> }, // 후기 조회 (작성자/비작성자 공통)
                            { path: ':reviewId/edit', element: <ReviewEditPage /> }, // 후기 수정
                        ]
                    }
                ]
            },

            // 3. 마이페이지
            {
                path: 'mypage/:userId',
                children: [
                    { index: true, element: <MyPage /> },
                    { path: 'edit', element: <MyPageEdit /> }, // 개인정보 수정
                ]
            },
        ]
    }
]);
