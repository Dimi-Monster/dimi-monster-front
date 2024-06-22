import React, { useEffect, useState, useRef } from 'react';
import PropTypes from "prop-types";
import api from '../utils/API';
import { useNavigate } from "react-router-dom";
import logoMobile from "../images/logo-mobile.svg";

export default function HeaderPopup({ onClose }) {
    const navigate = useNavigate();
    let [isClosing, setIsClosing] = useState(false);
    const modalRef = useRef(null);

    const handleClick = () => {
        if (!isClosing) {
            console.log('클릭 감지, 애니메이션 실행 시작 예정');
            setIsClosing(true);
        }
    };

    const closeModalIfClosing = () => {
        if (isClosing) {
            console.log('애니메이션이 끝났고, isClosing이 true니까 onClose 함수를 호출할게요!',);
            
            if(onClose !== undefined)
                onClose();

            setIsClosing(false);
        }
    };

    useEffect(() => {
        const modalElement = modalRef.current;

        if (!modalElement) {
            return;
        }

        modalElement.addEventListener('animationend', closeModalIfClosing);

        return () => {
            modalElement.removeEventListener('animationend', closeModalIfClosing);
        };
    }, [isClosing]);

    return <div ref={modalRef} className={ isClosing ? "menu fade-out" : "menu fade-in" }>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '0.5rem' }}>
            <img src={logoMobile} className='profile-image' />
            {localStorage.getItem('name')}
        </div>
        <button>언어 설정</button>
        <button onClick={handleClick}>내 블로그</button>
        <button onClick={() => api.logout().then(() => navigate("/main", { replace: true }))}>로그아웃</button>
    </div>;
}

HeaderPopup.propTypes = {
    onClose: PropTypes.func,
}