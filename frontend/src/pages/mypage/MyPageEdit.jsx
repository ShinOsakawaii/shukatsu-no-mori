// src/pages/mypage/MyPageEdit.jsx
import { Container, Stack, Typography, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useMe } from "../../hooks/useMe";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMyProfile, changePassword } from "../../api/mypageApi";
import { uploadImage } from "../../api/uploadApi";

import PasswordChangeModal from "../../components/mypage/PasswordChangeModal";
import MyPageEditImage from "../../components/mypage/MyPageEditImage";
import MyPageEditContents from "../../components/mypage/MyPageEditContents";
import MyPageEditButtons from "../../components/mypage/MyPageEditButtons";

function MyPageEdit() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { data: me, isLoading } = useMe();

    // ✅ 프로필 수정 form (비밀번호 필드 제거)
    const [form, setForm] = useState({
        nickname: "",
        profileImage: null, // URL string or null
    });

    // ✅ 비밀번호 변경 모달 상태
    const [passwordModalOpen, setPasswordModalOpen] = useState(false);

    //이미지 저장 경로 수정
    const toAbs = (path) => {
        if (!path) return null;
        if (path.startsWith("http")) return path;
        return `${import.meta.env.VITE_API_BASE_URL}${path}`;
    };

    const normalizeImageUrl = (url) => {
        if (!url) return null;
        if (typeof url !== "string") return null;

        if (url.startsWith("http")) return url;

        const base = import.meta.env.VITE_API_BASE_URL;
        return url.startsWith("/") ? `${base}${url}` : `${base}/${url}`;
    };

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

    // ✅ 프로필 수정 mutation
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

    // ✅ 비밀번호 변경 mutation (updateMyProfile과 분리)
    const passwordMutation = useMutation({
        mutationFn: changePassword,
        onSuccess: () => {
            alert("비밀번호가 변경되었습니다.");
            setPasswordModalOpen(false);
        },
        onError: (e) => {
            alert(e.response?.data?.message ?? "비밀번호 변경에 실패했습니다.");
        },
    });

    const handleSave = () => {
        const payload = {
            nickname: form.nickname,
            profileImage: form.profileImage,
        };
        profileMutation.mutate(payload);
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

    if (isLoading) return null;

    return (
        <Container maxWidth="sm">
            <Stack spacing={4} alignItems="center">
                <Typography variant="h5">개인 정보 수정</Typography>

                {/* ✅ 비밀번호 변경 버튼: 모달 오픈 */}
                <Button
                    variant="outlined"
                    onClick={() => setPasswordModalOpen(true)}
                    sx={{ alignSelf: "stretch" }}
                >
                    비밀번호 변경
                </Button>

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
                    isSaving={profileMutation.isPending}
                />
            </Stack>

            {/* ✅ 비밀번호 변경 모달 */}
            <PasswordChangeModal
                open={passwordModalOpen}
                onClose={() => setPasswordModalOpen(false)}
                onSubmit={(pwForm) => passwordMutation.mutate(pwForm)}
                isLoading={passwordMutation.isPending}
            />
        </Container>
    );
}

export default MyPageEdit;
