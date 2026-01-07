import React from 'react';
// 1. 설치한 dayjs를 불러옵니다.
import dayjs from 'dayjs';

const ReviewDetailContents = ({ data }) => {
    return (
        <div style={{ color: '#4A4A4A' }}>
            <h2 style={{ fontSize: '26px', marginBottom: '35px', fontWeight: 'bold' }}>
                {data.nickname}님의 기업 후기
            </h2>

            {/* 제목과 직군 */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span style={{ fontSize: '20px', fontWeight: 'bold' }}>{data.title}</span>
                <span style={{ fontSize: '20px', fontWeight: 'bold' }}>{data.position}</span>
            </div>

            {/* 2. 날짜 표시 부분: dayjs().format()을 사용합니다. */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '10px' }}>
                <div style={{ display: 'flex', gap: '25px', fontWeight: '600' }}>
                    <span>{data.stage}</span>
                    <span>{data.result}</span>
                </div>
                <div style={{ display: 'flex', gap: '20px', color: '#666', fontSize: '14px' }}>
                    {/* 이미지처럼 YYYY/MM/DD 형식으로 출력 */}
                    <span>등록일: {dayjs(data.createdAt).format('YYYY/MM/DD')}</span>
                    <span>수정일: {dayjs(data.updatedAt).format('YYYY/MM/DD')}</span>
                </div>
            </div>

            <hr style={{ border: '0', height: '1.5px', backgroundColor: '#A2AD7E', margin: '10px 0 45px' }} />

            <div style={{ minHeight: '280px', lineHeight: '1.9', fontSize: '17px', whiteSpace: 'pre-wrap' }}>
                {data.content}
            </div>
        </div>
    );
};

export default ReviewDetailContents;