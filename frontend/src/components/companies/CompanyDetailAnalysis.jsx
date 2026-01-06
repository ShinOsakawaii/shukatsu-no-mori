import { Box, Button, Divider, Paper, Typography } from '@mui/material';
import Loader from '../common/Loader';
import ErrorMessage from '../common/ErrorMessage';
import { Link } from 'react-router';
import dayjs from 'dayjs';

function CompanyDetailAnalysis({ companyId, detail, isLoading, isError }) {

    const lists = detail ? detail : []
    return (
        <Box sx={{ maxWidth: 1100, mx: "auto", backgroundColor: '#ADC178', p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                <Button component={Link} to={`/companies/${companyId}/detail/new`} variant="contained" sx={{ mb: 2, backgroundColor: '#A98467' }} >
                    기업 분석 등록
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
            {!isLoading && !isError && lists.length > 0
                && lists.map((item) => {
                    const { id, content, createAt, nickname } = item;

                    return (
                        <Paper key={id} variant='outlined' sx={{ p: 2, mb: 1.5 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                                <Typography sx={{ fontWeight: 'bold' }}>{nickname}님의 기업 분석</Typography>
                                <Typography>{dayjs(createAt).format('YY년MM월DD일HH:mm')}</Typography>
                            </Box>
                            <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                                {content}
                            </Typography>
                        </Paper>
                    )
                })
            }
            <Divider sx={{ mt: 2 }} />
        </Box>
    );
}

export default CompanyDetailAnalysis;