import { fetchCompany } from '../../api/companyApi';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import CompanyDetailAnalysis from "../../components/companies/CompanyDetailAnalysis";
import CompanyDetailReview from '../../components/companies/CompanyDetailReview';
import ErrorMessage from '../../components/common/ErrorMessage';
import Loader from '../../components/common/Loader';
import { Box, Button, Tab, Tabs } from '@mui/material';
import { useState } from 'react';

//기업정보 상세조회, 삭제
function CompanyDetail() {

    const { companyId: companyIdParam } = useParams();
    const companyId = Number(companyIdParam);
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

    const { detail, review } = company;

    return (
        <>
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

            {/* 기업 분석 테이블 */}
            {tab === "analysis" && <CompanyDetailAnalysis
                companyId={companyId}
                detail={detail}
                isLoading={isLoading}
                isError={isError}
            />}

            {/* 기업 후기 테이블 */}
            {tab === "review" && <CompanyDetailReview
                companyId={companyId}
                review={review}
                isLoading={isLoading}
                isError={isError}
            />}
        </>
    );
}

export default CompanyDetail;