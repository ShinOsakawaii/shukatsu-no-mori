import React from "react";
// 현재 위치: src/components/review/ReviewFormContents.jsx
// 목적지: src/constants/colors.js (두 단계 위로 이동)
import { COLORS } from "../../constants/colors";

const ReviewFormContents = ({ formData, setFormData }) => {
    const stages = ["ES", "1차 면접", "2차 면접", "최종 면접", "적성 검사", "기타"];
    const results = ["합격", "불합격", "대기 중"];

    // 입력값 변경 핸들러
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // 스타일 정의
    const labelStyle = {
        display: "block",
        marginBottom: "8px",
        fontWeight: "bold",
        color: COLORS.dark,
    };

    const inputStyle = {
        width: "100%",
        padding: "12px",
        borderRadius: "10px",
        border: `2px solid ${COLORS.primary}`,
        marginBottom: "20px",
        boxSizing: "border-box",
    };

    return (
        <div>
            {/* 제목 */}
            <label style={labelStyle}>후기 제목</label>
            <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="예: 2026 상반기 개발직군 면접 후기"
                style={inputStyle}
            />

            {/* 직무 */}
            <label style={labelStyle}>지원 직무</label>
            <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleChange}
                placeholder="예: 프론트엔드 개발자"
                style={inputStyle}
            />

            <div style={{ display: "flex", gap: "20px" }}>
                {/* 전형 단계 */}
                <div style={{ flex: 1 }}>
                    <label style={labelStyle}>전형 단계</label>
                    <select
                        name="stage"
                        value={formData.stage}
                        onChange={handleChange}
                        style={inputStyle}
                    >
                        <option value="">선택하세요</option>
                        {stages.map((s) => (
                            <option key={s} value={s}>{s}</option>
                        ))}
                    </select>
                </div>

                {/* 결과 */}
                <div style={{ flex: 1 }}>
                    <label style={labelStyle}>결과</label>
                    <select
                        name="result"
                        value={formData.result}
                        onChange={handleChange}
                        style={inputStyle}
                    >
                        <option value="">선택하세요</option>
                        {results.map((r) => (
                            <option key={r} value={r}>{r}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* 상세 내용 */}
            <label style={labelStyle}>상세 내용</label>
            <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                placeholder="면접 질문이나 분위기 등 자유로운 후기를 남겨주세요."
                style={{ ...inputStyle, minHeight: "200px", resize: "vertical" }}
            />
        </div>
    );
};

export default ReviewFormContents;