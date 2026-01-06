import { Link, useNavigate } from "react-router";
import { useMe } from "../hooks/useMe";
import { useQueryClient } from "@tanstack/react-query";

import ForestIcon from "@mui/icons-material/Forest";
import { Button } from "@mui/material";

function NavBar() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    // 로그인 상태 (useMe 기준)
    const { data: user, isLoading: userIsLoading } = useMe();

    const handleLogout = () => {
        // 토큰 제거
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        // me 캐시 제거
        queryClient.removeQueries({ queryKey: ["me"] });
        // 메인 페이지 이동
        navigate("/companies");
    };

    return (
        <nav
            style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "10px 20px",
                background: "#c5da89ff",
            }}
        >
            {/* 왼쪽 타이틀 */}
            <div style={{ fontWeight: "bold", fontSize: "20px" }}>
                <ForestIcon style={{ color: "#4caf50" }} />
                <Link to="/companies" style={{ textDecoration: "none", color: "inherit" }}>
                    就職の森 ⋆*
                </Link>
            </div>

            {/* 오른쪽 메뉴 */}
            <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
                {!userIsLoading && user ? (
                    <>
                        <span>{user.nickname}님 환영합니다.</span>
                        <Link to="/mypage" style={{ textDecoration: "none" }}>
                            마이페이지
                        </Link>
                        <Button
                            variant="text"
                            onClick={handleLogout}
                            sx={{ color: "inherit" }}
                        >
                            로그아웃
                        </Button>
                    </>
                ) : (
                    <>
                        <Link to="/auth/login" style={{ textDecoration: "none" }}>
                            로그인
                        </Link>
                        <Link to="/auth/register" style={{ textDecoration: "none" }}>
                            회원가입
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
}

export default NavBar;
