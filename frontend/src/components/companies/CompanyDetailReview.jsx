import { Box, Button, Divider, Paper, Typography } from '@mui/material';
import Loader from '../common/Loader';
import ErrorMessage from '../common/ErrorMessage';
import { Link } from 'react-router';
import dayjs from 'dayjs';

function CompanyDetailReview({ companyId, review, isLoading, isError }) {

    const lists = review ? review : []
    return (
        <Box sx={{ maxWidth: 1100, mx: "auto" }}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                <Button component={Link} to={`/companies/${companyId}/review`} variant="contained" sx={{ mb: 2 }}>
                    기업 후기 등록
                </Button>
            </Box>

            {isLoading && <Loader />}
            {isError && <ErrorMessage />}

            {!isLoading && !isError && lists.length === 0 && (
                <Box>
                    <Typography align='center' sx={{ py: 5 }}>
                        게시글이 없습니다.
                    </Typography>
                </Box>
            )}
            {/* 분석 목록 */}
            {!isLoading && !isError
                && lists.map((item) => {
                    const { id, content, createAt, nickname, stage, result } = item;
                    return (
                        <Paper key={id} variant='outlined' sx={{ p: 2, mb: 1.5 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                                <Typography sx={{ fontWeight: 'bold' }}>{nickname}님의 기업 후기</Typography>
                                <Typography>{dayjs(createAt).format('YY년MM월DD일HH:mm')}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', gap: 1 }}>
                                <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                                    {content}
                                </Typography >
                                <Typography variant="caption" sx={{ bgcolor: 'grey.100', px: 1, borderRadius: 1 }}>{stage}</Typography>
                                <Typography variant="caption" sx={{ bgcolor: 'primary.light', color: 'white', px: 1, borderRadius: 1 }}>{result}</Typography>
                            </Box>
                        </Paper>
                    )
                })
            }

            <Divider sx={{ mt: 2 }} />
        </Box>
    );
}

export default CompanyDetailReview;