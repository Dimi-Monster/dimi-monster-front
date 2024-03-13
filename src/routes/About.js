import logo2 from '../images/logo2.png';
import logo from '../images/logo.png';

import "./About.css";

export default function About() {
    return (
        <div className='about-div'>
            <img className='logo2' src={logo2}/>
            <img className='logo' src={logo}/>
            <div>한국디지털미디어고등학교 익명 사진공유 서비스, 디미몬스터</div>
        </div>
    )
}