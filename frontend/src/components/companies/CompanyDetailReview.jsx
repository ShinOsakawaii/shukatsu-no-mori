import { Box, Button, Divider, Paper, Typography } from '@mui/material';
import Loader from '../common/Loader';
import ErrorMessage from '../common/ErrorMessage';
import { Link } from 'react-router';
import dayjs from 'dayjs';
import { getToken } from '../../api/authApi';

function CompanyDetailReview({ companyId, review, isLoading, isError }) {
    const lists = review ? review : []

    const handleCreateClick = () => {
        const token = getToken?.();

        if (!token) {
            alert('로그인이 필요합니다.');
            navigate('/auth/login');
            return;
        }
        navigate('new');
    };

    return (
        <Box sx={{ maxWidth: 1100, mx: "auto" }}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                <Button onClick={handleCreateClick} variant="contained" sx={{ mb: 2 }}>
                    기업 후기 등록
                </Button>
            </Box>

            {isLoading && <Loader />}
            {isError && <ErrorMessage />}

            {/* 분석 목록 */}
            {!isLoading && !isError
                && lists.map((item) => {
                    const { id, content, createAt, nickname, stage, result } = item;
                    return (
                        <Paper key={id} variant='outlined' sx={{ p: 2, mb: 1.5 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                                <Typography>{nickname}님의 기업 후기</Typography>
                                <Typography>{dayjs(createAt).format('YY년MM월DD일HH.mm')}</Typography>
                            </Box>
                            <Box>
                                <Typography variant="body2">{content}</Typography>
                                <Typography >{stage}</Typography>
                                <Typography >{result}</Typography>
                            </Box>
                        </Paper>
                    )
                })
            }
            {
                lists.length === 0 && (
                    <Box>
                        <Typography colSpan={3}
                            align='center' sx={{ py: 5 }}>
                            게시글이 없습니다.
                        </Typography>
                    </Box>
                )
            }

            <Divider sx={{ mt: 2 }} />
        </Box>
    );
}

export default CompanyDetailReview;