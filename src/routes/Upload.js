import React from "react";
import './Upload.css';
import logo from '../images/logo.png';
import defaultImage from '../images/default-image.png';
import TitleBox from "../components/TitleBox";

export default function Upload() {
    return (
        <div className='upload-outer-box'>
            <div className='upload-inner-box'>
                <div className='title'>
                    <img src={logo} className='logo'/>
                    <div>업로드</div>
                </div>

                <div className='contents'>
                    <div className='contents-left'>
                        <img src={defaultImage} className='default-image'/>
                        <div>이미지 선택하기</div>
                    </div>
                    <div className='contents-right'>
                        <TitleBox title='장소'>
                            <input type='text' placeholder='장소를 입력해주세요.'/>
                        </TitleBox>
                        <TitleBox title='간단 설명'>
                        <input type='text' placeholder='장소 설명을 입력해주세요.'/>
                        </TitleBox>
                    </div>
                </div>
            </div>
        </div>
    )
}