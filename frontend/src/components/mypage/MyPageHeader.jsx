import {
    Box,
    Button,
    Avatar,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router";
import { changePassword } from "../../api/mypageApi";

function MyPageHeader({ username, profileImage }) {
    const navigate = useNavigate();

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

    const passwordMutation = useMutation({
        mutationFn: changePassword,
        onSuccess: () => {
            alert("비밀번호가 변경되었습니다.");
            handleCloseModal(); // ✅ 성공 시 닫기
        },
        onError: (e) => {
            alert(e.response?.data?.message ?? "비밀번호 변경에 실패했습니다.");
        },
    });

    const isChangeDisabled =
        passwordMutation.isPending ||
        !newPassword ||
        !confirmPassword ||
        newPassword !== confirmPassword;

    const handleEditProfile = () => {
        navigate("/mypage/edit");
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

        // ✅ 여기서 직접 mutate
        passwordMutation.mutate({
            password: newPassword,
            rePassword: confirmPassword,
        });
    };

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                padding: 2,
                bgcolor: 'background.default',
                borderRadius: 2
            }}
        >
            <Avatar
                src={profileImage || "/images/default-avatar.png"}
                sx={{ width: 80, height: 80 }}
            />

            <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h6">안녕하세요. {username}님</Typography>

                <Box sx={{ display: "flex", gap: 2}}>
                    <Button
                        variant="contained"
                        sx={{ mt: 1, bgcolor: 'background.button' }}
                        onClick={handleEditProfile}
                    >
                        개인정보 수정
                    </Button>

                    <Button
                        variant="outlined"
                        color="success"
                        onClick={() => setPasswordModalOpen(true)}
                        sx={{ mt: 1 }}
                    >
                        비밀번호 변경
                    </Button>
                </Box>


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
                        <Button onClick={handleCloseModal} disabled={passwordMutation.isPending}>
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
            </Box>
        </Box >
    );
}

export default MyPageHeader;
