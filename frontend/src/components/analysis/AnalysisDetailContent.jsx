import React from "react";
import { Typography } from "@mui/material";

export default function AnalysisDetailContent({ analysis }) {

    return (
        <Typography
            variant="body1"
            sx={{
                mb: 3,
                color: "#6C584C",
                lineHeight: 1.6
            }}>
            {analysis.content}
        </Typography>
    );
}
