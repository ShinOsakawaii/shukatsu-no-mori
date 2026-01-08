<<<<<<< HEAD
=======
// src/pages/mypage/MyPageEdit.jsx
>>>>>>> origin/develop
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

    const [form, setForm] = useState({
        nickname: "",
        profileImage: null, // URL string or null
    });

    const toAbs = (path) => {
        if (!path) return null;
        if (path.startsWith("http")) return path;
        return `${import.meta.env.VITE_API_BASE_URL}${path}`;
    };

    const normalizeImageUrl = (url) => {
        if (!url || typeof url !== "string") return null;
        if (url.startsWith("http")) return url;

        const base = import.meta.env.VITE_API_BASE_URL;
        return url.startsWith("/") ? `${base}${url}` : `${base}/${url}`;
    };

    useEffect(() => {
        if (!me) return;
        setForm({
            nickname: me.nickname ?? "",
            profileImage: toAbs(me.profileImage),
        });
    }, [me]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
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

    const profileMutation = useMutation({
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
        profileMutation.mutate({
            nickname: form.nickname,
            profileImage: form.profileImage,
        });
    };

    const handleCancel = () => {
        navigate("/mypage");
    };

    if (isLoading) return null;

    return (
        <Container maxWidth="sm">
            <Stack spacing={4} alignItems="center">
                <Typography variant="h5">개인 정보 수정</Typography>

                <MyPageEditImage imageUrl={form.profileImage} onChangeImage={handleChangeImage} />

<<<<<<< HEAD
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
=======
                <MyPageEditContents email={me?.email} form={form} onChange={handleChange} />
>>>>>>> origin/develop

                <MyPageEditButtons
                    onSave={handleSave}
                    onCancel={handleCancel}
                    disabled={profileMutation.isPending}
                />
            </Stack>
        </Container>
    );
}

export default MyPageEdit;
