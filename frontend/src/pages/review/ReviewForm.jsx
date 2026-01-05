import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const ReviewForm = ({ mode }) => {
    const { companyId, reviewId } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ title: '', jobCategory: '', processStep: 'ES', result: '합격', content: '' });

    useEffect(() => {
        if (mode === 'edit') {
            axios.get(`/api/companies/${companyId}/review/${reviewId}`).then(res => setFormData(res.data));
        }
    }, [mode, companyId, reviewId]);

    const handleDelete = async () => {
        if (window.confirm("해당 글을 정말 삭제하겠습니까?")) { //
            await axios.delete(`/api/companies/${companyId}/review/${reviewId}`);
            alert("삭제되었습니다.");
            navigate(`/companies/${companyId}/review`); // 삭제 후 목록 이동
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (mode === 'edit') {
            await axios.put(`/api/companies/${companyId}/review/${reviewId}`, formData);
        } else {
            await axios.post(`/api/companies/${companyId}/review`, formData);
        }
        navigate(`/companies/${companyId}/review`);
    };

    return (
        <div className="form-container">
            {mode === 'edit' && <button onClick={handleDelete} className="btn-delete">삭제</button>} {/* */}
            <form onSubmit={handleSubmit}>
                <input name="title" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} placeholder="제목" />
                <input name="jobCategory" value={formData.jobCategory} onChange={e => setFormData({ ...formData, jobCategory: e.target.value })} placeholder="직군" />
                <select name="processStep" value={formData.processStep} onChange={e => setFormData({ ...formData, processStep: e.target.value })}>
                    <option value="최종 면접">최종 면접</option>
                </select>
                <textarea value={formData.content} onChange={e => setFormData({ ...formData, content: e.target.value })} />
                <button type="button" onClick={() => navigate(-1)}>취소</button>
                <button type="submit">{mode === 'edit' ? '수정' : '저장'}</button>
            </form>
        </div>
    );
};

export default ReviewForm;