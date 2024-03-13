import './Header.css';

import { NavLink, Link } from 'react-router-dom';

import logo from '../images/logo.png';

export default function Header() {
    return (
        <header>
            <Link to='/' className='logo'>
                <img src={logo} className='logo'/>
            </Link>

            <NavLink to='/' className="navlink" style={({isActive}) => ({color:isActive ? '#DD0D75' : 'black'})}>메인</NavLink>
            <NavLink to='/about' className="navlink" style={({isActive}) => ({color:isActive ? '#DD0D75' : 'black'})}>소개</NavLink>
            <NavLink to='/upload' className="navlink" style={({isActive}) => ({color:isActive ? '#DD0D75' : 'black'})}>업로드</NavLink>

            <div className="margin"></div>

            <button className='header-right'>
                <div className='logout'>로그아웃</div>
                <div>3423 이동현</div>
            </button>
        </header>
    )
}