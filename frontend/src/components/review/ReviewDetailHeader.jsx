import React from "react";
import { Box, Typography, Divider } from "@mui/material";
import dayjs from "dayjs";

export default function ReviewDetailHeader({ review }) {
    const { nickname, title, position, stage, result, createdDate, updatedDate } = review;

    return (
        <>
            <Typography
                variant='subtitle1'
                sx={{
                    color: "#6C584C",
                    fontWeight: 700,
                    mb: 3.5
                }}>
                {nickname}님의 기업 후기
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

                {/* 추가된 stage 부분 */}
                <Typography
                    variant='body1'
                    sx={{
                        color: "#6C584C",
                        fontWeight: 500
                    }}>
                    {stage}
                </Typography>

                {/* 추가된 result 부분 */}
                <Typography
                    variant='body1'
                    sx={{
                        color: "#6C584C",
                        fontWeight: 500
                    }}>
                    {result}
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