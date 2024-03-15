import React from 'react';
import './Header.css';

import { NavLink, Link, useNavigate } from 'react-router-dom';

import logo from '../images/logo.svg';

import api from '../utils/API';

export default function Header() {
    const navigate = useNavigate();

    return (
        <header>
            <Link to='/' className='logo'>
                <img src={logo} className='logo'/>
            </Link>

            <NavLink to='/' className="navlink" style={({isActive}) => ({color:isActive ? '#DD0D75' : 'black'})}>메인</NavLink>
            <NavLink to='/about' className="navlink" style={({isActive}) => ({color:isActive ? '#DD0D75' : 'black'})}>소개</NavLink>
            <NavLink to='/upload' className="navlink" style={({isActive}) => ({color:isActive ? '#DD0D75' : 'black'})}>업로드</NavLink>

            <div className="margin"></div>

            <button className='header-right' onClick={logout}>
                <div className='logout'>로그아웃</div>
                <div>{localStorage.getItem('name')}</div>
            </button>
        </header>
    )

    function logout() {
        if(confirm('로그아웃하시겠습니까?'))
            api.logout().then(() => navigate('/login'));
    }
}