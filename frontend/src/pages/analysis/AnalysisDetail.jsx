import React, { useState } from "react";
import { Box, Paper, Typography } from "@mui/material";
import { useParams, useNavigate } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchAnalysisDetail, deleteAnalysis } from "../../api/companyAnalysisApi";
import Loader from "../../components/common/Loader";
import ErrorMessage from "../../components/common/ErrorMessage";
import AnalysisDetailHeader from "../../components/analysis/AnalysisDetailHeader";
import AnalysisDetailContent from "../../components/analysis/AnalysisDetailContent";
import AnalysisDetailButtons from "../../components/analysis/AnalysisDetailButtons";
import { useMe } from "../../hooks/useMe";

export default function AnalysisDetail() {

    const { companyId: companyIdParam } = useParams();
    const companyId = Number(companyIdParam);
    const { detailId: detailIdParam } = useParams();
    const analysisId = Number(detailIdParam);

    if (!companyId || !analysisId) {
        return <ErrorMessage error={{ message: "잘못된 접근입니다. " }} />;
    }

    // TanStack Query============
    // 상세 데이터 조회
    const { data: analysis, isLoading, isError, error } = useQuery({
        queryKey: ["companyDetail", companyId, analysisId],
        queryFn: () => fetchAnalysisDetail(companyId, analysisId),
        enabled: !!companyId && !!analysisId
    });

    if (isLoading) return <Loader />;
    if (isError || !analysis) return <ErrorMessage error={error} />;

    const { data: me } = useMe();
    const isAuthor = me && analysis.userId === me.id;

    // // 테스트용 더미 유저 데이터
    // const dummyUser = {
    //     userId: 1
    // };

    // // 테스트용 더미 데이터
    // const dummyAnalysis = {
    //     detailId: 1,
    //     userId: 1,
    //     title: "스타트업 분석",
    //     position: "개발",
    //     content: "이 회사는 AI 기술을 중심으로 서비스를 운영하고 있습니다.",
    //     nickname: "홍길동",
    //     createdDate: "2026-01-06T01:00:00",
    //     updatedDate: "2026-01-06T02:00:00"
    //  };

    // const isAuthor = dummyUser.userId === dummyAnalysis.userId;

    return (
        <Box sx={{ backgroundColor: '#f6f1dc', minHeight: '100vh', py: 6 }}>
            {/* 상단 제목 */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 6 }}>
                <Typography
                    sx={{
                        width: 340,
                        height: 48,
                        backgroundColor: '#A98467',
                        color: '#F0EAD2',
                        borderRadius: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '16px',
                        fontWeight: 500,
                        boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                    }}
                >
                    기업 분석
                </Typography>
            </Box>

            <Paper elevation={0}
                sx={{
                    maxWidth: 900,
                    mx: 'auto',
                    p: 5,
                    borderRadius: 6,
                    backgroundColor: '#e4efc3',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                }}>
                <AnalysisDetailHeader analysis={analysis} />
                <AnalysisDetailContent analysis={analysis} />
                {/* <AnalysisDetailButtons onBack={() => navigate(`/companies/${companyId}/detail/`)}  */}
                <AnalysisDetailButtons isAuthor={isAuthor} />
            </Paper>
        </Box>

    );
}
