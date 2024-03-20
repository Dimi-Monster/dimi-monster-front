import React from "react";
import { useEffect } from "react"
import { useSearchParams, useNavigate } from "react-router-dom";
import api from '../utils/API';
import waitlogo from '../images/login_wait_logo.svg';
import waitlogo2 from '../images/clast-cloud-logo.svg';

export default function GAuthRoute() {
    const [searchParams, /*setSearchParams*/] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function login() {
            const code = searchParams.get('code');
            const state = searchParams.get('state');
            if (state === "dev") {
                document.location.href = `http://localhost:5173/redirect/gauth?code=${code}`;
            }
            const statusCode = await api.login(code);
            console.log(statusCode);
            if(statusCode == 200)
                navigate('/');
            else if (statusCode == 403) {
                navigate('/banned');
            }
            else {
                let error = api.getLastError();

                if(error == 'Invalid Email Address'){
                    alert('디미고 구글 계정으로만 로그인할 수 있습니다.');
                } else if(error == 'Internal Server Error'){
                    alert('로그인 정보를 불러오는 데 실패했습니다.');
                } else {
                    alert('오류가 발생했습니다. 관리자에게 문의해주세요.\n\n에러 타입: '+error);
                }
                navigate('/login');
            }
        }
        
        login();
    }, []);

    return (
        <><div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '94vh' }}>
            <img src={waitlogo} style={{
                width: '43vw',
                height: 'auto'
            }} alt="기다리는 중.." />
        </div>

        <div style={{ position: 'fixed', bottom: '4vw', left: 0, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'flex-end', minHeight: '100vh' }}>
            <img src={waitlogo2} style={{ width: '10vw', height: 'auto' }} alt="기다리는 중.." />
        </div></>

    )
}