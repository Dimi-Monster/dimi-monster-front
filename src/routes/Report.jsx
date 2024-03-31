import React, { useState, useEffect } from "react";
import './Report.css';
import logo from '../images/logo.svg';
import logoDark from '../images/logo-dark.svg';
import defaultImage from '../images/default-image.svg';
import defaultImageDark from '../images/default-image-dark.svg';
import TitleBox from "../components/TitleBox";
//import api from "../utils/API";
import Button from "../components/Button";
import dimibug from '../images/dimibug.svg';
import { useNavigate, useSearchParams } from "react-router-dom";

import thumbnailCacher from "../utils/ThumbnailCacher";

export default function Report() {
    const [reason, setReason] = useState('');
    const [explanation, setExplanation] = useState('');

    const [buttonTitle, setButtonTitle] = useState('신고하기');

    const [uploadingState, setUplodingState] = useState(false);

    const navigate = useNavigate();

    const [searchParams, /*setSearchParams*/] = useSearchParams();

    let [isDarkMode, setIsDarkMode] = useState(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
    const [imageSrc, setImageSrc] = useState(isDarkMode ? defaultImageDark : defaultImage);

    useEffect(() => {
        const id = searchParams.get('id');

        if(id === null) {
            navigate('/');
            return;
        }

        thumbnailCacher.exists(id).then(exists => {
            if(!exists) {
                navigate('/');
                return;
            }

            return thumbnailCacher.load(id);
        }).then(img => {
            setImageSrc(img);
        })
        
        const script = document.createElement("script");

        script.src = "https://www.google.com/recaptcha/enterprise.js";
        script.async = true;
    
        document.body.appendChild(script);
    }, []);
    // update isDarkMode when the system changes the theme
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (e.matches) {
            setIsDarkMode(true);
            // if (croppedImageSrc === defaultImage){
            //     setCroppedImageSrc(defaultImageDark);
            // }
        } else {
            setIsDarkMode(false);
            // if (croppedImageSrc === defaultImageDark){
            //     setCroppedImageSrc(defaultImage);
            // }
        }
    });

    return (
        <div className='report-outer-box'>
            <div className='report-inner-box'>
                <div className='title'>
                    <img src={isDarkMode ? logoDark : logo} className='logo' alt='디미몬스터 로고'/>
                    <div>신고</div>
                </div>

                <div className='contents'>
                    <button className='contents-left'>
                        <img src={imageSrc} className='image' alt='신고할 몬스터 사진'/>
                        {/* <div>이미지 선택하기</div> */}
                    </button>
                    <div className='contents-right'>
                        <TitleBox title='신고 사유'>
                            <input type='text' placeholder="신고 사유를 입력해주세요." value={reason} onChange={onReasonChanged}/>
                        </TitleBox>
                        <TitleBox title='자세한 설명' className='explain-box' innerStyle={{ display: 'flex', flexGrow: 1 }}>
                            <textarea placeholder='자세한 설명을 입력해주세요.' className='explain' value={explanation} onChange={onExplanationChanged}/>
                        </TitleBox>
                    </div>
                </div>

                <form onSubmit={onReport}>
                    <div className="g-recaptcha" data-sitekey={process.env.REACT_APP_RECAPTCHA_SITEKEY} data-action="image_upload" 
                        data-theme={isDarkMode ? 'dark' : undefined}></div>
                    <Button title={buttonTitle} imgSrc={dimibug} color='default' height='1.2rem' type='submit'/>
                </form>
            </div>
        </div>
    )

    function onReasonChanged(e) {
        setReason(e.target.value);
    }
    
    function onExplanationChanged(e) {
        if(e.target.value.length > 200)
            alert('설명이 너무 길어요.');
        else
            setExplanation(e.target.value);
    }

    function onReport(event) {
        event.preventDefault();

        if(uploadingState)
            return;

        alert(searchParams.get('id'));
        
        let token = event.target[0].value;
        console.log(token);

        if(token === '' || token === null) {
            alert('캡챠 인증 후 업로드해주세요.');
            return;
        }

        setUplodingState(true);
        setButtonTitle('신고 중...');

        // api.uploadImage({
        //     img: imageBlob,
        //     location: locationName,
        //     description: explanation,
        //     token: token
        // })
        // .then(isSuccess => {
        //     setUplodingState(false);
        //     setButtonTitle('신고하기');

        //     if(!isSuccess) {
        //         alert('업로드에 실패했습니다.');
        //     }
        //     else
        //         alert('업로드에 성공했습니다.');

        //     navigate('/');
        // })
    }
}