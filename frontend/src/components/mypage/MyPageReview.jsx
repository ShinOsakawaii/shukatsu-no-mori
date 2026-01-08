import { Link, useNavigate } from 'react-router'
import dayjs from 'dayjs';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import Loader from '../common/Loader';
import ErrorMessage from '../common/ErrorMessage';

function MyPageReview({ myReviews, isLoading, isError }) {
    const navigate = useNavigate();
    const lists = Array.isArray(myReviews?.content) ? myReviews.content : [];

    if (isLoading) return <Loader />;
    if (isError && !myReviews?.length) {
        return <ErrorMessage message="기업 후기 목록을 불러오지 못했습니다." />;
    }

    return (
        // TableContainer 배경색을 투명하게 설정하여 하위 행 배경색이 보이도록 함
        <TableContainer sx={{ mt: 3, bgcolor: 'transparent', borderRadius: 2 }}>
            <Table sx={{
                // 1. 테이블 행 사이의 간격을 설정 (가로 0, 세로 16px)
                borderCollapse: 'separate',
                borderSpacing: '0 16px'
            }}>
                {/* 테이블 머릿말 */}
                <TableHead sx={{
                    '& th': {
                        // TableHead 배경색 유지
                        bgcolor: 'background.box',
                        fontSize: '1.2rem',
                        fontWeight: 700,
                        color: 'text',
                        // 기존 borderBottom 제거 (border-spacing과 충돌 방지)
                        borderBottom: 'none'
                    }
                }}>
                    <TableRow>
                        {/* width를 %로 지정하여 유동적인 너비 설정 */}
                        <TableCell align='center' width="10%">번호</TableCell>
                        <TableCell align='center' width="20%">기업명</TableCell>
                        <TableCell align='center' width="45%">제목</TableCell>
                        <TableCell align='center' width="25%">작성일</TableCell>
                    </TableRow>
                </TableHead>

                {/* 테이블 본문 */}
                <TableBody>
                    {lists.length > 0 ? (
                        lists.map(({ title, createAt, companyId, reviewId, companyName }) => (
                            <TableRow
                                key={reviewId}
                                hover
                                sx={{
                                    cursor: 'pointer',
                                    bgcolor: 'background.box', // 행의 배경색 설정
                                    '& td': {
                                        fontSize: '1.25rem',
                                        borderBottom: 'none', // 하단 테두리 제거
                                        border: 'none', // 모든 테두리 제거
                                        py: 2 // 상하 패딩으로 높이 조절
                                    },
                                    // 양 끝 모서리 둥글게 (시각적으로 분리된 카드처럼 보이게 함)
                                    '& td:first-of-type': { borderTopLeftRadius: '8px', borderBottomLeftRadius: '8px' },
                                    '& td:last-of-type': { borderTopRightRadius: '8px', borderBottomRightRadius: '8px' },
                                    boxShadow: '0px 2px 4px rgba(0,0,0,0.05)' // 선택사항: 그림자
                                }}
                                onClick={() => navigate(`/companies/${companyId}/review/${reviewId}`)}
                            >
                                <TableCell align='center'>{reviewId}</TableCell>

                                <TableCell align='center'>
                                    <Typography>
                                        {companyName}
                                    </Typography>
                                </TableCell>

                                <TableCell align='left'>
                                    <Typography sx={{ '&:hover': { color: 'primary.main' } }}>
                                        {title}
                                    </Typography>
                                </TableCell>
                                <TableCell align='center'>
                                    <Typography variant='body1' sx={{ fontSize: '1.1rem' }}>
                                        {dayjs(createAt).format('YYYY년 MM월 DD일 HH:mm')}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        ))

                    ) : (
                        <TableRow>
                            {/* colSpan을 4로 수정 (열 갯수가 4개이므로) */}
                            <TableCell colSpan={4} align='center' sx={{ py: 5 }}>
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

export default MyPageReview;