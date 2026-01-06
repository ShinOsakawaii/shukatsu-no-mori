
import { Container, Stack, Typography, Paper, Box, Button, TextField } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { login, setAuth } from '../../api/authApi';

function LoginPage() {

    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const loginMutation = useMutation({
        mutationFn: login,
        onSuccess: async (data) => {
            setAuth(data); // 토큰 저장
            await queryClient.invalidateQueries({ queryKey: ["me"] });
            navigate("/companies"); // 사용자 정보 갱신 후 이동
        }
    });

    const handleSubmit = (evt) => {
        evt.preventDefault();
        loginMutation.reset();

        const fd = new FormData(evt.currentTarget);
        loginMutation.mutate({
            email: String(fd.get("email")).trim(),
            password: String(fd.get("password")).trim()
        });
    };

    return (
        <Container maxWidth="sm">
            <Typography
                variant="h5"
                align="center"
                fontWeight={500}
                sx={{ mb: 2 }}
            >
                로그인
            </Typography>

            <Paper
                sx={{
                    width: '100%',
                    borderRadius: 3,
                    px: 8,
                    py: 6,
                    boxShadow: '0 16px 40px rgba(0,0,0, 0.07)'
                }}
            >


                <Box component="form" sx={{ mt: 2, mb: 2 }} onSubmit={handleSubmit}>
                    <Stack spacing={2}>
                        <TextField
                            label="이메일"
                            name="email"
                            type="email"
                            placeholder="aaa@bbb.com"
                            size="small"
                            required
                        />

                        <TextField
                            label="비밀번호"
                            name="password"
                            type="password"
                            placeholder="비밀번호"
                            size="small"
                            required
                        />

                        {loginMutation.isError && (
                            <Typography variant="body2" color="error">
                                로그인에 실패했습니다.
                            </Typography>
                        )}

                        {/* 버튼 영역 */}
                        <Box sx={{ flexGrow: 1 }} />
                        <Stack
                            direction="row"
                            spacing={1}
                            justifyContent="center"
                            sx={{ mt: 2 }}
                        >
                            <Button
                                type="submit"
                                variant="outlined"
                                size="small"
                                onClick={() => navigate("/auth/register")}
                            >
                                회원가입
                            </Button>

                            <Button
                                type="submit"
                                variant="contained"
                                size="small"
                                disabled={loginMutation.isPending}
                                sx={{ textTransform: 'none' }}
                            >
                                {loginMutation.isPending ? "로그인 중..." : "로그인"}
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </Paper>
        </Container>
    );
}

export default LoginPage;