import { api } from './api';

// 기업 후기 목록 조회
// export async function fetchReviews(companyId) {
//     const res = await api.get(`/api/companies/${companyId}/review`);
//     return res.data;
// }
export async function fetchReviews(companyId) {
    const res = await api.get(`/api/companies/${companyId}/review`);
    return res.data;
}

// 기업 후기 상세 조회
export async function fetchReview(companyId, reviewId) {
    const res = await api.get(`/api/companies/${companyId}/review/${reviewId}`);
    return res.data;
}

// 기업 후기 작성
export async function createReview(companyId, payload) {
    const res = await api.post(`/api/companies/${companyId}/review`, payload);
    return res.data;
}

// 기업 후기 수정
export async function updateReview(companyId, reviewId, payload) {
    const res = await api.put(
        `/api/companies/${companyId}/review/${reviewId}`,
        payload
    );
    return res.data;
}

// 기업 후기 삭제
export async function deleteReview(companyId, reviewId) {
    await api.delete(`/api/companies/${companyId}/review/${reviewId}`);
}
