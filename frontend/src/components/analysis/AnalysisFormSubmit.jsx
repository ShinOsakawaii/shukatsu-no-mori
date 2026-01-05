import React from 'react';
import { Box, Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router';

function AnalysisFormSubmit({ isEdit, onDelete }) {

    const navigate = useNavigate();

    return (
        <>
            {/* 수정일 때만 삭제 버튼 (우측 상단) */}
            {isEdit && (
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                    <Button
                        color="error"
                        variant="contained"
                        sx={{ px: 4, borderRadius: 2 }}
                        onClick={onDelete}
                    >
                        삭제
                    </Button>
                </Box>
            )}

            {/* 하단 버튼 */}
            <Stack direction="row" spacing={2} justifyContent="center" mt={4}>
                <Button
                    variant="outlined"
                    onClick={() => navigate(-1)}
                    sx={{
                        borderColor: '#a88464',
                        color: '#a88464',
                        px: 5,
                    }}
                >
                    취소
                </Button>

                <Button
                    type="submit"
                    variant="contained"
                    sx={{
                        backgroundColor: '#a7c76f',
                        px: 5,
                        '&:hover': { backgroundColor: '#96b85f' },
                    }}
                >
                    {isEdit ? '수정' : '저장'}
                </Button>
            </Stack>
        </>
    );
}
export default AnalysisFormSubmit;