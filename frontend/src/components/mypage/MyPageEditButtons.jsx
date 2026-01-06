import { useState } from "react";
import { Stack, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Typography } from "@mui/material";

function MyPageEditButtons({ onSave, onCancel, disabled }) {
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  // 모달 닫을 때 초기화
  const handleCloseModal = () => {
    setPasswordModalOpen(false);
    setNewPassword("");
    setConfirmPassword("");
    setError("");
  };

  // 비밀번호 변경
  const handlePasswordChange = () => {
    if (!newPassword || !confirmPassword) {
      setError("비밀번호를 입력해주세요.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }
    console.log("새 비밀번호:", newPassword);
    // 실제 API 호출 로직 추가
    handleCloseModal();
  };

  // 버튼 활성화 조건
  const isChangeDisabled = !newPassword || !confirmPassword || newPassword !== confirmPassword;

  return (
    <>
      <Stack
        direction="row"
        spacing={2}
        sx={{ width: "100%", justifyContent: "space-between", alignItems: "center" }}
      >
        <Button variant="outlined" onClick={() => setPasswordModalOpen(true)} sx={{ flex: 1 }}>
          비밀번호 변경
        </Button>
        <Button variant="outlined" onClick={onCancel} sx={{ flex: 1 }}>
          취소
        </Button>
        <Button variant="contained" onClick={onSave} disabled={disabled} sx={{ flex: 1 }}>
          저장
        </Button>
      </Stack>

      <Dialog open={passwordModalOpen} onClose={handleCloseModal}>
        <DialogTitle>비밀번호 변경</DialogTitle>
        <DialogContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handlePasswordChange();
            }}
          >
            <TextField
              autoFocus
              margin="dense"
              label="새 비밀번호"
              type="password"
              fullWidth
              variant="standard"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <TextField
              margin="dense"
              label="비밀번호 확인"
              type="password"
              fullWidth
              variant="standard"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {error && (
              <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                {error}
              </Typography>
            )}
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>취소</Button>
          <Button onClick={handlePasswordChange} variant="contained" disabled={isChangeDisabled}>
            변경
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default MyPageEditButtons;
