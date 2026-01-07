import React from "react";
// 현재 위치: src/components/review/ReviewCommonHeader.jsx
// 경로 수정: 두 단계 위(src/)로 올라가서 constants 폴더의 colors.js 참조
import { COLORS } from "../../constants/colors";

const ReviewCommonHeader = ({ title }) => {
    return (
        <div style={{ marginBottom: "30px" }}>
            <h1
                style={{
                    color: COLORS.dark,
                    fontSize: "28px",
                    fontWeight: "bold",
                    borderBottom: `4px solid ${COLORS.primary}`,
                    display: "inline-block",
                    paddingBottom: "5px"
                }}
            >
                {title}
            </h1>
        </div>
    );
};

export default ReviewCommonHeader;