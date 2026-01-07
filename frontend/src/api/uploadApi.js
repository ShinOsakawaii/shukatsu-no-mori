// frontend/src/api/uploadApi.js
import { api } from './api';

// 이미지 업로드
export async function uploadImage(file) {
    const formData = new FormData();
    formData.append('file', file);

    const res = await api.post('/api/files/image', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return res.data;
}

