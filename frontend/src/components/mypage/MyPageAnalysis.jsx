import { Link } from 'react-router'
import dayjs from 'dayjs';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'

function MyPageAnalysis({ myDetails }) {

    const lists = myDetails ? myDetails : []
    return (
        <TableContainer sx={{ mt: 3, backgroundColor: '#DDE5B6' }}>
            <Table>
                {/* 테이블 머릿말 */}
                <TableHead sx={{
                    '& th': {
                        borderBottom: '1px solid #EEEEEE',
                        fontSize: 14,
                        fontWeight: 500,
                        color: '#222831',
                    }
                }}>
                    <TableRow>
                        <TableCell align='center' width={80}>번호</TableCell>
                        <TableCell align='center' width={80}>제목</TableCell>
                        <TableCell align='center' width={80}>작성일</TableCell>
                    </TableRow>
                </TableHead>

                {/* 테이블 본문 */}
                <TableBody sx={{ color: "#222831" }}>
                    {lists.length > 0 ? (
                        lists.map(({ id, title, createAt, companyId, detailId }) => (
                            <TableRow
                                key={id}
                                hover
                                sx={{ '& td': { fontSize: 15, borderBottom: '1px solid #eeeeee' } }}
                            >
                                <TableCell align='center'>{id}</TableCell>
                                <TableCell>
                                    <Typography
                                        component={Link}
                                        to={`/companies/${companyId}/detail/${detailId}`}
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
                                    {dayjs(createAt).format('YY년MM월DD일 HH:mm')}
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