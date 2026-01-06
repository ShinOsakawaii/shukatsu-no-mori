import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { useNavigate } from 'react-router';
//로그인
function LoginPage(props) {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    //Api 관련 TanStaks Query=============
    const loginMutation = useMutation({
        mutationFn: login,
        onSuccess: async (data) => {
            setAuth(data);
            await queryClient.invalidateQueries({ queryKey: ["me"] }); 
            navigate("/companies")
            }
        });
    
    
    
    
    return (
        <div>

        </div>
    );
}

export default LoginPage;