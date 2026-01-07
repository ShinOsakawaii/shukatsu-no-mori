import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchReview } from "../../api/companyReviewApi";
import ReviewDetailContents from "../../components/review/ReviewDetailContents";
import ReviewDetailButtons from "../../components/review/ReviewDetailButtons";

const ReviewDetail = () => {
    const navigate = useNavigate();
    const { companyId, reviewId } = useParams();
    const [review, setReview] = useState(null);

    useEffect(() => {
        const getDetail = async () => {
            try {
                const data = await fetchReview(companyId, reviewId);
                setReview(data);
            } catch (err) {
                console.error(err);
                alert("정보를 불러오지 못했습니다.");
                navigate(-1);
            }
        };
        getDetail();
    }, [companyId, reviewId, navigate]);

    if (!review) return null;

    return (
        <div style={{ backgroundColor: '#F2F2E4', minHeight: '100vh', padding: '40px 20px', fontFamily: 'sans-serif' }}>
            <div style={{ maxWidth: '900px', margin: '0 auto' }}>

                {/* [이미지 상단] 기업 후기 타이틀 바 */}
                <div style={{
                    backgroundColor: '#A68A71', width: '180px', margin: '0 auto 30px',
                    padding: '12px 0', borderRadius: '8px', textAlign: 'center',
                    color: 'white', fontWeight: 'bold', fontSize: '18px'
                }}>
                    기업 후기
                </div>

                {/* [이미지 중앙] 연녹색 본문 카드 */}
                <div style={{
                    backgroundColor: '#DDE5B6', borderRadius: '40px', padding: '50px',
                    boxShadow: 'none', color: '#4A4A4A'
                }}>
                    {/* 2번: 본문 내용 컴포넌트 */}
                    <ReviewDetailContents data={review} />

                    {/* 3번: 하단 버튼 컴포넌트 */}
                    <ReviewDetailButtons
                        isAuthor={review.isOwner}
                        onEditClick={() => navigate(`/companies/${companyId}/review/${reviewId}/edit`)}
                        onBackClick={() => navigate(`/companies/${companyId}`)}
                    />
                </div>
            </div>
        </div>
    );
};

export default ReviewDetail;