import { Button, Box, Grid, Card, CardContent, CardMedia, Typography, CardActionArea } from '@mui/material';
import { Link } from 'react-router';

function CompanyTable({ companies = [] }) {
    if (!companies.length) {
        return <Box sx={{ p: 3 }}>등록된 기업이 없습니다.</Box>;
    }

    return (
        <Box sx={{ p: 3 }}>

            {/* 버튼 영역 */}
            <Box sx={{ maxWidth: 1100, mx: "auto" }}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                    <Button
                        component={Link}
                        to="new"
                        variant="contained"
                        size="small"
                        sx={{ my: 2, px: 2, fontWeight: 600 }}
                    >
                        작성하기
                    </Button>
                </Box>

                <Grid container spacing={4} justifyContent="flex-start">
                    {companies.map((company) => (
                        <Grid item key={company.companyId} xs={12} sm={6} md={4}>
                            <Card sx={{ width: 345, borderRadius: '10px' }}>
                                <CardActionArea component={Link} to={`/${company.companyId}`}>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={company.companyImage}
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