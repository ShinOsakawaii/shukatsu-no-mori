import React from 'react';
//수정
function MyPageEdit(props) {

    const queryClient = useQueryClient();

    //Api 관련 TanStaks Query=============
    //정보 및 이미지 수정 뮤테이션
    const updateMutation = useMutation({
        mutationFn: (payload) => updateMyPage(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['mypage', 'me'] }); //로그인한 내 페이지로 이동
        },
        onError: () => {
            alert('마이페이지 수정에 실패했습니다.');
        }
    });

    return (
        <div>

        </div>
    );
}

export default MyPageEdit;