import React from 'react';

const ReviewDetailButtons = ({ isAuthor, onEditClick, onBackClick }) => {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '20px',
            marginTop: '40px'
        }}>
            {/* 1. 언제나 보이는 취소/뒤로 버튼 */}
            <button
                onClick={onBackClick}
                style={{
                    backgroundColor: '#A68A71', // 이미지와 동일한 갈색
                    color: 'white',
                    border: 'none',
                    padding: '12px 45px',
                    borderRadius: '12px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    fontSize: '18px'
                }}
            >
                {isAuthor ? "취소" : "뒤로"}
            </button>

            {/* 2. 작성자일 때만 보이는 수정 버튼 */}
            {isAuthor && (
                <button
                    onClick={onEditClick}
                    style={{
                        backgroundColor: '#A2AD7E', // 이미지와 동일한 연두색
                        color: 'white',
                        border: 'none',
                        padding: '12px 45px',
                        borderRadius: '12px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        fontSize: '18px'
                    }}
                >
                    수정
                </button>
            )}
        </div>
    );
};

// ❗ 이 부분이 누락되어 에러가 발생한 것입니다.
export default ReviewDetailButtons;