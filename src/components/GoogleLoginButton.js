import React from 'react';
import './GoogleLoginButton.css';
import Button from './Button';
import googlelogo from '../images/googlelogo.png';

//import { useNavigate } from 'react-router-dom';

export default function GoogleLoginButton() {
    //const navigate = useNavigate();

    return (
        <Button onClick={click} title="디미고 계정으로 로그인" imgSrc={googlelogo} height='1.4rem'/>
    );

    function click() {
        //alert('로그인 버튼');
        
        // 로그인 처리

        //navigate('/');
        //navigate('https://accounts.google.com/o/oauth2/v2/auth?client_id=752669101446-ssmoaio24ohfv2vhg59gphbbdqtpe7kb.apps.googleusercontent.com&response_type=token&redirect_uri=http://localhost:5173/redirect/gauth&scope=https://www.googleapis.com/auth/userinfo.email');
        window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=752669101446-ssmoaio24ohfv2vhg59gphbbdqtpe7kb.apps.googleusercontent.com&response_type=code&redirect_uri=https://dimi.monster/redirect/gauth&state=${process.env.REACT_APP_ENV}&scope=https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email`;
    }
}