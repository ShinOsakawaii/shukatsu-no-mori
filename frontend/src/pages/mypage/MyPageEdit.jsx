import React from 'react';
//수정
function MyPageEdit(props) {

    const queryClient = useQueryClient();

    //Api 관련 TanStaks Query=============
    const updateMutation = useMutation({
        mutationFn: (payload) => updateMyPage(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['mypage', 'me'] });
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