import React, { useState } from "react";
import logo from "../images/logo.svg";
import darklogo from "../images/logo-dark.svg";

import "./login.css";
import GoogleLoginButton from "../components/GoogleLoginButton";

export const LOGIN_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=752669101446-ssmoaio24ohfv2vhg59gphbbdqtpe7kb.apps.googleusercontent.com&response_type=code&redirect_uri=https://dimi.monster/redirect/gauth&state=${process.env.REACT_APP_ENV}&scope=https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email`;

export default function Login() {
    let [isDarkMode, setIsDarkMode] = useState(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
    // update isDarkMode when the system changes the theme
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (e.matches) {
            setIsDarkMode(true);
        } else {
            setIsDarkMode(false);
        }
    });

    
    return (
        <div className="login-div">
            {
                <img className="logo" src={isDarkMode ? darklogo : logo}alt='디미몬스터 로고'/> 
            }
            
            
            <GoogleLoginButton/>
        </div>
    )
}