import React from "react";
import "./NotFound.css";
import notfoundImage from '../images/notfound.png';
import logo from '../images/logo.png';

export default function NotFound() {
    return (
        <div className="notfound">
            <img src={notfoundImage} className='notfound-image'/>
            <img src={logo} className='logo-image'/>
            <div>잘못 찾아오신 것 같아요.</div>
        </div>
    )
}