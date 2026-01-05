import { Link, useParams } from 'react-router'
import dayjs from 'dayjs';
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'

function CompanyDetailAnalysis({ company }) {
    const { companyId } = useParams();// companies 는 임시

    const lists = company ? company : [];
    return (
        <TableContainer sx={{ mt: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                <Button variant="contained" component={Link} to={`/companies/${companyId}/detail/new`} size='small'>
                    기업 분석 등록
                </Button>
            </Box>
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
                            id, title, createAt }) =>
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
                                    <Typography component={Link} to={`/companies/${companyId}/detail/${id}`}
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
                            <TableRow>
                                <TableCell colSpan={5}
                                    align='center' sx={{ py: 5 }}>
                                    게시글이 없습니다.
                                </TableCell>
                            </TableRow>
                        )
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default CompanyDetailAnalysis;