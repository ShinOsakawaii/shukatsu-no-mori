// MyPageHeader.jsx
import { Box, Button, Avatar, Typography } from "@mui/material";
import { useNavigate } from "react-router";

function MyPageHeader({ username, profileImage }) {
    const navigate = useNavigate();

    const handleEditProfile = () => {
        navigate("/mypage/edit"); // 개인정보 수정 페이지 경로
    };

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                padding: 2,
                backgroundColor: "#f5f2e9",
                borderRadius: 2
            }}
        >
            <Avatar
                src={profileImage || "/images/default-avatar.png"} // 없으면기본 이미지
                sx={{ width: 80, height: 80 }}
            />
            <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h6">
                    안녕하세요. {username}님
                </Typography>
                <Button
                    variant="contained"
                    color="success"
                    sx={{ mt: 1 }}
                    onClick={handleEditProfile}
                >
                    개인정보 수정
                </Button>
            </Box>
        </Box>
    );
}

export default MyPageHeader;
