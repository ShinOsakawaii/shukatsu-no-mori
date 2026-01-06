import React from "react";
import { Box, Typography, Divider } from "@mui/material";
import dayjs from "dayjs";

export default function AnalysisDetailHeader({ dummyAnalysis }) {
    const { title, position, nickname, createdDate, updatedDate } = dummyAnalysis;

    return (
        <>
            <Typography
                variant='subtitle1'
                sx={{
                    color: "#6C584C",
                    fontWeight: 700,
                    mb: 3.5
                }}>
                {nickname}님의 기업 분석
            </Typography>

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    color: "#6C584C",
                    mb: 2,
                    flexWrap: "wrap"
                }}>

                <Typography
                    variant='body1'
                    sx={{
                        color: "#6C584C",
                        fontWeight: 500
                    }}>
                    {title}
                </Typography>

                <Typography
                    variant='body1'
                    sx={{
                        color: "#6C584C",
                        fontWeight: 500
                    }}>
                    {position}
                </Typography>

                <Typography
                    variant="body2"
                    sx={{
                        color: "#6C584C",
                        fontWeight: 500
                    }}>
                    등록일: {dayjs(createdDate).format("YYYY/MM/DD")}
                </Typography>

                <Typography
                    variant="body2"
                    sx={{
                        color: "#6C584C",
                        fontWeight: 500
                    }}>
                    수정일: {dayjs(updatedDate).format("YYYY/MM/DD")}
                </Typography>
            </Box>

            <Divider sx={{ mb: 2 }} />
        </>
    );
}