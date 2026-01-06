// frontend/src/api/companyAnalysisApi.js
import { api } from './api';

// 기업 분석 목록 조회
export async function fetchAnalysis(companyId) {
    const res = await api.get(`/api/companies/${companyId}/detail`);
    return res.data;
}

// 기업 분석 상세 조회
export async function fetchAnalysisDetail(companyId, detailId) {
    const res = await api.get(`/api/companies/${companyId}/detail/${detailId}`);
    return res.data;
}

// 기업 분석 작성
export async function createAnalysis(companyId, payload) {
    const res = await api.post(`/api/companies/${companyId}/detail`, payload);
    return res.data;
}

// 기업 분석 수정
export async function updateAnalysis(companyId, detailId, payload) {
    const res = await api.put(
        `/api/companies/${companyId}/detail/${detailId}`,
        payload
    );
    return res.data;
}

// 기업 분석 삭제
export async function deleteAnalysis(companyId, detailId) {
    await api.delete(`/api/companies/${companyId}/detail/${detailId}`);
}
