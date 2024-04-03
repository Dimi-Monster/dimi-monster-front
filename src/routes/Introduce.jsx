import React, {useEffect, useState} from "react";
import './Introduce.css';

import logoDark from '../images/logo-dark.svg';
import logoMobile from '../images/logo-mobile.svg';

import { useMediaQuery } from 'react-responsive';
//import { Link } from "react-router-dom";

import dimibug from '../images/dimibug.svg';
import downArrow from '../images/down-arrow.svg';
import monsters from '../images/monsters.png';

import { LOGIN_URL } from "./login";

import namer from 'korean-name-generator';

export default function Introduce() {
    const [sharingLifeName, setSharingLifeName] = useState('');
    const [animationState, setAnimationState] = useState(false);

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

    //const names = [namer.generate(true), '김승억', '김종현'];

    // useEffect(() => {
    //     let namelist = [];
    //     for(let i=0; i<100; i++) {
    //         namelist.push(namer.generate(Math.random() >= 0.5));
    //     }
    //     console.log(JSON.stringify(namelist));
    // }, []);

    // ㅂ, 붸, 뷁 이런식으로 나오게
    function divideKor(kor) {
        const f = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ',
            'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ',
            'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
        const s = ['ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ',
            'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ',
            'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ'];
        // const t = ['', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ',
        //     'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ',
        //     'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ',
        //     'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];

        const doubleMoum = {
            'ㅘ': [8, 9],
            'ㅙ': [8, 10],
            'ㅚ': [8, 11],
            'ㅝ': [13, 14],
            'ㅞ': [13, 15],
            'ㅟ': [13, 16],
            'ㅢ': [18, 19]
        }
        

        const ga = 44032;
        let uni = kor.charCodeAt(0);

        uni = uni - ga;

        let fn = parseInt(uni / 588);
        let sn = parseInt((uni - (fn * 588)) / 28);
        let tn = parseInt(uni % 28);

        let res = [f[fn]];

        if(s[sn] in doubleMoum) {
            for(let m of doubleMoum[s[sn]])
                res.push(String.fromCharCode(fn*588 + m*28 + ga));
        }
        else {
            res = [...res, String.fromCharCode(uni - tn + ga)];
        }

        if(res[res.length-1] != kor)
            res = [...res, kor];

        return res;
    }
    //console.log(divideKor('의'));
    //[출처] [자바스크립트] 한글 자음 모음 분리 / 초성 * 중성 * 종성|작성자 Scripter

    async function lifeSharingAnimation() {
        const sleep = (ms) => new Promise((resolve, /*reject*/) => {
            setTimeout(() => resolve(), ms);
        });
        
        //await sleep(1000);

        let isMale = Math.random() >= 0.5;
        const names = [namer.generate(isMale)];
        console.log(isMale);

        let nowStr = '';
        for(let name of names) {
            for(let ch of name) {
                let str = nowStr;
                let arr = divideKor(ch);

                for(let k of arr) {
                    setSharingLifeName(str + k);
                    await sleep(120);
                }
                nowStr += ch;
            }

            await sleep(1623);

            for(let i=name.length-1; i>=0; i--) {
                nowStr = nowStr.substring(0, i);
                setSharingLifeName(nowStr);
                await sleep(169);
            }
            
            await sleep(1012);
        }

        setAnimationState(!animationState);
    }

    useEffect(() => {lifeSharingAnimation();}, [animationState]);

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
                        <img className='dimibug' src={dimibug} alt='디미몬스터'/>
                    </div>
                </div>
                <div style={{height: '4rem'}}/>
                <h3>
                    디미몬스터와 함께라면<br/>평범했던 일상을 361도 휙.
                </h3>

                <div style={{flexGrow: 1}}/>

                <img src={downArrow} style={{height: '0.5rem'}} className='down-arrow' alt='아래쪽 화살표'/>
            </div>

            <div style={{height: '4rem'}}/>

            <div className='content-2'>
                <h2>
                    평범한 삶에<br/><em>디미몬스터 한 방울.</em>
                </h2>
                
                <div style={{position: 'relative'}}>
                    <img className='monsters-image' src={monsters}/>
                    <img className='monsters-image-2' src={monsters}/>
                </div>
            </div>

            <div style={{height: '4rem'}}/>

            <div className='content-3'>
                <div className='yourturn'>
                    <img src={logoDark} style={{height: '2rem'}}/> <br/>
                    <em>이젠, 당신의 차례.</em>
                </div>

                <div className='life-sharing'>
                    <em>일상을<br/>공유하는</em>
                    <h1 className="cursor-box">
                        {sharingLifeName}
                        <div className="cursor"/>
                    </h1>
                    <div>
                        <img src={dimibug}/>
                        <img src={dimibug}/>
                    </div>
                </div>

                <div className='start'>
                    <button onClick={login}>시작하기</button>
                </div>
            </div>
        </div>
    )
}