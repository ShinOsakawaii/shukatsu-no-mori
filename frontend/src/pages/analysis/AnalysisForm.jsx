import React from 'react';
//기업 분석 등록, 삭제
function AnalysisForm(props) {

    const { companyId: companyIdParam, detailId } = useParams();
    const companyId = Number(companyIdParam);
    const queryClient = useQueryClient();

    const isEdit = !!detailId;

    // TanStack Query=============
    // 1. 기업 분석 등록
    const createMutation = useMutation({
        mutationFn: (payload) =>
            createCompanyDetail(companyId, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['companyDetails', companyId]
            });
        },
        onError: () => {
            alert('기업 분석 등록에 실패했습니다.');
        }
    });


    // 2. 기업 분석 삭제
    const updateMutation = useMutation({
        mutationFn: (payload) =>
            updateCompanyDetail(companyId, detailId, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['companyDetails', companyId]
            });
            queryClient.invalidateQueries({
                queryKey: ['companyDetail', companyId, detailId]
            });
        },
        onError: () => {
            alert('기업 분석 수정에 실패했습니다.');
        }
    });

    return (
        <div>

        </div>
    );
}

export default AnalysisForm;