import { Link } from 'react-router'
import dayjs from 'dayjs';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'

function MyPageReview({ review }) {

    const lists = review ? review : []
    return (
        <TableContainer sx={{ mt: 3 }}>
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
                <TableBody>
                    {
                        lists.map(({
                            id, title, createAt, companyId, reviewId }) =>
                        (
                            <TableRow key={id}
                                hover sx={{
                                    '& td': {
                                        fontSize: 15,
                                        borderBottom: '1px solid #eeeeee'
                                    }
                                }}
                            >
                                <TableCell align='center'>{id}</TableCell>
                                <TableCell>
                                    <Typography component={Link} to={`/companies/${companyId}/review/${reviewId}`}
                                        sx={{ cursor: 'pointer', textDecoration: 'none', color: 'inherit', '&:hover': { color: 'primary.main' } }}>
                                        {title}
                                    </Typography>
                                </TableCell>
                                <TableCell align='center'>{dayjs(createAt).format('YY년MM월DD일HH.mm')}</TableCell>
                            </TableRow>
                        ))
                    }

                    {/* 게시글이 하나도 없을 때*/}
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
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default MyPageReview;