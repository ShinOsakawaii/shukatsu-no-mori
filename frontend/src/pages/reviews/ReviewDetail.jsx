import React from 'react';
//리뷰 목록 조회, 삭제
function ReviewDetail(props) {

    const { companyId: companyIdParam } = useParams();
    const companyId = Number(companyIdParam);
    const queryClient = useQueryClient();

    //Api 관련 TanStaks Query=============
    //1. 리뷰 목록 조회
    const { data: reviews, isLoading, isError, error } = useQuery({
        queryKey: ['reviews', companyId],
        queryFn: () => fetchReviews(companyId),
        enabled: !!companyId
    });

    //2. 리뷰 삭제
    const deleteMutation = useMutation({
        mutationFn: (reviewId) =>
            deleteReview(companyId, reviewId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['reviews', companyId]
            });
        },
        onError: () => {
            alert('리뷰 삭제에 실패했습니다.');
        }
    });

    return (
        <div>

        </div>
    );
}

export default ReviewDetail;