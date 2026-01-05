import React from 'react';
//등록, 수정
function ReviewForm(props) {
    const { companyId: companyIdParam } = useParams();
    const companyId = Number(companyIdParam);
    const queryClient = useQueryClient();

    //Api 관련 TanStaks Query=============
    //등록
    const createMutation = useMutation({
        mutationFn: (payload) =>
            createReview(companyId, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['reviews', companyId]
            });
        },
        onError: () => {
            alert('리뷰 등록에 실패했습니다.');
        }
    });
    
    //수정
    const updateMutation = useMutation({
        mutationFn: ({ reviewId, payload }) =>
            updateReview(companyId, reviewId, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['reviews', companyId]
            });
        },
        onError: () => {
            alert('리뷰 수정에 실패했습니다.');
        }
    });
    
    return (
        <div>

        </div>
    );
}

export default ReviewForm;