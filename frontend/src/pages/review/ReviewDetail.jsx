import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { COLORS } from "../../constants/colors";
import { fetchReview, deleteReview } from "../../api/companyReviewApi";
import ReviewCommonHeader from "../../components/review/ReviewCommonHeader";
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
        <div style={{ backgroundColor: COLORS.bg, minHeight: '100vh', padding: '20px' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <ReviewCommonHeader title="기업 후기 상세" />
                <div style={{ backgroundColor: COLORS.light, borderRadius: '30px', padding: '30px' }}>
                    <ReviewDetailContents data={review} />
                    <ReviewDetailButtons
                        isAuthor={true} // 나중에 본인 확인 로직 추가
                        onEditClick={() => navigate(`/company/${companyId}/review/edit/${reviewId}`)}
                    />
                </div>
            </div>
        </div>
    );
};

// ⚠️ 이게 있어야 에러가 안 납니다!
export default ReviewDetail;