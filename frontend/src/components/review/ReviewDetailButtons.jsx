import React from 'react';

const ReviewDetailButtons = ({ isAuthor, onEditClick, onBackClick }) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '15px', marginTop: '30px' }}>
            {/* 뒤로 가기 버튼 (이미지의 연한 베이지색 버튼) */}
            <button
                onClick={onBackClick}
                style={{
                    backgroundColor: '#E8EAD5', border: '1px solid #C2C5A8',
                    padding: '12px 35px', borderRadius: '12px', cursor: 'pointer',
                    fontWeight: 'bold', color: '#4A4A4A', fontSize: '16px'
                }}
            >
                뒤로
            </button>

            {/* 수정 버튼 (이미지의 진한 녹색 버튼 / 작성자일 때만 표시) */}
            {isAuthor && (
                <button
                    onClick={onEditClick}
                    style={{
                        backgroundColor: '#A2AD7E', border: 'none', color: 'white',
                        padding: '12px 35px', borderRadius: '12px', cursor: 'pointer',
                        fontWeight: 'bold', fontSize: '16px'
                    }}
                >
                    수정
                </button>
            )}
        </div>
    );
};

export default ReviewDetailButtons;