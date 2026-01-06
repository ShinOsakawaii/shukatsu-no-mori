import React from "react";
import { Stack, Button } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router";

export default function AnalysisDetailButtons({ isAuthor }) {
    const { companyId } = useParams();
    if (!companyId) return null; 

    return (
        <Stack direction="row" spacing={1.5} justifyContent="flex-end">
            <Button
            component={Link} to={`/companies/${companyId}`}
                variant="outlined"
                size="small"
                sx={{
                    px: 2.5,
                    color: "#6C584C",
                    border: "1px solid #6C584C",
                    "&:hover": {backgroundColor: "#e0e7c6"}
                }}>
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
