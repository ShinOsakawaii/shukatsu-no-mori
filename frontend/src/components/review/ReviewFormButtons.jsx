import React from "react";
// 현재 위치: src/components/review/ReviewFormButtons.jsx
// 목적지: src/constants/colors.js (두 단계 위로 이동)
import { COLORS } from "../../constants/colors";

const ReviewFormButtons = ({ isEdit, onSubmit, onCancel }) => {
    // 버튼 공통 스타일
    const btnStyle = {
        padding: "10px 30px",
        borderRadius: "10px",
        border: "none",
        fontWeight: "bold",
        cursor: "pointer",
        fontSize: "16px",
        transition: "opacity 0.2s"
    };

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                gap: "20px",
                marginTop: "30px"
            }}
        >
            {/* 취소 버튼 */}
            <button
                type="button"
                onClick={onCancel}
                style={{
                    ...btnStyle,
                    backgroundColor: COLORS.brown,
                    color: "white"
                }}
                onMouseOver={(e) => (e.currentTarget.style.opacity = "0.8")}
                onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
            >
                취소
            </button>

            {/* 저장/수정 버튼 */}
            <button
                type="button"
                onClick={onSubmit}
                style={{
                    ...btnStyle,
                    backgroundColor: COLORS.primary,
                    color: "white"
                }}
                onMouseOver={(e) => (e.currentTarget.style.opacity = "0.8")}
                onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
            >
                {isEdit ? "수정 완료" : "등록하기"}
            </button>
        </div>
    );
};

export default ReviewFormButtons;