import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

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
                } catch (err) { console.error(err); }
            };
            loadReview();
        }
    }, [isEdit, companyId, reviewId]);

    const handleSave = async () => {
        if (!formData.stage || !formData.result) {
            alert("선고 단계와 결과를 모두 선택해주세요.");
            return;
        }

        try {
            if (isEdit) {
                await updateReview(companyId, reviewId, formData);
                alert("수정되었습니다.");
            } else {
                await createReview(companyId, formData);
                alert("등록되었습니다.");
            }
            navigate(-1);
        } catch (err) { alert("저장에 실패했습니다."); }
    };

    const handleDelete = async () => {
        if (window.confirm("정말로 이 후기를 삭제하시겠습니까?")) {
            try {
                await deleteReview(companyId, reviewId);
                alert("삭제되었습니다.");
                navigate('/company/write');
            } catch (err) { alert("삭제 실패"); }
        }
    };

    return (
        <div style={{ backgroundColor: COLORS.bg, minHeight: '100vh', padding: '20px' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <div style={{ display: 'flex', justifyContent: 'flex-end', height: '40px' }}>
                    {isEdit && (
                        <button onClick={handleDelete} style={{ backgroundColor: '#FF0000', color: 'white', border: 'none', padding: '5px 20px', borderRadius: '5px', cursor: 'pointer' }}>
                            삭제
                        </button>
                    )}
                </div>
                <div style={{ textAlign: 'center' }}>
                    <ReviewCommonHeader title="기업 후기" />
                </div>
                <div style={{ backgroundColor: COLORS.light, borderRadius: '30px', padding: '30px' }}>
                    <ReviewFormContents formData={formData} setFormData={setFormData} />
                    <ReviewFormButtons isEdit={isEdit} onSubmit={handleSave} onCancel={() => navigate(-1)} />
                </div>
            </div>
        </div>
    );
};

export default ReviewForm;