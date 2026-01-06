import { Container, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useMe } from "../../hooks/useMe";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMyProfile } from "../../api/mypageApi";
import { uploadImage } from "../../api/uploadApi";

import MyPageEditImage from "../../components/mypage/MyPageEditImage";
import MyPageEditContents from "../../components/mypage/MyPageEditContents";
import MyPageEditButtons from "../../components/mypage/MyPageEditButtons";

function MyPageEdit() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { data: me, isLoading } = useMe();

    // ✅ form 하나로 통일 (백엔드 DTO 필드명과 동일)
    const [form, setForm] = useState({
        password: "",
        rePassword: "",
        nickname: "",
        profileImage: null, // URL string or null
    });

    // me 로딩되면 초기값 채우기
    useEffect(() => {
        if (!me) return;
        setForm((prev) => ({
            ...prev,
            nickname: me.nickname ?? "",
            profileImage: toAbs(me.profileImage),
        }));
    }, [me]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const mutation = useMutation({
        mutationFn: updateMyProfile,
        onSuccess: () => {
            alert("정보가 수정되었습니다.");
            queryClient.invalidateQueries({ queryKey: ["me"] });
            navigate("/mypage");
        },
        onError: (e) => {
            alert(e.response?.data?.message ?? "수정에 실패했습니다.");
        },
    });

    const handleSave = () => {
        const wantsPasswordChange =
            form.password.length > 0 || form.rePassword.length > 0;

        if (wantsPasswordChange && form.password !== form.rePassword) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }

        const payload = {
            nickname: form.nickname,
            profileImage: form.profileImage,
            ...(wantsPasswordChange
                ? {
                    password: form.password,
                    rePassword: form.rePassword,
                }
                : {}),
        };
        mutation.mutate(payload);

    };

    const normalizeImageUrl = (url) => {
        if (!url) return null;
        if (typeof url !== "string") return null;

        // 이미 절대 URL이면 그대로
        if (url.startsWith("http")) return url;

        // "/image/xxx.jpg" → "http://localhost:8080/image/xxx.jpg"
        const base = import.meta.env.VITE_API_BASE_URL;
        return url.startsWith("/") ? `${base}${url}` : `${base}/${url}`;
    };

    const handleChangeImage = async (file) => {
        if (!file) {
            setForm((prev) => ({ ...prev, profileImage: null }));
            return;
        }

        try {

            const res = await uploadImage(file);
            const raw = res?.imageUrl ?? res?.url ?? res;
            const imageUrl = normalizeImageUrl(raw);

            setForm((prev) => ({ ...prev, profileImage: imageUrl }));
        } catch (e) {
            alert("이미지 업로드 실패");
        }
    };


    //이미지 저장 경로 수정
    const toAbs = (path) => {
        if (!path) return null;
        if (path.startsWith("http")) return path;
        return `${import.meta.env.VITE_API_BASE_URL}${path}`;
    };

    if (isLoading) return null;

    return (
        <Container maxWidth="sm">
            <Stack spacing={4} alignItems="center">
                <Typography variant="h5">개인 정보 수정</Typography>

                <MyPageEditImage
                    imageUrl={form.profileImage}
                    onChangeImage={handleChangeImage}
                />

                <MyPageEditContents
                    email={me?.email}
                    form={form}
                    onChange={handleChange}
                />

                <MyPageEditButtons
                    onSave={handleSave}
                    onCancel={() => navigate("/mypage")}
                    isSaving={mutation.isPending}
                />
            </Stack>
        </Container>
    );
}

export default MyPageEdit;
