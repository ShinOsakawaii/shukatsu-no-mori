import { fetchMyPage, fetchMyDetails, fetchMyReviews } from '../../api/mypageApi';
import { useQuery } from '@tanstack/react-query';
import MyPageAnalysis from '../../components/mypage/MyPageAnalysis';
import MyPageReview from '../../components/mypage/MyPageReview';
import { Box, Button, Paper } from '@mui/material';
import { useState } from 'react';
import MyPageButtons from '../../components/mypage/MyPageButtons';
import Loader from '../../components/common/Loader';
import ErrorMessage from '../../components/common/ErrorMessage';
import { useParams } from 'react-router';

//내가 쓴 글 조회
function MyPageContent({ userId }) {
    const [tab, setTab] = useState("analysis");
    const companyId = 1252;

    //Api 관련 TanStaks Query=============
    //1. 내 기본 정보


    //2. 내가 쓴 기업 분석
    const {
        data: myDetails,
        isLoading: isMyDetailsLoading,
        isError: isMyDetailsError,
        error: myDetailsError,
    } = useQuery({
        queryKey: ['mypage', 'details', companyId],
        queryFn: () => fetchMyDetails(companyId),
        enabled: !!userId,
    });

    //3. 내가 쓴 리뷰
    const {
        data: myReviews,
        isLoading: isMyReviewsLoading,
        isError: isMyReviewsError,
        error: myReviewsError,
    } = useQuery({
        queryKey: ['mypage', 'reviews', userId],
        queryFn: () => fetchMyReviews(userId),
        enabled: !!userId
    });

    /*
    if (isMyDetailsLoading || isMyReviewsLoading) {
        return <Loader />;
    }
    if (isMyDetailsError || isMyReviewsError) {
        const error = myDetailsError || myReviewsError;
        return <ErrorMessage error={error} />;
    }
    */

    return (
        <Box sx={{ m: 3 }}>
            <Paper sx={{ borderRadius: 4, p: "20px 20px 35px 20px" }}>
                <MyPageButtons tab={tab} setTab={setTab} />
                {tab === "analysis" ? (
                    <>
                        <MyPageAnalysis
                            myDetails={myDetails}
                            isLoading={isMyDetailsLoading}
                            isError={isMyDetailsError}
                        />
                    </>
                ) : (
                    <MyPageReview myReviews={myReviews} />
                )}

            </Paper>
        </Box>
    );
}

export default MyPageContent;