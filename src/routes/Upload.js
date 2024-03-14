import React, {useRef, useState} from "react";
import './Upload.css';
import logo from '../images/logo.png';
import defaultImage from '../images/default-image.png';
import TitleBox from "../components/TitleBox";
import CropView from "../components/CropView";

export default function Upload() {
    const inputFile = useRef(null);
    const image = useRef(null);

    const [croppedImageSrc, setCroppedImageSrc] = useState(defaultImage);
    const [imageSrc, setImageSrc] = useState(defaultImage);

    const [cropState, setCropState] = useState(false);

    return (
        <div className='upload-outer-box'>
            <div className='upload-inner-box'>
                <div className='title'>
                    <img src={logo} className='logo'/>
                    <div>업로드</div>
                </div>

                <div className='contents'>
                    <button className='contents-left' onClick={selectFile}>
                        <img src={croppedImageSrc} ref={image} className='image'/>
                        <div>이미지 선택하기</div>
                    </button>
                    <div className='contents-right'>
                        <TitleBox title='장소'>
                            <input type='text' placeholder='장소를 입력해주세요.'/>
                        </TitleBox>
                        <TitleBox title='간단 설명' className='explain-box' innerStyle={{display: 'flex', flexGrow: 1 }}>
                            <input type='text' placeholder='장소 설명을 입력해주세요.' className='explain'/>
                        </TitleBox>
                    </div>
                </div>

                <button>사진 업로드</button>
            </div>

            {cropState ? <CropView image={imageSrc} ratio={1} onFinished={onCropFinished} className="cropview"/> : <div/>}
            <input type="file" id="file" ref={inputFile} style={{display: "none"}} accept="image/*" onChange={onFileChanged}/>
        </div>
    )

    function selectFile() {
        alert('hi');
        inputFile.current.click();
    }
    function onFileChanged(event) {
        let fileObj = event.target.files[0];
        let fileUrl = window.URL.createObjectURL(fileObj);

        console.log(fileObj);
        console.log(fileUrl);

        setImageSrc(fileUrl);
        setCroppedImageSrc(fileUrl); // 테스트
        
        setCropState(true);
    }
    function onCropFinished(imgUrl) {
        setCroppedImageSrc(imgUrl);

        setCropState(false);
    }
}