import React, { useState } from "react";
import logo from "../images/logo.svg";
import darklogo from "../images/logo-dark.svg";

import "./login.css";
import GoogleLoginButton from "../components/GoogleLoginButton";

export default function Login() {
    let [isDarkMode, setIsDarkMode] = useState(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
    // update isDarkMode when the system changes the theme
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        console.log(e.matches);
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