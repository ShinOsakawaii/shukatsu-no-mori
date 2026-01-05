import React, { useState } from 'react';
import { useNavigate } from 'react-router';
//회원가입
function RegisterPage(props) {
    
    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: "",
        nickname: "",
        password: "",
        rePassword: ""
    })

    //Api 관련 TanStaks Query=============
    const registerMutation = useMutation({
        mutationFn: register,
        onSuccess: () => navigate("/companies")
       
    });
    


    return (
        <div>

        </div>
    );
}

export default RegisterPage;