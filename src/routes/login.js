import React from "react";
import logo from "../images/logo.svg";

import "./login.css";
import GoogleLoginButton from "../components/GoogleLoginButton";

export default function Login() {
    return (
        <div className="login-div">
            <img src={logo} className="logo"/>
            
            <GoogleLoginButton/>
        </div>
    )
}