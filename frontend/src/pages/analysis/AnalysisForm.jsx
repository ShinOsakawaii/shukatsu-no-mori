import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { createAnalysis, deleteAnalysis, fetchAnalysisDetail, updateAnalysis } from '../../api/companyAnalysisApi';
import { Box, Typography, Button, Stack, Paper } from '@mui/material';
import AnalysisFormFields from '../../components/analysis/AnalysisFormFields';
import Loader from '../../components/common/Loader';
import ErrorMessage from '../../components/common/ErrorMessage';
import AnalysisFormSubmit from '../../components/analysis/AnalysisFormSubmit';

//기업 분석 등록, 삭제
function AnalysisForm({ mode }) {

    const isEdit = mode === 'edit';


    const queryClient = useQueryClient();
    const { companyId: companyIdParam, detailId: detailIdParam } = useParams();
    const companyId = Number(companyIdParam);
    const analysisId = detailIdParam ? Number(detailIdParam) : null;

    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [position, setPosition] = useState("");
    const [content, setContent] = useState("");


    // TanStack Query=============
    // 기업 분석 등록
    const createMutation = useMutation({
        mutationFn: (payload) => createAnalysis(companyId, payload),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['analysis', companyId] });
            navigate(`/companies/${companyId}/detail/${data.detailId}`);
        },
        onError: () => {
            alert('게시글 등록에 실패했습니다.');
        }
    });

    // 수정 모드일 때 기존 데이터 가져오기 
    const { data: analysis, isLoading, isError, error } = useQuery({
        queryKey: ['analysis', companyId, analysisId],
        queryFn: () => fetchAnalysisDetail(companyId, analysisId),
        enabled: isEdit && !!analysisId
    });

    // 수정 mutation
    const updateMutation = useMutation({
        mutationFn: ({ companyId, analysisId, payload }) => updateAnalysis(companyId, analysisId, payload),
        onSuccess: (updatedData) => {
            // 상세 내용 무효화
            queryClient.setQueryData(['analysis', companyId, analysisId],
                (prev) => ({
                    ...prev,
                    ...updatedData,
                    isOwner: true,
                }));

            // 목록 캐시 무효화
            queryClient.invalidateQueries({ queryKey: ['analysis', companyId] });

            // 이동
            navigate(`/companies/${companyId}/detail/${analysisId}`);
        },
        onError: () => {
            alert('게시글 수정에 실패했습니다.')
        }

    })


    // 삭제
    const deleteMutation = useMutation({
        mutationFn: () => deleteAnalysis(companyId, analysisId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['analysis', companyId] });
            navigate(`/companies/${companyId}`);
        },
        onError: () => {
            alert('게시글 삭제에 실패했습니다.');
        }
    });

    // useEffect
    useEffect(() => {
        if (analysis) {
            setTitle(analysis.title);
            setPosition(analysis.position);
            setContent(analysis.content);
        }
    }, [analysis]);


    // 이벤트 핸들러 ==============
    // 폼 전송 =========
    const handleSubmit = (evt) => {
        evt.preventDefault();

        const payload = {
            title: title.trim(),
            position: position.trim(),
            content: content.trim()
        }

        //검증
        if (!title.trim() || !position.trim() || !content.trim()) {
            alert('모든 내용은 필수입니다.');
            return;
        }

        // props에 따라 생성/수정 mutation 호출
        if (isEdit) {
            updateMutation.mutate({ companyId, analysisId, payload });   // 수정
        } else {
            createMutation.mutate(payload); // 작성
        }

    }

    if (isEdit && isLoading) return <Loader />
    if (isEdit && isError) return <ErrorMessage error={error} />

    return (
        <Box sx={{ backgroundColor: 'background.default', minHeight: '100vh', py: 6 }}>
            {/* 상단 제목 */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 6 }}>
                <Typography
                    sx={{
                        width: 340,
                        height: 48,
                        borderRadius: 2,
                        bgcolor: 'background.button',
                        color: 'primary.contrastText',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '16px',
                        fontWeight: 500,
                        boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                    }}
                >
                    기업 분석
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

                    <AnalysisFormFields
                        title={title}
                        content={content}
                        position={position}
                        onChangeTitle={setTitle}
                        onChangePosition={setPosition}
                        onChangeContent={setContent}
                    />

                    <AnalysisFormSubmit
                        isEdit={isEdit} />

                </Box >
            </Paper >
        </Box >
    );
}
export default AnalysisForm;