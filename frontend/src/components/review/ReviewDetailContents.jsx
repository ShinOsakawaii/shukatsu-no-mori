import React from "react";
// 현재 위치: src/components/review/ReviewDetailContents.jsx
// 목적지: src/constants/colors.js (두 단계 위로 이동)
import { COLORS } from "../../constants/colors";

const ReviewDetailContents = ({ data }) => {
    if (!data) return <p>데이터를 불러오는 중입니다...</p>;

    // 날짜 포맷팅 함수
    const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
    };

    // 스타일 정의
    const sectionStyle = {
        marginBottom: "25px",
        paddingBottom: "15px",
        borderBottom: `1px solid ${COLORS.primary}44` // 투명도 추가
    };

    const labelStyle = {
        fontSize: "14px",
        color: COLORS.brown,
        fontWeight: "bold",
        display: "block",
        marginBottom: "5px"
    };

    const contentStyle = {
        fontSize: "18px",
        color: COLORS.dark,
        lineHeight: "1.6"
    };

    return (
        <div style={{ padding: "10px" }}>
            {/* 제목 섹션 */}
            <div style={sectionStyle}>
                <span style={labelStyle}>제목</span>
                <div style={{ ...contentStyle, fontSize: "22px", fontWeight: "bold" }}>
                    {data.title}
                </div>
            </div>

            <div style={{ display: "flex", gap: "40px", ...sectionStyle }}>
                {/* 직무 */}
                <div>
                    <span style={labelStyle}>지원 직무</span>
                    <div style={contentStyle}>{data.position}</div>
                </div>
                {/* 전형 단계 */}
                <div>
                    <span style={labelStyle}>전형 단계</span>
                    <div style={contentStyle}>{data.stage}</div>
                </div>
                {/* 결과 */}
                <div>
                    <span style={labelStyle}>결과</span>
                    <div style={{ ...contentStyle, color: data.result === "합격" ? COLORS.primary : COLORS.dark }}>
                        {data.result}
                    </div>
                </div>
            </div>

            {/* 상세 내용 */}
            <div style={{ ...sectionStyle, borderBottom: "none" }}>
                <span style={labelStyle}>후기 상세 내용</span>
                <div style={{ ...contentStyle, whiteSpace: "pre-wrap" }}>
                    {data.content}
                </div>
            </div>

            {/* 작성일 */}
            <div style={{ textAlign: "right", color: "#999", fontSize: "12px" }}>
                작성일: {formatDate(data.createdAt)}
            </div>
        </div>
    );
};

export default ReviewDetailContents;