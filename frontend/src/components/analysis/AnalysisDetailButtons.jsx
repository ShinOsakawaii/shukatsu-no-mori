import React from "react";
import { Stack, Button } from "@mui/material";

export default function AnalysisDetailButtons({ isAuthor }) {
    return (
        <Stack direction="row" spacing={1.5} justifyContent="flex-end">
            <Button
                variant="outlined"
                size="small"
                sx={{
                    px: 2.5,
                    color: "#6C584C",
                    border: "1px solid #6C584C",
                    "&:hover": {backgroundColor: "#e0e7c6"}
                }}
                onClick={() => navigate(-1)}>
                뒤로
            </Button>

            {isAuthor &&
                <Button
                    variant="contained"
                    size="small"
                    sx={{ px: 2.5, 
                        color: "#6C584C",
                        bgcolor: "#ABC178" }}
                    onClick={() => alert("수정 클릭!")}>
                    수정
                </Button>}

        </Stack>
    );
}
