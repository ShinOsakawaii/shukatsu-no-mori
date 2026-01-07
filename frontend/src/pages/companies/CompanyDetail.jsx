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


    if (isLoading) return <Loader />;
    if (isError) return <ErrorMessage error={error} />
    if (!company) return <Loader />;

    const { detail, review } = company;
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


    return (
        <Box sx={{ m: 3 }}>
            <Box sx={{ justifyContent: "center", display: "flex", gap: 2, mb: 2 }}>
                <Button variant={tab === "analysis" ? "contained" : "outlined"}
                    onClick={() => setTab("analysis")}>
                    기업 분석
                </Button>

                <Button variant={tab === "review" ? "contained" : "outlined"}
                    onClick={() => setTab("review")}>
                    기업 후기
                </Button>
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
                        detail={detail}
                        detailId={detailId}
                        isLoading={isLoading}
                        isError={isError}
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