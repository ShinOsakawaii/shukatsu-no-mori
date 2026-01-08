import { Link, useNavigate } from 'react-router'
import dayjs from 'dayjs';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import Loader from '../common/Loader';
import ErrorMessage from '../common/ErrorMessage';

function MyPageAnalysis({ myDetails, isLoading, isError }) {
    const navigate = useNavigate();
    const lists = Array.isArray(myDetails?.content) ? myDetails.content : [];

    if (isLoading) return <Loader />;
    if (isError && !myDetails?.length) {
        return <ErrorMessage message="기업 분석 목록을 불러오지 못했습니다." />;
    }

    return (
        <TableContainer sx={{ mt: 3, bgcolor: 'background.box' }}>
            <Table>
                {/* 테이블 머릿말 */}
                <TableHead sx={{
                    '& th': {
                        bgcolor: 'background.box',
                        fontSize: 14,
                        fontWeight: 500,
                        color: 'text',
                    }
                }}>
                    <TableRow>
                        <TableCell align='center' width={80}>번호</TableCell>
                        <TableCell align='center' width={80}>제목</TableCell>
                        <TableCell align='center' width={80}>작성일</TableCell>
                    </TableRow>
                </TableHead>

                {/* 테이블 본문 */}
                <TableBody sx={{ bgcolor: 'background.box' }}>
                    {lists.length > 0 ? (
                        lists.map(({ title, createdAt, companyId, detailId }) => (
                            <TableRow
                                key={detailId}
                                hover
                                sx={{ '& td': { fontSize: 15, borderBottom: '1px solid constrastText' } }}
                                onClick={() => navigate(`/companies/${companyId}/detail/${detailId}`)}
                            >
                                <TableCell align='center'>{detailId}</TableCell>
                                <TableCell>
                                    <Typography
                                        sx={{
                                            cursor: 'pointer',
                                            textDecoration: 'none',
                                            color: 'inherit',
                                            '&:hover': { color: 'primary.main' }
                                        }}
                                    >
                                        {title}
                                    </Typography>
                                </TableCell>
                                <TableCell align='center'>
                                    {dayjs(createdAt).format('YYYY년 MM월 DD일 HH:mm')}
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={3} align='center' sx={{ py: 5 }}>
                                <Typography color="text.secondary">
                                    등록된 게시글이 없습니다.
                                </Typography>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default MyPageAnalysis;