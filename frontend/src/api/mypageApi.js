// frontend/src/api/mypageApi.js
import { api } from './api';

// 내가 작성한 기업 분석 목록
export async function fetchMyDetails(params) {
    const res = await api.get('/mypage/details', { params });
    return res.data;
}

// 내가 작성한 기업 후기 목록
export async function fetchMyReviews(params) {
    const res = await api.get('/mypage/reviews', { params });
    return res.data;
}

// 마이페이지 기본 정보 조회
export async function fetchMyPage(userId) {
    const res = await api.get(`/mypage/${userId}`);
    return res.data;
}


// 마이페이지 수정 API
export async function updateMyProfile({
    nickname,
    password,
    rePassword,
    profileImage,
}) {
    const payload = {
        nickname,
        profileImage, // URL string or null
        ...(password
            ? { password, rePassword }
            : {}),
    };
    console.log(nickname,
        password,
        rePassword,
        profileImage,);
    console.log("➡️ updateMyProfile payload:", payload);

    const res = await api.patch("/api/user/myinfo", payload);
    return res.data;
}

export async function changePassword({ password, rePassword }) {
    const payload = { password, rePassword };   // ✅ 비번만
    console.log("➡️ changePassword payload:", payload);

    const res = await api.patch("/api/user/myinfo", payload);
    return res.data;
}
