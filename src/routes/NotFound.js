import React from "react";
import "./NotFound.css";
import notfoundImage from '../images/notfound.png';
import logo from '../images/logo.svg';

export default function NotFound() {
    return (
        <div className="notfound">
            <img src={notfoundImage} className='notfound-image' alt='없는 페이지 로고'/>
            <img src={logo} className='logo-image' alt='디미몬스터 로고'/>
            <div>잘못 찾아오신 것 같아요.</div>
        </div>
    )
}