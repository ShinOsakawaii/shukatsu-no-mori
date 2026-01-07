import React from "react";
import { useNavigate } from "react-router-dom";
// 경로 수정: 두 단계 위(src/)로 올라가서 constants 폴더로 진입
import { COLORS } from "../../constants/colors";

const ReviewDetailButtons = ({ isAuthor, onEditClick }) => {
    const navigate = useNavigate();

    // 버튼 공통 스타일
    const btnStyle = {
        padding: "10px 25px",
        borderRadius: "10px",
        border: "none",
        fontWeight: "bold",
        cursor: "pointer",
        fontSize: "15px",
        transition: "all 0.2s ease"
    };

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                gap: "15px",
                marginTop: "40px"
            }}
        >
            {/* 목록으로 버튼: 누구나 볼 수 있음 */}
            <button
                onClick={() => navigate(-1)}
                style={{
                    ...btnStyle,
                    backgroundColor: COLORS.brown,
                    color: "white"
                }}
                onMouseOver={(e) => (e.currentTarget.style.filter = "brightness(0.9)")}
                onMouseOut={(e) => (e.currentTarget.style.filter = "brightness(1)")}
            >
                목록으로
            </button>

            {/* 수정 버튼: 작성자(isAuthor)인 경우에만 렌더링 */}
            {isAuthor && (
                <button
                    onClick={onEditClick}
                    style={{
                        ...btnStyle,
                        backgroundColor: COLORS.primary,
                        color: "white"
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.filter = "brightness(0.9)")}
                    onMouseOut={(e) => (e.currentTarget.style.filter = "brightness(1)")}
                >
                    수정하기
                </button>
            )}
        </div>
    );
};

export default ReviewDetailButtons;