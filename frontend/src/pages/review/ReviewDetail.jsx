
import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { fetchReview } from "../../api/companyReviewApi";
import Loader from "../../components/common/Loader";
import ErrorMessage from "../../components/common/ErrorMessage";
import ReviewDetailHeader from "../../components/review/ReviewDetailHeader";
import ReviewDetailContent from "../../components/review/ReviewDetailContent";
import ReviewDetailButtons from "../../components/review/ReviewDetailButtons";
import { useMe } from "../../hooks/useMe";

export default function ReviewDetail() {

    const { data: me } = useMe();

    const { companyId: companyIdParam, reviewId: reviewIdParam } = useParams();
    const companyId = Number(companyIdParam);
    const reviewId = Number(reviewIdParam);

    // TanStack Query ============
    // 리뷰 상세 조회
    const { data: review, isLoading, isError, error } = useQuery({
        queryKey: ['review', companyId, reviewId],
        queryFn: () => fetchReview(companyId, reviewId),
        enabled: !!companyId && !!reviewId
    });

    if (!companyId || !reviewId) {
        return <ErrorMessage error={{ message: "잘못된 접근입니다." }} />;
    }

    if (isLoading) return <Loader />;
    if (isError || !review) return <ErrorMessage error={error} />;

    const isAuthor =
        me && review && Number(review.userId) === Number(me.userId);

    return (
        <Box sx={{ backgroundColor: '#f6f1dc', minHeight: '100vh', py: 6 }}>
            {/* 상단 제목 */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 6 }}>
                <Typography
                    sx={{
                        width: 340,
                        height: 48,
                        backgroundColor: '#A98467',
                        color: '#F0EAD2',
                        borderRadius: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '16px',
                        fontWeight: 500,
                        boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                    }}
                >
                    기업 후기
                </Typography>
            </Box>

            <Paper
                elevation={0}
                sx={{
                    maxWidth: 900,
                    mx: 'auto',
                    p: 5,
                    borderRadius: 6,
                    backgroundColor: '#e4efc3',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                }}
            >
                <ReviewDetailHeader review={review} />
                <ReviewDetailContent review={review} />
                <ReviewDetailButtons
                    isAuthor={isAuthor}
                    reviewId={reviewId}
                />
            </Paper>
        </Box>
    );
}
