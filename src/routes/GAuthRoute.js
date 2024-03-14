import React from "react";
import { useEffect } from "react"
import { useSearchParams, useNavigate } from "react-router-dom";
import api from '../utils/API';

export default function GAuthRoute() {
    const [searchParams, /*setSearchParams*/] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function login() {
            const code = searchParams.get('code');
            
            if(await api.login(code))
                navigate('/');
            else {
                alert('로그인에 실패했습니다.');
                navigate('/login');
            }
        }
        
        login();
    }, []);

    return (
        <div>
            로그인 중입니다...
        </div>
    )
}