import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { createReview, deleteReview, fetchReview, updateReview } from '../../api/companyReviewApi';
import { Box, Typography, Button, Stack, Paper } from '@mui/material';
import ReviewFormFields from '../../components/review/ReviewFormFields';
import Loader from '../../components/common/Loader';
import ErrorMessage from '../../components/common/ErrorMessage';
import ReviewFormSubmit from '../../components/review/ReviewFormSubmit';
import { useMe } from '../../hooks/useMe';

//기업 후기 등록, 삭제
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


    // TanStack Query=============
    // 기업 후기 등록
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

    // 수정 모드일 때 기존 데이터 가져오기 
    const { data: review, isLoading, isError, error } = useQuery({
        queryKey: ['review', companyId, reviewId],
        queryFn: () => fetchReview(companyId, reviewId),
        enabled: isEdit && !!reviewId
    });

    // 수정 mutation
    const updateMutation = useMutation({
        mutationFn: ({ companyId, reviewId, payload }) => updateReview(companyId, reviewId, payload),
        onSuccess: (updatedData) => {
            // 상세 내용 무효화
            queryClient.setQueryData(['review', companyId, reviewId],
                (prev) => ({
                    ...prev,
                    ...updatedData,
                    isOwner: true,
                }));

            // 목록 캐시 무효화
            queryClient.invalidateQueries({ queryKey: ['review', companyId] });

            // 이동
            navigate(`/companies/${companyId}/review/${reviewId}`);
        },
        onError: () => {
            alert('게시글 수정에 실패했습니다.')
        }

    })


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

    // useEffect
    useEffect(() => {
        if (review) {
            setTitle(review.title);
            setPosition(review.position);
            setStage(review.stage);
            setResult(review.result);
            setContent(review.content);
        }
    }, [review]);


    // 이벤트 핸들러 ==============
    // 폼 전송 =========
    const handleSubmit = (evt) => {
        evt.preventDefault();

        // [핵심!] 백엔드 DTO(ReviewCreateRequest) 명세에 딱 맞춘 데이터 구조입니다.
        const payload = {
            companyId: companyId, // 서버가 "회사 ID는 필수입니다."라고 했던 바로 그 부분!
            title: title.trim(),
            position: position.trim(),
            stage: stage.trim(),
            result: result.trim(),
            content: content.trim()
        };

        console.log("서버로 보내는 최종 데이터:", payload);

        // 필수 값 검증 (클라이언트 측)
        if (!payload.title || !payload.position || !payload.stage || !payload.result || !payload.content) {
            alert('모든 항목을 입력해야 저장이 가능합니다.');
            return;
        }

        if (isEdit) {
            updateMutation.mutate({ companyId, reviewId, payload });
        } else {
            createMutation.mutate(payload);
        }
    };

    if (isEdit && isLoading) return <Loader />
    if (isEdit && isError) return <ErrorMessage error={error} />

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
            <Paper elevation={0}
                sx={{
                    position: 'relative',
                    maxWidth: 900,
                    mx: 'auto'
                }}>
                {/* 수정일 때만 삭제 버튼 (우측 상단) */}
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
                        position={position}
                        stage={stage}
                        result={result}
                        content={content}
                        onChangeTitle={setTitle}
                        onChangePosition={setPosition}
                        onChangeStage={setStage}
                        onChangeResult={setResult}
                        onChangeContent={setContent}
                    />

                    <ReviewFormSubmit
                        isEdit={isEdit} />

                </Box >
            </Paper >
        </Box >
    );
}
export default ReviewForm;