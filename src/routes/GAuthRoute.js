import React from "react";
import { useEffect } from "react"
import { useSearchParams, useNavigate } from "react-router-dom";

export default function GAuthRoute() {
    const [searchParams, /*setSearchParams*/] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function login() {
            const code = searchParams.get('code');
            //alert(`code: ${code}`);
    
            const url = `${process.env.REACT_APP_API_URL}/auth/login?code=${code}`;

            let data = await fetch(url, {
                headers: {
                    'ngrok-skip-browser-warning': 'osong'
                }
            });
            let json = await data.json();

            console.log(JSON.stringify(json));



            data = fetch(json.picture);

            localStorage.setItem('access-token', json['access-token']);
            localStorage.setItem('refresh-token', json['refresh-token']);

            let blob = await data.then((response) => response.blob());
            const objectURL = URL.createObjectURL(blob);
            console.log(objectURL);

            navigate('/');
        }
        
        login();
    }, []);

    return (
        <div>
            로그인 중입니다...
        </div>
    )
}