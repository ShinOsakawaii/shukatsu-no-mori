// 회원
export const USER_KEYS = {
    me: ['me'],
};

// 기업
export const COMPANY_KEYS = {
    all: ['companies'],
    list: (params) => ['companies', params],
    detail: (companyId) => ['companies', companyId],
    analyses: (companyId) => ['companies', companyId, 'details'],
    reviews: (companyId) => ['companies', companyId, 'reviews'],
};

// 마이페이지
export const MYPAGE_KEYS = {
    details: (params) => ['mypage', 'details', params],
    reviews: (params) => ['mypage', 'reviews', params],
};