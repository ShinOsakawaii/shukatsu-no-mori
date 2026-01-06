// src/pages/mypage/MyPageEdit.jsx
import { Container, Stack, Typography, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useMe } from "../../hooks/useMe";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMyProfile, changePassword } from "../../api/mypageApi";

import PasswordChangeModal from "../../components/mypage/PasswordChangeModal";
import MyPageEditImage from "../../components/mypage/MyPageEditImage";
import MyPageEditContents from "../../components/mypage/MyPageEditContents";
import MyPageEditButtons from "../../components/mypage/MyPageEditButtons";

function MyPageEdit() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: me, isLoading } = useMe();

  // 비밀번호 변경 모달 상태
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);

  const passwordMutation = useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      alert("비밀번호가 변경되었습니다.");
      setPasswordModalOpen(false);
    },
    onError: () => {
      alert("비밀번호 변경에 실패했습니다.");
    },
  });

  // 프로필 수정 상태
  const [form, setForm] = useState({ nickname: "", email: "" });
  const [profileImage, setProfileImage] = useState(null);

  // me가 바뀌면 form 초기화
  useEffect(() => {
    if (me) {
      setForm({
        nickname: me.nickname || "",
        email: me.email || "",
      });
    }
  }, [me]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const profileMutation = useMutation({
    mutationFn: updateMyProfile,
    onSuccess: () => {
      queryClient.invalidateQueries(["me"]);
      alert("정보가 수정되었습니다.");
      navigate("/mypage");
    },
    onError: () => {
      alert("정보 수정에 실패했습니다.");
    },
  });

  const handleSave = () => {
    const formData = new FormData();
    formData.append("nickname", form.nickname);
    if (profileImage) formData.append("profileImage", profileImage);

    profileMutation.mutate(formData);
  };

  // 변경 여부 판단
  const isNicknameChanged = me ? form.nickname !== me.nickname : false;
  const isImageChanged = !!profileImage;
  const isChanged = isNicknameChanged || isImageChanged;

  // 로딩 또는 데이터 없음 처리
  if (isLoading) return <div>로딩중...</div>;
  if (!me) return <div>유저 정보 없음</div>;

  return (
    <Container maxWidth="sm">
      <Stack spacing={4} alignItems="center">
        <Typography variant="h5">개인 정보 수정</Typography>

        {/* 프로필 이미지 */}
        <MyPageEditImage
          imageUrl={me.profileImageUrl || "/images/default-avatar.png"}
          onChangeImage={setProfileImage}
        />

        {/* 이메일 / 닉네임 */}
        <MyPageEditContents
          email={form.email}   // me.email 대신 form.email 사용
          form={form}
          onChange={handleChange}
        />

      

        {/* 저장 / 취소 버튼 */}
        <MyPageEditButtons
          onSave={handleSave}
          onCancel={() => navigate("/mypage")}
          disabled={!isChanged || profileMutation.isPending}
          sx={{ alignSelf: "stretch" }}
        />
      </Stack>

      {/* 비밀번호 변경 모달 */}
      <PasswordChangeModal
        open={passwordModalOpen}
        onClose={() => setPasswordModalOpen(false)}
        onSubmit={(form) => passwordMutation.mutate(form)}
        isLoading={passwordMutation.isPending}
      />
    </Container>
  );
}

export default MyPageEdit;
