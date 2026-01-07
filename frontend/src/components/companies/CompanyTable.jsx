import { Button, Box, Grid, Card, CardContent, CardMedia, Typography, CardActionArea } from '@mui/material';
import { Link, useNavigate } from 'react-router';
import { getToken } from '../../api/authApi';

function CompanyTable({ companies = [] }) {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const navigate = useNavigate();

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
        <Box sx={{ p: 3 }}>

            {/* 버튼 영역 */}
            <Box sx={{ maxWidth: 1100, mx: "auto" }}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                    <Button
                        onClick={handleCreateClick}
                        variant="contained"
                        size="small"
                        sx={{ my: 2, px: 2, fontWeight: 600 }}
                    >
                        등록하기
                    </Button>
                </Box>
                {!companies.length && (
                    <Box sx={{ p: 3, textAlign: 'center' }}>
                        등록된 기업이 없습니다.
                    </Box>
                )}
                <Grid container spacing={4} justifyContent="flex-start">
                    {companies.map((company) => (
                        <Grid key={company.companyId}
                            sx={{ width: 345, flexShrink: 0 }}>
                            <Card sx={{ width: 345, borderRadius: '10px' }}>
                                <CardActionArea component={Link} to={`${company.companyId}`}>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={`${API_BASE_URL}${company.companyImage}`}
                                        alt={company.name} // 랜덤 색상 지정?
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h6" sx={{ fontWeight: 700 }}>
                                            {company.name}
                                        </Typography>

                                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                            업계&nbsp;&nbsp;{company.industry}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                            위치&nbsp;&nbsp;{company.location?.city}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
}

export default CompanyTable;