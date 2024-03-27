import React, {useEffect, useState} from 'react';
import './Header.css';

import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';

import logo from '../images/logo.svg';
import logoDark from '../images/logo-dark.svg';
import logoMobile from '../images/logo-mobile.svg';

import api from '../utils/API';

import { useMediaQuery } from 'react-responsive';

export default function Header(/*{onRefresh}*/) {
    const navigate = useNavigate();
    const isMobile = useMediaQuery({query : "(max-width:520px)"});
    const location = useLocation();

    useEffect(() => {
        if(localStorage.getItem('refresh-token') === null)
            navigate('/login', {replace: true});
    }, []);

    let [isDarkMode, setIsDarkMode] = useState(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
    // update isDarkMode when the system changes the theme
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (e.matches) {
            setIsDarkMode(true);
        } else {
            setIsDarkMode(false);
        }
    });

    function onRootClicked() {
        if(location.pathname == '/') {
            window.scrollTo({top: 0, behavior: 'smooth'});
        }
    }

    return (
        <header>
            <Link to='/' className='logo' onClick={onRootClicked}>
                {!isMobile && <img src={isDarkMode ? logoDark :logo} className='logo' alt='디미몬스터'/>}
                {isMobile && <img src={logoMobile} className='logo' alt='디미몬스터'/>}
            </Link>

            <NavLink to='/' className="navlink" style={({isActive}) => ({color:isActive ? '#DD0D75' : isDarkMode ? 'white': 'black'})}
                onClick={onRootClicked}>메인</NavLink>
            <NavLink to='/about' className="navlink" style={({isActive}) => ({color:isActive ? '#DD0D75' : isDarkMode ? 'white': 'black'})}>소개</NavLink>
            <NavLink to='/upload' className="navlink" style={({isActive}) => ({color:isActive ? '#DD0D75' : isDarkMode ? 'white': 'black'})}>업로드</NavLink>

            <div className="margin"></div>

            <button className='header-right' onClick={logout}>
                <div className='logout'>로그아웃</div>
                <div>{localStorage.getItem('name')}</div>
            </button>
        </header>
    )

    function logout() {
        if(confirm('로그아웃하시겠습니까?'))
            api.logout().then(() => navigate('/login', {replace: true}));
    }
}