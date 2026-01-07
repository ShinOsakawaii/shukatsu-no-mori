import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';

const ReviewForm = ({ mode = "create" }) => {
    const navigate = useNavigate();
    const { companyId, reviewId } = useParams();
    const isEdit = mode === "edit";

    // 1. 현재 사용자 정보 가져오기
    const { me, isLoading: meLoading } = useMe();

    const [formData, setFormData] = useState({
        title: "",
        position: "",
        stage: "",
        result: "",
        content: ""
    });

    // 2. 권한 및 데이터 로드 로직
    useEffect(() => {
        // [강력 차단] 토큰이 아예 없으면 로그인 페이지로 보냄
        const token = localStorage.getItem("accessToken");
        if (!token) {
            alert("로그인이 필요한 서비스입니다.");
            navigate("/auth/login", { replace: true });
            return;
        }

        // 수정 모드일 때 기존 데이터 불러오기
        if (isEdit && reviewId) {
            const getDetail = async () => {
                try {
                    const data = await fetchReview(companyId, reviewId);

                    // [보안] 작성자와 현재 로그인 유저가 다르면 차단 (me 로딩 완료 후 체크)
                    if (!meLoading && me && data.nickname !== me.nickname) {
                        alert("수정 권한이 없습니다.");
                        navigate(`/companies/${companyId}`);
                        return;
                    }

                    // 데이터 바인딩 (입력창에 값 채우기)
                    setFormData({
                        title: data.title || "",
                        position: data.position || "",
                        stage: data.stage || "",
                        result: data.result || "",
                        content: data.content || ""
                    });
                } catch (err) {
                    console.error("데이터 로드 실패:", err);
                    alert("정보를 불러오지 못했습니다.");
                    navigate(-1);
                }
            };
            getDetail();
        }
    }, [isEdit, reviewId, companyId, navigate, me, meLoading]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // 3. 저장 및 수정 실행 로직
    const handleSave = async () => {
        // 필수값 검증 (간단히)
        if (!formData.title || !formData.content) {
            alert("제목과 내용을 모두 입력해주세요.");
            return;
        }

        const numericCompanyId = Number(companyId);
        const payload = {
            ...formData,
            companyId: numericCompanyId
        };

        try {
            if (isEdit) {
                // 수정 처리
                await updateReview(numericCompanyId, reviewId, payload);
                alert("수정되었습니다.");
                navigate(`/companies/${numericCompanyId}/review/${reviewId}`);
            } else {
                // 등록 처리
                const response = await createReview(numericCompanyId, payload);
                alert("등록되었습니다.");

                // 생성된 새 ID로 이동 (서버 응답 구조에 맞춤)
                const newReviewId = response.reviewId || response.id;
                if (newReviewId) {
                    navigate(`/companies/${numericCompanyId}/review/${newReviewId}`);
                } else {
                    navigate(`/companies/${numericCompanyId}`);
                }
            }
        } catch (err) {
            console.error("저장 실패:", err.response?.data);
            alert("저장에 실패했습니다. 다시 시도해주세요.");
        }
    };

    // --- 디자인 스타일 (CSS-in-JS) ---
    const labelStyle = { display: 'block', fontWeight: 'bold', color: '#6B6040', marginBottom: '8px', fontSize: '15px' };
    const inputStyle = { width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #C2C5A8', boxSizing: 'border-box', outline: 'none', backgroundColor: 'white' };
    const selectStyle = { ...inputStyle, appearance: 'none', background: 'white url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%236B6040%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C/polyline%3E%3C/svg%3E") no-repeat right 12px center' };

    return (
        <div style={{ backgroundColor: '#F2F2E4', minHeight: '100vh', padding: '40px 20px' }}>
            <div style={{ maxWidth: '900px', margin: '0 auto', backgroundColor: '#DDE5B6', borderRadius: '40px', padding: '50px' }}>

                {/* 제목 섹션 */}
                <div style={{ marginBottom: '25px' }}>
                    <label style={labelStyle}>후기 제목</label>
                    <input name="title" value={formData.title} onChange={handleChange} style={inputStyle} placeholder="예: 2026 상반기 개발직군 면접 후기" />
                </div>

                {/* 직무 섹션 */}
                <div style={{ marginBottom: '25px' }}>
                    <label style={labelStyle}>지원 직무</label>
                    <input name="position" value={formData.position} onChange={handleChange} style={inputStyle} placeholder="예: 프론트엔드 개발자" />
                </div>

                {/* 단계 및 결과 섹션 */}
                <div style={{ display: 'flex', gap: '20px', marginBottom: '25px' }}>
                    <div style={{ flex: 1 }}>
                        <label style={labelStyle}>전형 단계</label>
                        <select name="stage" value={formData.stage} onChange={handleChange} style={selectStyle}>
                            <option value="">선택하세요</option>
                            <option value="서류전형">서류전형</option>
                            <option value="1차면접">1차면접</option>
                            <option value="최종면접">최종면접</option>
                        </select>
                    </div>
                    <div style={{ flex: 1 }}>
                        <label style={labelStyle}>결과</label>
                        <select name="result" value={formData.result} onChange={handleChange} style={selectStyle}>
                            <option value="">선택하세요</option>
                            <option value="합격">합격</option>
                            <option value="불합격">불합격</option>
                            <option value="대기중">대기중</option>
                        </select>
                    </div>
                </div>

                {/* 내용 섹션 */}
                <div style={{ marginBottom: '40px' }}>
                    <label style={labelStyle}>상세 내용</label>
                    <textarea
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        style={{ ...inputStyle, height: '300px', resize: 'none' }}
                        placeholder="면접 질문이나 분위기 등 자유로운 후기를 남겨주세요."
                    />
                </div>

                {/* 하단 버튼 */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
                    <button
                        onClick={() => navigate(-1)}
                        style={{ backgroundColor: '#A68A71', color: 'white', border: 'none', padding: '12px 45px', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', fontSize: '18px' }}
                    >
                        취소
                    </button>
                    <button
                        onClick={handleSave}
                        style={{ backgroundColor: '#A2AD7E', color: 'white', border: 'none', padding: '12px 45px', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', fontSize: '18px' }}
                    >
                        {isEdit ? "수정하기" : "등록하기"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReviewForm;