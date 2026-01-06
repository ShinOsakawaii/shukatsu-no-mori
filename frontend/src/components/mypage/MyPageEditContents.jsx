import { Stack, TextField } from "@mui/material";


function MyPageEditContents({ email, form, onChange }) {
  return (
    <Stack spacing={2} width="100%">
      <TextField
        label="이메일"
        value={email || ""}
        disabled
        fullWidth
      />

      <TextField
        label="비밀번호 변경"
        name="password"
        type="password"
        onChange={onChange}
        fullWidth
        helperText="비밀번호 입력은 필수 입니다."
      />

      <TextField
        label="비밀번호 확인"
        name="rePassword"
        type="password"
        onChange={onChange}
        fullWidth
      />

      <TextField
        label="닉네임"
        name="nickname"
        type="text"
        value={form.nickname}
        onChange={onChange}
        fullWidth
      />
    </Stack>
  );
}

export default MyPageEditContents;