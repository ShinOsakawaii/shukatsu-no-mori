import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';

// 상위 폴더(src/)로 두 번 올라가서 참조
import { COLORS } from "../../constants/colors";
import { createReview, updateReview, deleteReview, fetchReview } from "../../api/companyReviewApi";
import ReviewCommonHeader from "../../components/review/ReviewCommonHeader.jsx";
import ReviewFormContents from "../../components/review/ReviewFormContents.jsx";
import ReviewFormButtons from "../../components/review/ReviewFormButtons.jsx";

const ReviewForm = ({ isEdit }) => {
    const navigate = useNavigate();
    const { companyId, reviewId } = useParams();

    const [formData, setFormData] = useState({
        title: '',
        position: '',
        stage: '',
        result: '',
        content: ''
    });

    // [데이터 로드] 수정 모드일 때 기존 데이터 불러오기
    useEffect(() => {
        if (isEdit && reviewId) {
            const loadReview = async () => {
                try {
                    const data = await fetchReview(companyId, reviewId);
                    setFormData({
                        title: data.title,
                        position: data.position,
                        stage: data.stage,
                        result: data.result,
                        content: data.content
                    });
                } catch (err) {
                    console.error("데이터 불러오기 실패:", err);
                }
            };
            loadReview();
        }
    }, [isEdit, companyId, reviewId]);

    // [저장 로직] 등록 또는 수정 실행
    const handleSave = async () => {
        // URL에서 가져온 companyId는 문자열일 수 있으므로 숫자로 변환합니다.
        const numericCompanyId = Number(companyId);

        // [수정 포인트] payload에 companyId를 반드시 포함시킵니다.
        const payload = {
            ...formData,
            companyId: numericCompanyId // 서버가 기다리는 필수 값
        };

        console.log("서버로 보내는 최종 데이터:", payload);

        try {
            if (isEdit) {
                await updateReview(numericCompanyId, reviewId, payload);
                alert("수정되었습니다.");
                navigate(`/companies/${numericCompanyId}/review/${reviewId}`);
            } else {
                const response = await createReview(numericCompanyId, payload);
                alert("등록되었습니다.");

                // 서버 응답 구조(ReviewResponse)에 따라 ID 추출
                const newReviewId = response.reviewId || response.id;
                navigate(`/companies/${numericCompanyId}/review/${newReviewId}`);
            }
        } catch (err) {
            console.error("에러 발생:", err.response?.data);
            alert("저장에 실패했습니다. 데이터를 확인해주세요.");
        }
    };

    // [삭제 로직] 후기 삭제 실행
    const handleDelete = async () => {
        if (window.confirm("정말로 이 후기를 삭제하시겠습니까?")) {
            try {
                await deleteReview(companyId, reviewId);
                alert("삭제되었습니다.");
                // 삭제 후 해당 기업 페이지로 이동하도록 수정
                navigate(`/company/${companyId}`);
            } catch (err) {
                alert("삭제 실패");
            }
        }
    };

    return (
        <div style={{ backgroundColor: COLORS.bg, minHeight: '100vh', padding: '20px' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                {/* 상단 우측 삭제 버튼 (수정 모드에서만 표시) */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', height: '40px', marginBottom: '10px' }}>
                    {isEdit && (
                        <button
                            onClick={handleDelete}
                            style={{
                                backgroundColor: '#FF4D4D',
                                color: 'white',
                                border: 'none',
                                padding: '8px 20px',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontWeight: 'bold'
                            }}
                        >
                            삭제하기
                        </button>
                    )}
                </div>

                <div style={{ textAlign: 'center' }}>
                    <ReviewCommonHeader title={isEdit ? "기업 후기 수정" : "기업 후기 작성"} />
                </div>

                <div style={{ backgroundColor: COLORS.light, borderRadius: '30px', padding: '30px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
                    <ReviewFormContents formData={formData} setFormData={setFormData} />
                    <ReviewFormButtons
                        isEdit={isEdit}
                        onSubmit={handleSave}
                        onCancel={() => navigate(-1)}
                    />
                </div>
            </div>
        </div>
    );
};

export default ReviewForm;