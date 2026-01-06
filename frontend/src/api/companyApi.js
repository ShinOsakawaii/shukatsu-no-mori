// frontend/src/api/companyApi.js
import { api } from './api';

// 기업 목록 조회
export async function fetchCompanies(params) {
    const res = await api.get('/api/companies', { params });
    return res.data;
}

// 기업 상세 조회
export async function fetchCompany(companyId) {
    const res = await api.get(`/api/companies/${companyId}`);
    return res.data;
}

// 기업 등록
export async function createCompany(payload) {
    const res = await api.post('/api/companies/new', payload);
    return res.data;
}

// 기업 수정
export async function updateCompany(companyId, payload) {
    const res = await api.put(`/api/companies/${companyId}/edit`, payload);
    return res.data;
}

// // 기업 삭제
// export async function deleteCompany(companyId) {
//     await api.delete(`/companies/${companyId}`);
// }
