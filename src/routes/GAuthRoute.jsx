import React from "react";
import { useEffect, useState } from "react"
import { useSearchParams, useNavigate } from "react-router-dom";
import api from '../utils/API';
import loginWaitLogo from '../images/login_wait_logo.svg';
import loginWaitLogoDark from '../images/login_wait_logo-dark.svg';
import sponsorLogo from '../images/clast-cloud-logo.svg';
import sponsorLogoDark from '../images/clast-cloud-logo-dark.svg';

export default function GAuthRoute() {
    const [searchParams, /*setSearchParams*/] = useSearchParams();
    const navigate = useNavigate();
    let [isDarkMode, setIsDarkMode] = useState(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
    // update isDarkMode when the system changes the theme
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (e.matches) {
            setIsDarkMode(true);
        } else {
            setIsDarkMode(false);
        }
    });

    useEffect(() => {
        async function login() {
            const code = searchParams.get('code');
            const state = searchParams.get('state');
            
            if (state === "dev") {
                let params = new URLSearchParams();
                params.set('code', code);

                document.location.href = `http://localhost:5173/redirect/gauth?${params.toString()}`;
            }
            else if(state === "beta") {
                let params = new URLSearchParams();
                params.set('code', code);

                document.location.href = `https://beta.dimi.monster/redirect/gauth?${params.toString()}`;
            }
            const statusCode = await api.login(code);
            if(statusCode == 200)
                navigate('/', {replace: true});
            else if (statusCode == 403) {
                navigate('/banned', {replace: true});
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
                navigate('/login', {replace: true});
            }
        }
        
        login();
    }, []);

    return (
        <><div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '94vh' }}>
            <img src={isDarkMode ? loginWaitLogoDark: loginWaitLogo} style={{
                width: '40vw',
                height: 'auto'
            }} alt="기다리는 중.." />
        </div>

        <div style={{ position: 'fixed', bottom: '4vw', left: 0, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'flex-end', minHeight: '100vh' }}>
            <img src={isDarkMode ? sponsorLogoDark : sponsorLogo} style={{ width: '12vw', height: 'auto' }} alt="기다리는 중.." />
        </div></>

    )
}