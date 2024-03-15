import React, { useRef, useState, useEffect } from "react";
import './Upload.css';
import logo from '../images/logo.svg';
import defaultImage from '../images/default-image.svg';
import TitleBox from "../components/TitleBox";
import CropView from "../components/CropView";
import imageCompression from "browser-image-compression";
import api from "../utils/API";
import Button from "../components/Button";
import dimibug from '../images/dimibug.svg';
import { useNavigate } from "react-router-dom";

export default function Upload() {
    const inputFile = useRef(null);
    const image = useRef(null);

    const [croppedImageSrc, setCroppedImageSrc] = useState(defaultImage);
    const [imageSrc, setImageSrc] = useState(defaultImage);
    const [imageBlob, setImageBlob] = useState(new Blob());

    const [cropState, setCropState] = useState(false);

    const [locationName, setLocationName] = useState('');
    const [explanation, setExplanation] = useState('');

    const [buttonTitle, setButtonTitle] = useState('사진 업로드');

    const [uploadingState, setUplodingState] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const script = document.createElement("script");

        script.src = "https://www.google.com/recaptcha/enterprise.js";
        script.async = true;
    
        document.body.appendChild(script);
    }, []);

    return (
        <div className='upload-outer-box'>
            <div className='upload-inner-box'>
                <div className='title'>
                    <img src={logo} className='logo' />
                    <div>업로드</div>
                </div>

                <div className='contents'>
                    <button className='contents-left' onClick={selectFile}>
                        <img src={croppedImageSrc} ref={image} className='image' />
                        <div>이미지 선택하기</div>
                    </button>
                    <div className='contents-right'>
                        <TitleBox title='장소'>
                            <input type='text' placeholder='장소를 입력해주세요.' value={locationName} onChange={onLocationChanged}/>
                        </TitleBox>
                        <TitleBox title='간단 설명' className='explain-box' innerStyle={{ display: 'flex', flexGrow: 1 }}>
                            <textarea placeholder='장소 설명을 입력해주세요.' className='explain' value={explanation} onChange={onExplanationChanged}/>
                        </TitleBox>
                    </div>
                </div>

                <form onSubmit={(e) => onUpload(e)}>
                    <div className="g-recaptcha" data-sitekey="6LdgSpgpAAAAAJKMC4NiXgYWrnn9ln7It_kpeIEQ" data-action="image_upload"></div>
                    {/* <button type='submit'>사진 업로드</button> */}
                    <Button title={buttonTitle} imgSrc={dimibug} color='default' height='1.2rem' type='submit'/>
                </form>
                {/* <button onClick={onUpload}>사진 업로드</button> */}

                {/* <ReCAPTCHA
                    ref={recaptchaRef}
                    className="mx-auto"
                    sitekey={process.env.REACT_APP_RECAPTCHA_SITEKEY}
                    onChange={async (value) => {
                        if (value === null) {
                            setCaptcha('');
                            return;
                        }
                        setCaptcha(value);
                        console.log(value);
                    }}
                /> */}
            </div>

            {cropState ? <CropView image={imageSrc} ratio={1} onFinished={onCropFinished} className="cropview" /> : <div />}
            <input type="file" id="file" ref={inputFile} style={{ display: "none" }} accept="image/*" onChange={onFileChanged} />
        </div>
    )

    function selectFile() {
        inputFile.current.click();
    }
    function onFileChanged(event) {
        async function f() {
            let fileObj = event.target.files[0];
            let compressedFile = await imageCompression(fileObj, {
                // maxSizeMB: 1,
                maxWidthOrHeight: 2048,
                fileType: 'image/jpeg'
            });

            let fileUrl = window.URL.createObjectURL(compressedFile);

            //console.log(fileUrl);

            setImageSrc(fileUrl);
            setCroppedImageSrc(fileUrl); // 테스트

            setCropState(true);
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
            //console.log(imgUrl);
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
        //console.log(e.target.value);
    }
    
    function onExplanationChanged(e) {
        setExplanation(e.target.value);
    }

    function onUpload(event) {
        event.preventDefault();

        if(uploadingState)
            return;
        
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