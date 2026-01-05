import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const ReviewDetail = () => {
    const { companyId, reviewId } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState(null);

    useEffect(() => {
        // GET /api/companies/{companyId}/review/{reviewId}
        axios.get(`/api/companies/${companyId}/review/${reviewId}`).then(res => setData(res.data));
    }, [companyId, reviewId]);

    if (!data) return null;

    return (
        <div className="detail-container">
            <h2>{data.userId}님의 기업 후기</h2> {/* */}
            <p>직무: {data.jobCategory}</p>
            <p>단계: {data.processStep} | 결과: {data.result}</p>
            <p>등록일: {data.regDate} | 수정일: {data.modDate}</p>
            <div className="content">{data.content}</div>
            <button onClick={() => navigate(-1)}>뒤로</button>
            <button onClick={() => navigate(`/companies/${companyId}/review/${reviewId}/edit`)}>수정</button>
        </div>
    );
};

export default ReviewDetail;