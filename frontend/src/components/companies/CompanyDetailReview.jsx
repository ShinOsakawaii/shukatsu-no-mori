import { Box, Button, Divider, Paper, Typography } from '@mui/material';
import Loader from '../common/Loader';
import ErrorMessage from '../common/ErrorMessage';
import { useNavigate } from 'react-router';
import dayjs from 'dayjs';
import { getToken } from '../../api/authApi';

function CompanyDetailReview({ companyId, review, isLoading, isError }) {

    const navigate = useNavigate();

    const lists = Array.isArray(review?.content)
        ? review.content
        : [];

    console.log('review:', review);

    if (isLoading) return <Loader />;
    if (isError && !review?.length) {
        return <ErrorMessage message="기업 후기 목록을 불러오지 못했습니다." />;
    }

    const handleCreateClick = () => {
        const token = getToken?.();

        if (!token) {
            alert('로그인이 필요합니다.');
            navigate('/auth/login');
            return;
        }
        navigate(`/companies/${companyId}/review/new`);
    };

    return (
        <Box sx={{ maxWidth: 1100, mx: "auto", bgcolor: 'background.box', p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                <Button onClick={handleCreateClick} variant="contained" sx={{ mb: 2, <Button onClick={handleCreateClick} variant="contained" sx={{ mb: 2, , bgcolor: 'background.button'  }}> }}>
                    기업 후기 등록
                </Button>
            </Box>

            {!isLoading && !isError && lists.length === 0 && (
                <Box>
                    <Typography align="center" sx={{ py: 5 }}>
                        게시글이 없습니다.
                    </Typography>
                </Box>
            )}

            {/* 후기 목록 */}
            {!isLoading && !isError && lists.length > 0 &&
                lists.map((item) => {
                    const { reviewId, content, createdAt, nickname } = item;

                    return (
                        <Paper
                            key={reviewId}
                            variant="outlined"
                            sx={{ p: 2, mb: 1.5, cursor: "pointer" }}
                            onClick={() =>
                                navigate(`/companies/${companyId}/review/${reviewId}`)
                            }
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    mb: 1
                                }}
                            >
                                <Typography sx={{ fontWeight: 'bold' }}>
                                    {nickname}님의 기업 후기
                                </Typography>

                                <Typography>
                                    {createdAt &&
                                        dayjs(createdAt).format('YYYY년 MM월 DD일 HH:mm')}
                                </Typography>
                            </Box>

                            <Typography
                                variant="body2"
                                sx={{ whiteSpace: 'pre-wrap' }}
                            >
                                {content}
                            </Typography>
                        </Paper>
                    );
                })
            }

            <Divider sx={{ mt: 2 }} />
        </Box>
    );
}

export default CompanyDetailReview;
