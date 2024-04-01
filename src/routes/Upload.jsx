import React, { useRef, useState, useEffect } from "react";
import './Upload.css';
import logo from '../images/logo.svg';
import logoDark from '../images/logo-dark.svg';
import defaultImage from '../images/default-image.svg';
import defaultImageDark from '../images/default-image-dark.svg';
import TitleBox from "../components/TitleBox";
import CropView from "../components/CropView";
import imageCompression from "browser-image-compression";
import api from "../utils/API";
import Button from "../components/Button";
import dimibug from '../images/dimibug.svg';
import { useNavigate } from "react-router-dom";

export default function Upload() {
    const locationList = [
        "--- 본관 ---",

        // 본관
        "본관 교무실",
        "1-1 교실",
        "1-2 교실",
        "1-3 교실",
        "1-4 교실",
        "1-5 교실",
        "1-6 교실",
        "2-1 교실",
        "2-2 교실",
        "2-3 교실",
        "2-4 교실",
        "2-5 교실",
        "2-6 교실",
        "법인사무실",

        "--- 신관 ---",
    
        // 신관
        "신관 교무실",
        "디미카페",
        "다목적 학습실",
        "열람실",
        "3-1 교실",
        "3-2 교실",
        "3-3 교실",
        "3-4 교실",
        "3-5 교실",
        "3-6 교실",

        "--- 기타 장소 ---",
    
        // 기타
        "운동장",
        "체육관",
        "실외 공간",
        "기타 장소",
    ];

    const inputFile = useRef(null);
    const image = useRef(null);

    
    const [imageSrc, setImageSrc] = useState(defaultImage);
    const [imageBlob, setImageBlob] = useState(new Blob());

    const [imageSelected, setImageSelected] = useState(false);

    const [cropState, setCropState] = useState(false);

    const [locationName, setLocationName] = useState(locationList[0]);
    const [explanation, setExplanation] = useState('');

    const [buttonTitle, setButtonTitle] = useState('사진 업로드');

    const [uploadingState, setUplodingState] = useState(false);

    const [filename, setFilename] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const script = document.createElement("script");

        script.src = "https://www.google.com/recaptcha/enterprise.js";
        script.async = true;
    
        document.body.appendChild(script);
    }, []);
    let [isDarkMode, setIsDarkMode] = useState(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
    const [croppedImageSrc, setCroppedImageSrc] = useState(isDarkMode ? defaultImageDark : defaultImage);
    // update isDarkMode when the system changes the theme
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (e.matches) {
            setIsDarkMode(true);
            if (croppedImageSrc === defaultImage){
                setCroppedImageSrc(defaultImageDark);
            }
        } else {
            setIsDarkMode(false);
            if (croppedImageSrc === defaultImageDark){
                setCroppedImageSrc(defaultImage);
            }
        }
    });

    //console.log(process.env.REACT_APP_RECAPTCHA_SITEKEY);

    return (
        <div className='upload-outer-box'>
            <div className='upload-inner-box'>
                <div className='title'>
                    <img src={isDarkMode ? logoDark : logo} className='logo' alt='디미몬스터 로고'/>
                    <div>업로드</div>
                </div>

                <div className='contents'>
                    <button className='contents-left' onClick={selectFile}>
                        <img src={croppedImageSrc} ref={image} className='image' alt='업로드할 몬스터 사진'/>
                        <div>이미지 선택하기</div>
                    </button>
                    <div className='contents-right'>
                        <TitleBox title='장소'>
                            <select onChange={onLocationChanged} defaultValue={locationList[1]}>
                                { locationList.map(loc => <option value={loc} disabled={loc.startsWith('-')}>{loc}</option>) }
                            </select>
                        </TitleBox>
                        <TitleBox title='간단 설명' className='explain-box' innerStyle={{ display: 'flex', flexGrow: 1 }}>
                            <textarea placeholder='장소 설명을 입력해주세요. (최대 30자)' className='explain' value={explanation} onChange={onExplanationChanged}/>
                        </TitleBox>
                    </div>
                </div>

                <form onSubmit={(e) => onUpload(e)}>
                    <div className="g-recaptcha" data-sitekey={process.env.REACT_APP_RECAPTCHA_SITEKEY} data-action="image_upload" 
                        data-theme={isDarkMode ? 'dark' : undefined}></div>
                    <Button title={buttonTitle} imgSrc={dimibug} color='default' height='1.2rem' type='submit'/>
                </form>
            </div>

            {cropState ? <CropView image={imageSrc} ratio={1} onFinished={onCropFinished} className="cropview" filename={filename}/> : <div />}
            <input type="file" id="file" ref={inputFile} style={{ display: "none" }} accept="image/*" onChange={onFileChanged} />
        </div>
    )

    function selectFile() {
        inputFile.current.click();
    }
    function onFileChanged(event) {
        async function f() {
            let fileObj = event.target.files[0];
            let filename = fileObj.name;

            if(fileObj === undefined)
                return;

            setFilename(filename);

            let compressedFile = await imageCompression(fileObj, {
                // maxSizeMB: 1,
                maxWidthOrHeight: 2048,
                fileType: 'image/jpeg'
            });

            let fileUrl = window.URL.createObjectURL(compressedFile);

            setImageSrc(fileUrl);
            setCroppedImageSrc(fileUrl); // 테스트

            setCropState(true);
            setImageSelected(true);
        }
        f();
    }

    async function convertURLtoFile(url) {
        const response = await fetch(url);
        const data = await response.blob();
        const ext = url.split(".").pop(); // url 구조에 맞게 수정할 것
        const filename = url.split("/").pop(); // url 구조에 맞게 수정할 것
        const metadata = { type: `image/${ext}` };
        return new File([data], filename, metadata);
    }

    function onCropFinished(imgUrl) {
        async function f() {
            let file = await convertURLtoFile(imgUrl);
            let compressedFile = await imageCompression(file, {
                maxSizeMB: 1,
                maxWidthOrHeight: 1024,
                fileType: 'image/jpeg'
            });


            // Blob으로 이미지 파일 생성
            const blob = new Blob([compressedFile], { type: 'image/jpeg' });

            // Blob을 URL로 변환
            const compressedUrl = URL.createObjectURL(blob);
            //console.log(compressedUrl);

            setCroppedImageSrc(compressedUrl);
            setImageBlob(blob);

            setCropState(false);
        }
        f();
    }

    function onLocationChanged(e) {
        setLocationName(e.target.value);
    }
    
    function onExplanationChanged(e) {
        if(e.target.value.length > 30)
            alert('설명이 너무 길어요.');
        else
            setExplanation(e.target.value);
    }

    function onUpload(event) {
        event.preventDefault();

        if(uploadingState)
            return;

        if(!imageSelected) {
            alert('업로드할 이미지를 선택해주세요.');
            return;
        }
        
        let token = event.target[0].value;
        console.log(token);

        if(token === '' || token === null) {
            alert('캡챠 인증 후 업로드해주세요.');
            return;
        }

        setUplodingState(true);
        setButtonTitle('업로드 중...');

        api.uploadImage({
            img: imageBlob,
            location: locationName,
            description: explanation,
            token: token
        })
        .then(isSuccess => {
            setUplodingState(false);
            setButtonTitle('사진 업로드');

            if(!isSuccess) {
                alert('업로드에 실패했습니다.');
            }
            else
                alert('업로드에 성공했습니다.');

            navigate('/');
        })
    }
}