import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
  Alert,
} from "@mui/material";
import { useEffect, useState } from "react";

function PasswordChangeModal({ open, onClose, onSubmit, isLoading }) {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    newPasswordCheck: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) {
      setForm({
        currentPassword: "",
        newPassword: "",
        newPasswordCheck: "",
      });
      setError("");
    }
  }, [open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (!form.currentPassword || !form.newPassword || !form.newPasswordCheck) {
      setError("모든 항목을 입력해 주세요.");
      return;
    }

    if (form.newPassword !== form.newPasswordCheck) {
      setError("새 비밀번호가 일치하지 않습니다.");
      return;
    }

    onSubmit(form);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>비밀번호 변경</DialogTitle>

      <DialogContent>
        <Stack spacing={2} mt={1}>
          {error && <Alert severity="error">{error}</Alert>}

          <TextField
            label="현재 비밀번호"
            name="currentPassword"
            type="password"
            value={form.currentPassword}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="새 비밀번호"
            name="newPassword"
            type="password"
            value={form.newPassword}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="새 비밀번호 확인"
            name="newPasswordCheck"
            type="password"
            value={form.newPasswordCheck}
            onChange={handleChange}
            fullWidth
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>취소</Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          변경
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default PasswordChangeModal;
