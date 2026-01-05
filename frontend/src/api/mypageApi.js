import { api } from "./api";

//마이페이지 수정 api

export function updateMyProfile(formData) {
    return api.put("/mypage/edit", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
}
