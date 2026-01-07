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

    const { data: me } = useMe();

    const { companyId: companyIdParam } = useParams();
    const companyId = Number(companyIdParam);
    const { detailId: detailIdParam } = useParams();
    const analysisId = Number(detailIdParam);

    // TanStack Query============
    // 상세 데이터 조회
    const { data: analysis, isLoading, isError, error } = useQuery({
        queryKey: ['analysis', companyId, analysisId],
        queryFn: () => fetchAnalysisDetail(companyId, analysisId),
        enabled: !!companyId && !!analysisId
    });

    if (!companyId || !analysisId) {
        return <ErrorMessage error={{ message: "잘못된 접근입니다." }} />;
    }

    if (isLoading) return <Loader />;
    if (isError || !analysis) return <ErrorMessage error={error} />;

    const isAuthor = me && analysis && Number(analysis.userId) === Number(me.userId);

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
                <AnalysisDetailButtons isAuthor={isAuthor} analysisId={analysisId} />
            </Paper>
        </Box>

    );
}
