import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { fetchCompanies } from '../../api/companyApi';
import { useState } from 'react';
import { Box, Container, Paper, Typography } from '@mui/material'
import CompanyTable from '../../components/companies/CompanyTable';
import CompanyPagination from '../../components/companies/CompanyPagination';
import Loader from '../../components/common/Loader';
import ErrorMessage from '../../components/common/ErrorMessage';

//기업정보 전체 목록 조회
function CompanyList() {
    const [page, setPage] = useState(0);

    //Api 관련 TanStaks Query=============
    const { data, isLoading, isError, error } = useQuery
        ({
            queryKey: ['companies', page],
            queryFn: () => fetchCompanies({ page, size: 6 }),
            placeholderData: keepPreviousData
        });

    // const { data: me, isLoading: meIsLoading } = useMe();

    if (isLoading) return <Loader />;
    if (isError) return <ErrorMessage error={error} />

    const { content: companies, totalPages } = data;

    //====== 이벤트 핸들러

    const handlePrev = () => {
        setPage(prev => Math.max(prev - 1, 0));
    }
    const handleNext = () => {
        setPage(prev => (prev + 1 < totalPages ? prev + 1 : prev));
    }

    return (
        <Box
            sx={{
                bgcolor: 'background.default', // 테마의 연한 베이지색 적용
                minHeight: '100vh', // 화면 전체 높이 채우기
                py: 5 // 상하 여백
            }}
        >
            <Container maxWidth="xl">

                {/* 1. 페이지 제목 섹션 */}
                <Box sx={{ mb: 4, textAlign: 'left' }}>
                    <Typography
                        variant='h4'
                        component='h1'
                        color="primary"
                        fontWeight={800}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                        }}
                    >
                        🌳 기업 정보 파트너스
                    </Typography>
                    <Typography variant='body1' sx={{ color: 'text.secondary', mt: 1 }}>
                        숲처럼 함계 성장하는 기업들의 목록입니다.
                    </Typography>
                </Box>

                {/* 2. 테이블 카드 섹션 */}
                <Paper
                    elevation={0} // 너무 과한 그림자 대신 깔끔하게
                    sx={{
                        p: 3,
                        borderRadius: 4,
                        boxShadow: '0px 10px 30px rgba(96, 108, 56, 0.05)', // 은은한 이끼색 그림자
                        bgcolor: 'background.box'
                    }}
                >
                    <CompanyTable companies={companies} />
                    {/* 3. 페이지네이션 중앙 배치 */}
                    <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
                        <CompanyPagination
                            page={page}
                            totalPages={totalPages}
                            onPrev={handlePrev}
                            onNext={handleNext}
                        // loggedin={!meIsLoading && !!me}
                        />
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
}

export default CompanyList;