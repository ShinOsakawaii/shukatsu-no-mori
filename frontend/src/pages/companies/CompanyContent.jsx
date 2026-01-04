import React from 'react';
import { deleteCompany, fetchCompany } from '../../api/companyApi';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router';
//기업정보 상세조회, 삭제
function CompanyContent() {
    
    const { companyId: companyIdParam } = useParams();
    const companyId = Number(companyIdParam);
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    // TanStack Query=============
    // 1. 상세 내용 조회
    const { data: company, isLoading, isError, error } = useQuery({
        queryKey: ['company', companyId],
        queryFn: () => fetchCompany(companyId),
        enabled: !!companyId
    });

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





    return (
        <div>

        </div>
    );
}

export default CompanyContent;