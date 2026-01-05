import React from 'react';
//기업 분석 조회, 삭제 
function AnalysisDetail(props) {

    const { companyId: companyIdParam, detailId } = useParams();
    const companyId = Number(companyIdParam);
    const queryClient = useQueryClient();

    // TanStack Query=============
    // 1. 기업 분석 목록 조회

    const companyDetailsQuery = useQuery({
        queryKey: ['companyDetails', companyId],
        queryFn: () => fetchCompanyDetails(companyId),
        enabled: !!companyId
    });

    // 2. 기업 분석 상세 조회

    const companyDetailQuery = useQuery({
        queryKey: ['companyDetail', companyId, detailId],
        queryFn: () => fetchCompanyDetail(companyId, detailId),
        enabled: !!companyId && !!detailId
    });

    // 3. 기업 분석 삭제
    const deleteMutation = useMutation({
        mutationFn: ({ companyId, detailId }) =>
            deleteCompanyDetail(companyId, detailId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['companyDetails', companyId]
            });
        },
        onError: () => {
            alert('기업 분석 삭제에 실패했습니다.');
        }
    });

    return (
        <div>

        </div>
    );
}

export default AnalysisDetail;