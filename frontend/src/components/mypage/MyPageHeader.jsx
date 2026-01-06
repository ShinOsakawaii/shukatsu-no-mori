import { Container, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useMe } from "../../hooks/useMe";
import { useMutation } from "@tanstack/react-query";
import { updateMyProfile } from "../../api/mypageApi";

import MyPageEditImage from "../../components/mypage/MyPageEditImage";
import MyPageEditContents from "../../components/mypage/MyPageEditContents";
import MyPageEditButtons from "../../components/mypage/MyPageEditButtons";

function MyPageEdit() {
    const navigate = useNavigate();
    const { data: me, isLoading } = useMe(); // 로그인한 회원 정보

    const [form, setForm] = useState({
        password: "",
        rePassword: "",
        nickname: "",
    });

    const [profileImage, setProfileImage] = useState(null);

    useEffect(() => {
        if (me?.nickname) {
            setForm((prev) => ({
                ...prev,
                nickname: me.nickname,
            }));
        }
    }, [me]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const mutation = useMutation({
        mutationFn: (formData) => updateMyProfile(formData),
        onSuccess: () => {
            alert("정보가 수정되었습니다.");
            navigate("/mypage");
        },
    });

    const handleSave = () => {
        if (form.password !== form.rePassword) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }

        const formData = new FormData();
        formData.append("password", form.password);
        formData.append("nickname", form.nickname);

        if (profileImage) {
            formData.append("profileImage", profileImage);
        }

        mutation.mutate(formData);
    };

    if (isLoading || !me) return null;

    return (
        <Container maxWidth="sm">
            <Stack spacing={4} alignItems="center">
                <Typography variant="h5">개인 정보 수정</Typography>

                <MyPageEditImage
                    imageUrl={me.profileImageUrl}
                    onChangeImage={setProfileImage}
                />

                <MyPageEditContents
                    email={me.email}
                    form={form}
                    onChange={handleChange}
                />

                <MyPageEditButtons
                    onSave={handleSave}
                    onCancel={() => navigate("/mypage")}
                />
            </Stack>
        </Container>
    );
}

export default MyPageEdit;
