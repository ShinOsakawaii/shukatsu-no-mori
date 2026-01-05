import { Link, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import ForestIcon from '@mui/icons-material/Forest';

function NavBar() {
    const navigate = useNavigate();

    // 로그인 상태
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user"); // 로그인 시 user 정보 저장한다고 가정
        if (storedUser) setUser(JSON.parse(storedUser));
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
        setUser(null);
        navigate("/companies");
    };

    return (
        <nav style={{ display: "flex", justifyContent: "space-between", padding: "10px 20px", background: "#c5da89ff" }}>
            {/* 왼쪽 타이틀 */}
            <div style={{ fontWeight: "bold", fontSize: "20px" }}>
                <ForestIcon style={{ color: "#4caf50" }} />
                <Link to="/companies" style={{ textDecoration: "none", color: "inherit" }}>
                    就職の森 ⋆*
                </Link>
            </div>

            {/* 오른쪽 메뉴 */}
            <div style={{ display: "flex", gap: "15px" }}>
                {!user ? (
                    <>
                        <Link to="/auth/login" style={{ textDecoration: "none" }}>로그인</Link>
                        <Link to="/auth/register" style={{ textDecoration: "none" }}>회원가입</Link>
                    </>
                ) : (
                    <>
                        <span>{user.name}님 환영합니다. </span>
                        <Link to="/mypage" style={{ textDecoration: "none" }}>마이페이지</Link>
                        <span
                            onClick={handleLogout}
                            style={{
                                cursor: "pointer",
                                textDecoration: "none",
                                color: "inherit",
                            }}
                        >
                            로그아웃
                        </span>
                    </>
                )}
            </div>
        </nav>
    );
}

export default NavBar;
