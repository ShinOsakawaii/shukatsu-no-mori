import React from 'react';
import { Box, Typography, Divider } from "@mui/material";
import dayjs from "dayjs";

export default function ReviewDetailHeader({ review }) {

    const { title, position, nickname, stage, result, createdDate, updatedDate } = review;

 return (
        <>
            {/* 닉네임 */}

            <Typography
                variant="subtitle1"
                sx={{
                    color: "#6C584C",
                    fontWeight: 700,
                    mb: 2
                }}
            >
                {nickname}님의 기업 후기
            </Typography>

            {/* 제목 / 직군 */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 1.5,
                    color: "#6C584C",
                }}
            >
                <Typography fontWeight={500}>
                    {title}
                </Typography>

                <Typography fontWeight={500}>
                    {position}
                </Typography>
            </Box>

            {/* 전형 단계 / 결과 / 날짜 */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    color: "#6C584C",
                    fontSize: 14,
                    mb: 2,
                    flexWrap: "wrap",
                    gap: 1
                }}
            >
                {/* 좌측: 단계 + 결과 */}
                <Box sx={{ display: "flex", gap: 2 }}>
                    <Typography variant="body2">
                        {stage}
                    </Typography>
                    
                    <Typography variant="body2">
                        {result}
                    </Typography>
                </Box>

                {/* 우측: 날짜 */}
                <Box sx={{ display: "flex", gap: 2 }}>
                    <Typography variant="body2">
                        등록일: {dayjs(createdDate).format("YYYY/MM/DD")}
                    </Typography>
                    <Typography variant="body2">
                        수정일: {dayjs(updatedDate).format("YYYY/MM/DD")}
                    </Typography>
                </Box>
            </Box>

            <Divider sx={{ mb: 2 }} />
        </>
    );
}