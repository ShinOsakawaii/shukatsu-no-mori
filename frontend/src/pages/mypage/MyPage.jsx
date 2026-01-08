// src/pages/mypage/MyPage.jsx
import MyPageHeader from "../../components/mypage/MyPageHeader";
import { useMe } from "../../hooks/useMe";
import MyPageContent from "./MyPageContent";

function MyPage() {

    // 로그인한 유저 정보 가져오기
    const { data: user, isLoading, isError } = useMe();

    // 로딩 중 처리
    if (isLoading) return <div>Loading...</div>;

    // 에러 또는 user가 없을 때 처리
    if (isError || !user) return <div>유저 정보를 불러오지 못했습니다.</div>;

    return (
        <div>
            <MyPageHeader
                username={user.nickname || "Guest"}
                profileImage={user.profileImage || "/images/default-avatar.png"}
            />

            <MyPageContent userId={user.userId} />
        </div>
    );
}

export default MyPage;
