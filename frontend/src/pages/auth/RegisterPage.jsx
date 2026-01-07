import { Container, Stack, Typography, Paper, Box, Button, TextField } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router";
import { register } from "../../api/authApi";

// http://localhost:5173/auth/register

function RegisterPage() {
    const navigate = useNavigate();

    

    const [form, setForm] = useState({
        email: "",
        password: "",
        rePassword: "",
        nickname: ""
    });

    const registerMutation = useMutation({
        mutationFn: register,
        onSuccess: () => {
            navigate("/auth/login");
        }
    });

    

    // 입력값 변경
    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setForm((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    // 취소 버튼
    const handleCancel = () => {
        navigate("/companies"); // 또는 "/"
    };

    // 제출
    const handleSubmit = (evt) => {
        evt.preventDefault();

        // 비밀번호 재확인 (프론트 검증)
        if (form.password !== form.rePassword) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }

        registerMutation.mutate({
            email: form.email.trim(),
            password: form.password.trim(),
            rePassword: form.rePassword.trim(),
            nickname: form.nickname.trim()
        });
    };

    const errorMessage =
        registerMutation.error?.message || "회원가입에 실패했습니다.";

    return (
        <Container maxWidth="sm">
            <Typography variant="h5" align="center" fontWeight={500} sx={{ mb: 2 }}>회원가입</Typography>

            <Paper
                sx={{
                    width: '100%',
                    borderRadius: 3,
                    px: 8,
                    py: 6,
                    boxShadow: '0 16px 40px rgba(0,0,0, 0.07)'
                }}
            >



                <Box component="form" onSubmit={handleSubmit}>
                    <Stack spacing={2}>
                        <TextField
                            label="이메일"
                            name="email"
                            type="email"
                            placeholder="aaa@bbb.com"
                            required
                            helperText="*필수 입력입니다"
                            value={form.email}
                            onChange={handleChange}
                        />

                        <TextField
                            label="비밀번호"
                            name="password"
                            type="password"
                            required
                            helperText="*필수 입력입니다"
                            value={form.password}
                            onChange={handleChange}
                        />

                        <TextField
                            label="비밀번호 확인"
                            name="rePassword"
                            type="password"
                            required
                            helperText="*필수 입력입니다"
                            value={form.rePassword}
                            onChange={handleChange}
                        />

                        <TextField
                            label="닉네임"
                            name="nickname"
                            type="text"
                            required
                            helperText="*필수 입력입니다"
                            value={form.nickname}
                            onChange={handleChange}
                        />

                        {registerMutation.isError && (
                            <Typography variant="body2" color="error">
                                {errorMessage}
                            </Typography>
                        )}

                        {/* 버튼 영역 */}
                        <Stack
                            direction="row"
                            spacing={1}
                            justifyContent="center"
                            sx={{ mt: 1 }}
                        >
                            <Button
                                variant="outlined"
                                size="small"
                                onClick={handleCancel}
                            >
                                취소
                            </Button>

                            <Button
                                type="submit"
                                variant="contained"
                                size="small"
                                disabled={registerMutation.isPending}
                            >
                                {registerMutation.isPending
                                    ? "가입 중..."
                                    : "회원가입"}
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </Paper>
        </Container>
    );
}

export default RegisterPage;
