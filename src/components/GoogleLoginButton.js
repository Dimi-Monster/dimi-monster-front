import loginbutton from '../images/loginbutton.svg';
import './GoogleLoginButton.css';

import { useNavigate } from 'react-router-dom';

export default function GoogleLoginButton() {
    const navigate = useNavigate();

    return (
        <button onClick={click}>
            <img src={loginbutton} className="login-button"/>
        </button>
    );

    function click() {
        alert('로그인 버튼');
        
        // 로그인 처리

        //navigate('/');
        //navigate('https://accounts.google.com/o/oauth2/v2/auth?client_id=752669101446-ssmoaio24ohfv2vhg59gphbbdqtpe7kb.apps.googleusercontent.com&response_type=token&redirect_uri=http://localhost:5173/redirect/gauth&scope=https://www.googleapis.com/auth/userinfo.email');
        window.location.href = 'https://accounts.google.com/o/oauth2/v2/auth?client_id=752669101446-ssmoaio24ohfv2vhg59gphbbdqtpe7kb.apps.googleusercontent.com&response_type=code&redirect_uri=http://localhost:5173/redirect/gauth&scope=https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email';
    }
}