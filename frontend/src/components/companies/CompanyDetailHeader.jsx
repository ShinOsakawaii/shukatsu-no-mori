import React from 'react';
import { Box, Typography, Button, Link  } from "@mui/material";
import { Link as RouterLink, useParams } from "react-router";
//헤더랑 컴퍼니 디테일 수정
function CompanyDetailHeader({ company }) {
    const { companyId } = useParams();
    if (!company) return null;
    const {
        name,
        industry,
        city,
        website,
        description,
        companyImage,
    } = company;


    return (
        <Box
            sx={{
                backgroundColor: "#ADC178",
                borderRadius: 3,
                p: 3,
                mb: 3,
                display: "flex",
                alignItems: "center",
                gap: 3,
            }}
        >
            {/* 상단: 이미지 + 기본 정보 */}
            <Box sx={{ display: "flex", gap: 3 }}>
                <Box
                    component="img"
                    src={companyImage}
                    alt={name}
                    sx={{
                        width: 120,
                        height: 120,
                        objectFit: "cover",
                        borderRadius: 2,
                        backgroundColor: "#fff",
                    }}
                />
                <Box sx={{ flex: 1 }}>
                    <Typography variant="h5" fontWeight="bold">
                        {name}
                    </Typography>

                    <Typography variant="body2" sx={{ mt: 0.5 }}>
                        {industry}{city ? ` · ${city}` : ""}
                    </Typography>

                    {website && (
                        <Link
                            href={website}
                            target="_blank"
                            rel="noopener noreferrer"
                            underline="hover"
                            sx={{ display: "block", mt: 1 }}
                        >
                            {website}
                        </Link>
                    )}
                </Box>
               

                {/* 수정 버튼 */}
                <Button
                    component={RouterLink}
                    to={`/companies/${companyId}/edit`}
                    variant="contained"
                    sx={{
                        height: 40,
                        backgroundColor: "#A98467",
                        "&:hover": { backgroundColor: "#8C6A52" },
                    }}
                >
                    기업 정보 수정
                </Button>
            </Box>

            {/* 설명 */}
            {description && (
                <Typography sx={{ mt: 3, whiteSpace: "pre-wrap" }}>
                    {description}
                </Typography>
            )}
            
        </Box>
    );
}

export default CompanyDetailHeader;