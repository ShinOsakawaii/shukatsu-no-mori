import { Box, Button } from '@mui/material';
import React from 'react';

function MyPageButtons({ tab, setTab }) {
    return (
        <Box sx={{ justifyContent: "center", display: "flex", gap: 2, mb: 2 }}>
            <Button variant={tab === "analysis" ? "contained" : "outlined"}
                onClick={() => setTab("analysis")}>
                기업 분석
            </Button>
            <Button variant={tab === "review" ? "contained" : "outlined"}
                onClick={() => setTab("review")}>
                기업 후기
            </Button>
        </Box >
    );
}

export default MyPageButtons;