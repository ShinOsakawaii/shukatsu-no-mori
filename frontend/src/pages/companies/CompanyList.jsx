import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { fetchCompanies } from '../../api/companyApi';
import { useState } from 'react';
import { Box } from '@mui/material'
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
        <Box>
            <CompanyTable companies={companies} />

            <CompanyPagination
                page={page}
                totalPages={totalPages}
                onPrev={handlePrev}
                onNext={handleNext}
            // loggedin={!meIsLoading && !!me}
            />
        </Box>
    );
}

export default CompanyList;