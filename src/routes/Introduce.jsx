import React, {useState} from "react";
import './Introduce.css';

import logoDark from '../images/logo-dark.svg';
import logoMobile from '../images/logo-mobile.svg';

import { useMediaQuery } from 'react-responsive';
//import { Link } from "react-router-dom";

import dimibug from '../images/dimibug.svg';
import downArrow from '../images/down-arrow.svg';
import monsters from '../images/monsters.png';

import { LOGIN_URL } from "./login";

export default function Introduce() {
    const isMobile = useMediaQuery({query : "(max-width:520px)"});
    let [/*isDarkMode*/, setIsDarkMode] = useState(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
    // update isDarkMode when the system changes the theme
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (e.matches) {
            setIsDarkMode(true);
        } else {
            setIsDarkMode(false);
        }
    });

    function login() {
        document.location.href = LOGIN_URL;
    }

    return (
        <div className='introduce-box'>
            <div className='introduce-header'>
                <div className='logo'>
                    {!isMobile && <img src={logoDark} className='logo' alt='디미몬스터'/>}
                    {isMobile && <img src={logoMobile} className='logo' alt='디미몬스터'/>}
                </div>
                <div className='placeholder'/>
                <button className='login' onClick={login}>
                    간편 로그인
                </button>
            </div>

            <div className='content-1'>
                <div className='subject-box'>
                    <h1>
                        혼자만 간직하기엔<br/>세상은 너무 넓다
                    </h1>
                    <div className='underline'>
                        <div></div>
                        <img className='dimibug' src={dimibug}/>
                    </div>
                </div>
                <div style={{height: '4rem'}}/>
                <h3>
                    디미몬스터와 함께라면<br/>평범했던 일상을 361도 휙.
                </h3>

                <div style={{flexGrow: 1}}/>

                <img src={downArrow} style={{height: '0.5rem'}} className='down-arrow'/>
            </div>

            <div style={{height: '4rem'}}/>

            <div className='content-2'>
                <h2>
                    평범한 삶에<br/><em>디미몬스터 한 방울.</em>
                </h2>

                <img class='monsters-image' src={monsters}/>
            </div>

            <div style={{height: '4rem'}}/>

            <div className='content-3'>
                <div className='yourturn'>
                    <img src={logoDark} style={{height: '2rem'}}/> <br/>
                    <em>이젠, 당신의 차례.</em>
                </div>

                <div className='life-sharing'>
                    <em>일상을<br/>공유하는</em>
                    <h1>김승억</h1>
                    <div>
                        <img src={dimibug} style={{height: '2.8rem'}}/>
                        <img src={dimibug} style={{height: '2.8rem'}}/>
                    </div>
                </div>

                <div className='start'>
                    <button onClick={login}>시작하기</button>
                </div>
            </div>
        </div>
    )
}