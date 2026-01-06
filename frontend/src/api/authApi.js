import { api } from './api'

// 인증 관리 api

// useMe() 커스텀 훅에서 사용
export const ME_QUERY_KEY = ['me'];

// 로컬 스토리지에서 토큰 읽기
export function getToken() {
    return localStorage.getItem("accessToken");
}

// 로그인 성공 후 토큰 저장
export function setAuth({ accessToken }) {
    localStorage.setItem("accessToken", accessToken);
}

// 로그아웃 시 토큰 삭제
export function clearAuth() {
    localStorage.removeItem("accessToken");
}

// 로그인한 사용자 정보 가져오기
// ❗ 명세서에 없으면 일단 그대로 두거나 주석 처리해도 됨
export async function fetchMe() {
    // const res = await api.get("/api/user/myinfo");
    // return res.data;
    return null;
}

// 로그인
export async function login({ email, password }) {
    const res = await api.post("/api/user/login", {
        email,
        password
    });
    return res.data; // { accessToken: "..." }
}

// 회원가입
export async function register({ email, password, rePassword, nickname, profileImage }) {
    const res = await api.post("/api/user/signup", {
        email,
        password,
        rePassword,
        nickname,
        profileImage: null
    });
    return res.data;
}
