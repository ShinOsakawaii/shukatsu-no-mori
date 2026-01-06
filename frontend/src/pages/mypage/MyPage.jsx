// src/pages/mypage/MyPage.jsx
import MyPageHeader from "../../components/mypage/MyPageHeader";
import { useMe } from "../../hooks/useMe";

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
                profileImage={user.profileImageUrl || "/images/default-avatar.png"}
            />


            {/* 기업 분석, 후기 리스트 부분은 강상이 담당 */}

        </div>
    );
}

export default MyPage;
