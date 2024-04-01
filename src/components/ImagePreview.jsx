import React, {useState, useEffect} from "react";
import "./ImagePreview.css";
import "./animation.css";
import x from '../images/x.svg';
import imageManager from "../utils/ImageManager";
import { useSearchParams } from 'react-router-dom';

//import heart from '../images/heart.svg';
//import heartDisabled from '../images/heart-disabled.svg';

import loadingCircle from '../images/loading-png.png';
import BottomBar from "./BottomBar";

import dimibug from '../images/dimibug.svg';

export default function ImagePreview(props) {
    const [searchParams, setSearchParams] = useSearchParams();

    const [imageUrl, setImageUrl] = useState(props.src); // 기본값은 썸네일
    //const contentRef = useRef(null);
    //const [animateState, setAnimateState] = useState(false);

    const [loaded, setLoadedState] = useState(false);

    useEffect(() => { // 고화질 이미지 불러오기
        imageManager.getOriginalImage(props.id).then((img) => {
            setImageUrl(img);
            setLoadedState(true);
        })


        if(!searchParams.has('id'))
            setSearchParams({...searchParams, 'id': props.id});

        //return () => setSearchParams({}); // 이렇게 하면 계속 뭔가 잘 안된다 ㅠㅠ
    }, []);

    // useEffect(() => {
    //     if(contentRef.current.scrollWidth > contentRef.current.clientWidth)
    //         setAnimateState(true);
    // }, [contentRef]);

    return (
        <div className='image-preview-box' onClick={onClose}>
            <div className='image-preview' onClick={onInnerBoxClicked}>
                <img className='main-img' src={imageUrl} alt='몬스터 확대 이미지'/>
                {/* <div className='bottom-bar'>
                    <div className='title-contents-box'>
                        <div className='title'>{props.title}</div>
                        <div className='content animated' ref={contentRef}>
                            <div className={animateState ? 'text-animated' : ''}>{props.content}</div>
                        </div>
                    </div>
                    <button className='like' onClick={props.onLikeClicked}>
                        <img src={props.like ? heart : heartDisabled} alt='좋아요'/>
                        <div>+{props.hearts}</div>
                    </button>
                </div> */}
                
                <BottomBar 
                    title={props.title}
                    content={props.content}
                    src={dimibug}
                    buttonTitle={`신고`}
                    onClick={props.onClick} />

                <button className='close' onClick={onClose}>
                    <img src={x} alt='종료 버튼'/>
                </button>
                {!loaded && <img className='loading' src={loadingCircle} alt='로딩 중..'/>}
            </div>
        </div>
    )

    function onInnerBoxClicked(event) {
        event.stopPropagation();
    }
    
    function onClose() {
        props.onFinish();
    }
}