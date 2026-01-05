import React from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { fetchCompanies } from '../../api/companyApi';

//기업정보 전체 목록 조회
function CompanyList(props) {

    const page = 0;
    const keyword = '';

    //Api 관련 TanStaks Query=============
    const { data, isLoading, isError, error } = useQuery
    ({
        queryKey: ['companies', page, keyword],
        queryFn: () => fetchCompanies({ page, size: 10, keyword }),
        placeholderData: keepPreviousData
    });

    return (
        <div>

        </div>
    );
}

export default CompanyList;