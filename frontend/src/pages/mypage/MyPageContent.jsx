import { fetchMyPage, fetchMyDetails, fetchMyReviews } from '../../api/mypageApi';
import { useQuery } from '@tanstack/react-query';
import MyPageAnalysis from '../../components/mypage/MyPageAnalysis';
import MyPageReview from '../../components/mypage/MyPageReview';
import { Box, Button, Paper } from '@mui/material';
import { useState } from 'react';

//내가 쓴 글 조회
function MyPageContent({ userId }) {
    const [tab, setTab] = useState("analysis");

    //Api 관련 TanStaks Query=============
    //1. 내 기본 정보
    const {
        data: myPage,
        isLoading: isMyPageLoading,
        isError: isMyPageError,
        error: myPageError,
    } = useQuery({
        queryKey: ['mypage', 'me', userId],
        queryFn: () => fetchMyPage(userId)
    });

    //2. 내가 쓴 기업 분석
    const {
        data: myDetails,
        isLoading: isMyDetailsLoading,
        isError: isMyDetailsError,
        error: myDetailsError,
    } = useQuery({
        queryKey: ['mypage', 'details', userId],
        queryFn: () => fetchMyDetails(userId)
    });

    //3. 내가 쓴 리뷰
    const {
        data: myReviews,
        isLoading: isMyReviewsLoading,
        isError: isMyReviewsError,
        error: myReviewsError,
    } = useQuery({
        queryKey: ['mypage', 'reviews', userId],
        queryFn: () => fetchMyReviews(userId)
    });

    if (isMyPageLoading || isMyDetailsLoading || isMyReviewsLoading) {
        return <Loader />;
    }
    if (isMyPageError || isMyDetailsError || isMyReviewsError) {
        const error = myPageError || myDetailsError || myReviewsError;
        return <ErrorMessage error={error} />;
    }

    const { detail, review } = data;

    return (
        <Box sx={{ m: 3 }}>
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

            <Paper sx={{ borderRadius: 4, p: "20px 20px 35px 20px" }}>
                {tab === "analysis" ? (
                    <MyPageAnalysis detail={myDetails} />
                ) : (
                    <MyPageReview review={myReviews} />
                )}
            </Paper>
        </Box>
    );
}

export default MyPage;