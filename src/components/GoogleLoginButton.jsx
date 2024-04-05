import React from 'react';
import './GoogleLoginButton.css';
import Button from './Button';
import googlelogo from '../images/googlelogo.svg';
import { LOGIN_URL } from '../routes/login';

export default function GoogleLoginButton() {

    return (
        <Button onClick={click} title="디미고 계정으로 로그인" imgSrc={googlelogo} height='1.3rem'/>
    );

    function click() {
        // 로그인 처리

        window.location.href = LOGIN_URL;
    }
}