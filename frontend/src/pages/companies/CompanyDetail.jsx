import React from 'react';
import { fetchCompany } from '../../api/companyApi';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router';
import CompanyDetailAnalysis from "../../components/companies/CompanyDetailAnalysis";
import CompanyDetailReview from '../../components/companies/CompanyDetailReview';
import ErrorMessage from '../../components/common/ErrorMessage';
import Loader from '../../components/common/Loader';
import { Box, Button, Paper } from '@mui/material';
import { useState } from 'react';
import { fetchAnalysis } from '../../api/companyAnalysisApi';
import CompanyDetailButtons from '../../components/companies/CompanyDetailButtons';


//기업정보 상세조회, 삭제
function CompanyDetail() {

    const { companyId: companyIdParam } = useParams();
    const companyId = Number(companyIdParam);
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { detailId: detailIdParam } = useParams();
    const detailId = Number(detailIdParam);
    const [tab, setTab] = useState("analysis");

    // TanStack Query=============
    // 1. 상세 내용 조회
    const { data: company, isLoading, isError, error } = useQuery({
        queryKey: ['company', companyId],
        queryFn: () => fetchCompany(companyId),
        enabled: !!companyId
    });

    /*
    // 2. 삭제 
    const deleteMutation = useMutation({
        mutationFn: () => deleteCompany(companyId),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey:['companies']});
            navigate('/companies');
            
        },
        onError: () => {
            alert('기업 정보 삭제에 실패했습니다.');
        }
    });
    */

    // 기업 분석 목록 조회
    const { data: analysisList = [], isLoading: isAnalysisLoading, isError: isAnalysisError } = useQuery({
        queryKey: ['analysis', companyId],
        queryFn: () => fetchAnalysis(companyId),
        enabled: !!companyId
    });

    if (isLoading) return <Loader />;
    if (isError) return <ErrorMessage error={error} />
    if (!company) return <Loader />;

    const { review } = company;

    return (
        <Box sx={{ m: 3 }}>
            <Box sx={{ justifyContent: "center", display: "flex", gap: 2, mb: 2 }}>
                <CompanyDetailButtons tab={tab} setTab={setTab} />
            </Box >

            <Paper sx={{
                borderRadius: 4,
                p: "20px 20px 35px 20px",
                bgcolor: 'background.box'
            }}>
                {/* 기업 분석 테이블 */}
                {tab === "analysis" ? (
                    <CompanyDetailAnalysis
                        companyId={companyId}
                        detail={analysisList}
                        isLoading={isAnalysisLoading}
                        isError={isAnalysisError}
                    />

                ) : (
                    <CompanyDetailReview
                        companyId={companyId}
                        review={review}
                        isLoading={isLoading}
                        isError={isError}
                    />
                )}
            </Paper>


        </Box>
    );
}

export default CompanyDetail;