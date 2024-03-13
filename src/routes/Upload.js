import React from "react";
import './Upload.css';
import logo from '../images/logo.svg';
import defaultImage from '../images/default-image.png';

export default function Upload() {
    return (
        <div className='upload-outer-box'>
            <div className='upload-inner-box'>
                <div className='title'>
                    <img src={logo} className='logo'/>
                    <div>업로드</div>
                </div>

                <div className='contents'>
                    <img src={defaultImage} className='default-image'/>
                </div>
            </div>
        </div>
    )
}