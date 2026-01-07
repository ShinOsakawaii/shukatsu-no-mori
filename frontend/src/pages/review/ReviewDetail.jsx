import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchReview } from "../../api/companyReviewApi";
import { useMe } from "../../hooks/useMe";
import ReviewDetailContents from "../../components/review/ReviewDetailContents";
import ReviewDetailButtons from "../../components/review/ReviewDetailButtons";

const ReviewDetail = () => {
    const navigate = useNavigate();
    const { companyId, reviewId } = useParams();
    const [review, setReview] = useState(null);

    // 1. 내 정보 가져오기 (수정된 useMe 사용)
    const { me, isLoading: meLoading } = useMe();

    useEffect(() => {
        const getDetail = async () => {
            try {
                const data = await fetchReview(companyId, reviewId);
                setReview(data);
            } catch (err) {
                console.error("데이터 로드 실패:", err);
                alert("정보를 불러오지 못했습니다.");
                navigate(-1);
            }
        };
        getDetail();
    }, [companyId, reviewId, navigate]);

    // 데이터 로딩 중일 때 처리
    if (!review || meLoading) return null;

    // 2. [핵심] 본인 확인 로직
    // 내 닉네임과 리뷰 작성자 닉네임이 같으면 수정 권한을 부여합니다.
    const isAuthor = me && review && me.nickname === review.nickname;

    return (
        <div style={{ backgroundColor: '#F2F2E4', minHeight: '100vh', padding: '40px 20px' }}>
            <div style={{ maxWidth: '900px', margin: '0 auto' }}>

                {/* 상단 타이틀 부문 */}
                <div style={{
                    backgroundColor: '#A68A71', width: '180px', margin: '0 auto 30px',
                    padding: '12px 0', borderRadius: '8px', textAlign: 'center',
                    color: 'white', fontWeight: 'bold'
                }}>
                    기업 후기
                </div>

                {/* 메인 콘텐츠 카드 */}
                <div style={{ backgroundColor: '#DDE5B6', borderRadius: '40px', padding: '50px' }}>
                    <ReviewDetailContents data={review} />

                    {/* 3. 버튼 컴포넌트에 권한 전달 */}
                    <ReviewDetailButtons
                        isAuthor={isAuthor}
                        onEditClick={() => navigate(`/companies/${companyId}/review/${reviewId}/edit`)}
                        onBackClick={() => navigate(`/companies/${companyId}`)}
                    />
                </div>
            </div>
        </div>
    );
};

export default ReviewDetail;