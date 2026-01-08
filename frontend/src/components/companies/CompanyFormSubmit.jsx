import React from 'react';
import { Box, Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router';

function AnalysisFormSubmit({ isEdit }) {

    const navigate = useNavigate();

    return (
        <>

            {/* 하단 버튼 */}
            < Stack direction="row" spacing={1.5} justifyContent="center" mt={4} >
                <Button
                    variant="outlined"
                    size="small"
                    onClick={() => navigate(-1)}
                    sx={{
                        shape: 'bordercolor',
                        color: 'bordercolor',
                        px: 5,
                    }}
                >
                    취소
                </Button>

                <Button
                    type="submit"
                    variant="outliend"
                    size="small"
                    sx={{
                        px: 5,
                        backgroundColor: 'background.box2',
                        '&:hover': { bgcolor: 'background.box' },
                    }}
                >
                    {isEdit ? '수정' : '저장'}
                </Button>
            </Stack >
        </>
    );
}
export default AnalysisFormSubmit;
