import { useState } from "react";
import {
  Stack,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
} from "@mui/material";

function MyPageEditButtons({
  onSave,
  onCancel,
  disabled,
  onPasswordSave,
  pwLoading,
}) {
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleCloseModal = () => {
    setPasswordModalOpen(false);
    setNewPassword("");
    setConfirmPassword("");
    setError("");
  };

  const handlePasswordChange = () => {
    if (!newPassword || !confirmPassword) {
      setError("비밀번호를 입력해주세요.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    // ✅ payload를 만들고, "닫기 함수"도 같이 부모로 넘김
    onPasswordSave?.(
      { password: newPassword, rePassword: confirmPassword },
      handleCloseModal
    );
  };

  const isChangeDisabled =
    pwLoading || !newPassword || !confirmPassword || newPassword !== confirmPassword;

  return (
    <>
      <Stack
        direction="row"
        spacing={2}
        sx={{ width: "100%", justifyContent: "space-between", alignItems: "center" }}
      >
        <Button
          variant="outlined"
          onClick={() => setPasswordModalOpen(true)}
          sx={{ flex: 1 }}
        >
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
              onChange={(e) => {
                setNewPassword(e.target.value);
                if (error) setError("");
              }}
              autoComplete="new-password"
            />

            <TextField
              margin="dense"
              label="비밀번호 확인"
              type="password"
              fullWidth
              variant="standard"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (error) setError("");
              }}
              autoComplete="new-password"
            />

            {error && (
              <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                {error}
              </Typography>
            )}
          </form>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseModal} disabled={pwLoading}>
            취소
          </Button>
          <Button
            onClick={handlePasswordChange}
            variant="contained"
            disabled={isChangeDisabled}
          >
            변경
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default MyPageEditButtons;
