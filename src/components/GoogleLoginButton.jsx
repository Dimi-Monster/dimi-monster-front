import React from 'react';
import './GoogleLoginButton.css';
import Button from './Button';
import googlelogo from '../images/googlelogo.svg';

export default function GoogleLoginButton() {

    return (
        <Button onClick={click} title="디미고 계정으로 로그인" imgSrc={googlelogo} height='1.3rem'/>
    );

    function click() {
        // 로그인 처리

        window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=752669101446-ssmoaio24ohfv2vhg59gphbbdqtpe7kb.apps.googleusercontent.com&response_type=code&redirect_uri=https://dimi.monster/redirect/gauth&state=${process.env.REACT_APP_ENV}&scope=https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email`;
    }
}