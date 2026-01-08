import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { createReview, deleteReview, fetchReview, updateReview } from '../../api/companyReviewApi';
import { Box, Typography, Button, Paper, Container } from '@mui/material';
import ReviewFormFields from '../../components/review/ReviewFormFields';
import Loader from '../../components/common/Loader';
import ErrorMessage from '../../components/common/ErrorMessage';
import ReviewFormSubmit from '../../components/review/ReviewFormSubmit';

// 기업 후기 등록 / 수정
function ReviewForm({ mode }) {

    const isEdit = mode === 'edit';

    const queryClient = useQueryClient();
    const { companyId: companyIdParam, reviewId: reviewIdParam } = useParams();
    const companyId = Number(companyIdParam);
    const reviewId = reviewIdParam ? Number(reviewIdParam) : null;

    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [position, setPosition] = useState("");
    const [stage, setStage] = useState("");
    const [result, setResult] = useState("");
    const [content, setContent] = useState("");

    // =====================
    // 후기 등록
    const createMutation = useMutation({
        mutationFn: (payload) => createReview(companyId, payload),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['review', companyId] });
            navigate(`/companies/${companyId}/review/${data.reviewId}`);
        },
        onError: () => {
            alert('게시글 등록에 실패했습니다.');
        }
    });

    // 수정 모드일 때 기존 데이터 조회
    const { data: review, isLoading, isError, error } = useQuery({
        queryKey: ['review', companyId, reviewId],
        queryFn: () => fetchReview(companyId, reviewId),
        enabled: isEdit && !!reviewId
    });

    // 후기 수정
    const updateMutation = useMutation({
        mutationFn: ({ companyId, reviewId, payload }) =>
            updateReview(companyId, reviewId, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['review', companyId, reviewId] });

            queryClient.invalidateQueries({ queryKey: ['review', companyId] });

            navigate(`/companies/${companyId}/review/${reviewId}`, { replace: true });
        },
        onError: () => {
            alert('게시글 수정에 실패했습니다.');
        }
    });

    // 삭제
    const deleteMutation = useMutation({
        mutationFn: () => deleteReview(companyId, reviewId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['review', companyId] });
            navigate(`/companies/${companyId}`);
        },
        onError: () => {
            alert('게시글 삭제에 실패했습니다.');
        }
    });

    // 기존 데이터 세팅
    useEffect(() => {
        if (review) {
            setTitle(review.title);
            setPosition(review.position);
            setStage(review.stage);
            setResult(review.result);
            setContent(review.content);
        }
    }, [review]);

    // =====================
    // 폼 제출
    const handleSubmit = (evt) => {
        evt.preventDefault();

        const payload = {
            title: title.trim(),
            position: position.trim(),
            stage: stage.trim(),
            result: result.trim(),
            content: content.trim(),
        };

        if (!payload.title || !payload.position || !payload.stage || !payload.result || !payload.content) {
            alert('모든 내용은 필수입니다.');
            return;
        }

        if (isEdit) {
            updateMutation.mutate({ companyId, reviewId, payload });
        } else {
            createMutation.mutate(payload);
        }
    };

    if (isEdit && isLoading) return <Loader />;
    if (isEdit && isError) return <ErrorMessage error={error} />;

    return (
        <Box sx={{ backgroundColor: 'background.default', minHeight: '100vh', py: 8 }}>
            <Container maxWidth="md">
                {/* 상단 제목 */}
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 6 }}>
                    <Typography
                        variant='h2'
                        sx={{
                            px: 6,
                            py: 1.5,
                            backgroundColor: 'background.button',
                            color: 'primary.contrastText',
                            borderRadius: '50px',
                            fontSize: '2rem',
                            textAlign: 'center',
                            boxShadow: 2
                        }}
                    >
                        기업 후기
                    </Typography>
                </Box>

                <Paper
                    elevation={0}
                    sx={{
                        position: 'relative', maxWidth: 900, mx: 'auto'
                    }}
                >
                    {/* 수정일 때만 삭제 버튼 */}
                    {isEdit && (
                        <Button
                            color="error"
                            variant="contained"
                            sx={{
                                position: 'absolute',
                                px: 4,
                                borderRadius: 2,
                                top: 550,
                                left: 730,
                                backgroundColor: '#f00',
                                color: '#fff',
                                '&:hover': { backgroundColor: '#d00' }
                            }}
                            onClick={() => {
                                if (window.confirm('해당 글을 정말 삭제하겠습니까?')) {
                                    deleteMutation.mutate();
                                }
                            }}
                        >
                            삭제
                        </Button>
                    )}
                </Paper>

                {/* 입력 카드 */}
                <Paper
                    elevation={0}
                    sx={{
                        maxWidth: 900,
                        mx: 'auto',
                        p: 5,
                        borderRadius: 6,
                        backgroundColor: '#DDE5B6',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                    }}
                >
                    <Box component="form" onSubmit={handleSubmit}>
                        <ReviewFormFields
                            title={title}
                            content={content}
                            position={position}
                            stage={stage}
                            result={result}
                            onChangeTitle={setTitle}
                            onChangePosition={setPosition}
                            onChangeContent={setContent}
                            onChangeStage={setStage}
                            onChangeResult={setResult}
                        />

                        <ReviewFormSubmit isEdit={isEdit} />
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
}

export default ReviewForm;
