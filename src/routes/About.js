import React, { useState } from 'react';
import logo2 from '../images/logo2.png';
import logo from '../images/logo.svg';
import logoDark from '../images/logo-dark.svg';
import { useMediaQuery } from 'react-responsive';

import "./About.css";

export default function About() {
    const isMobile = useMediaQuery({query: "(max-width:500px)"})
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
        <div className='about-div'>
            <img className='logo2' src={logo2}/>
            <img className='logo' src={isDarkMode ? logoDark : logo}/>
            {!isMobile && <div className='introduce'>한국디지털미디어고등학교 익명 사진공유 서비스, 디미몬스터</div>}
            {isMobile && <div className='introduce'>한국디지털미디어고등학교<br/>익명 사진공유 서비스</div>}

            <div className='privacy'>
                <a href='https://privacy.dimi.monster/'>개인정보처리방침 &gt;</a>
                <a href='https://term.dimi.monster/'>이용약관 &gt;</a>
            </div>
        </div>
    )
}