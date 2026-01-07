import React from 'react';
import { Box, Button, Stack } from '@mui/material';
import { useNavigate, useParams } from 'react-router';

function ReviewFormSubmit({ isEdit }) {

    const navigate = useNavigate();
    const { companyId } = useParams();

    return (
        <>

            {/* 하단 버튼 */}
            < Stack direction="row" spacing={1.5} justifyContent="center" mt={4} >
                <Button
                    variant="outlined"
                    size="small"
                    onClick={() => navigate(`/companies/${companyId}`)}
                    sx={{
                        borderColor: '#6C584C',
                        color: '#6C584C',
                        px: 5,
                    }}
                >
                    취소
                </Button>

                <Button
                    type="submit"
                    variant="contained"
                    size="small"
                    sx={{
                        color: '#6C584C',
                        backgroundColor: '#ADC178',
                        px: 5,
                        '&:hover': { backgroundColor: '#96b85f' },
                    }}
                >
                    {isEdit ? '수정' : '저장'}
                </Button>
            </Stack >
        </>
    );
}
export default ReviewFormSubmit;