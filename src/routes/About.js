import React from 'react';
import logo2 from '../images/logo2.png';
import logo from '../images/logo.svg';
import { useMediaQuery } from 'react-responsive';

import "./About.css";

export default function About() {
    const isMobile = useMediaQuery({query: "(max-width:500px)"})

    return (
        <div className='about-div'>
            <img className='logo2' src={logo2}/>
            <img className='logo' src={logo}/>
            {!isMobile && <div>한국디지털미디어고등학교 익명 사진공유 서비스, 디미몬스터</div>}
            {isMobile && <div>한국디지털미디어고등학교<br/>익명 사진공유 서비스</div>}
        </div>
    )
}