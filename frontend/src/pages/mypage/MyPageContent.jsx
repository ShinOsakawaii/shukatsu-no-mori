import React from 'react';
//내가 쓴 글 조회
function MyPageContent(userId) {
    
    //Api 관련 TanStaks Query=============
    //1. 내 기본 정보
    const myPageQuery = useQuery({
        queryKey: ['mypage', 'me'],
        queryFn: () => fetchMyPage(userId)
    });

    //2. 내가 쓴 기업 분석
    const myDetailsQuery = useQuery({
        queryKey: ['mypage', 'details'],
        queryFn: () => fetchMyDetails()
    });

    //3. 내가 쓴 리뷰
    const myReviewsQuery = useQuery({
        queryKey: ['mypage', 'reviews'],
        queryFn: () => fetchMyReviews()
    });


    return (
        <div>

        </div>
    );
}

export default MyPage;