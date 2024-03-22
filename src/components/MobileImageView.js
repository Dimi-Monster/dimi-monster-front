// MobileImageView: 모바일 UI의 '주간 몬스터' 디자인 구현

import React, {useState, useEffect, useRef} from "react";
import "./MobileImageView.css";
import imageManager from "../utils/ImageManager";

import heart from '../images/heart.svg';
import heartDisabled from '../images/heart-disabled.svg';

import loadingCircle from '../images/loading-circle.svg';

export default function MobileImageView(props) {

    const [imageUrl, setImageUrl] = useState(props.src); // 기본값은 썸네일
    const contentRef = useRef(null);
    const [animateState, setAnimateState] = useState(false);

    const [loaded, setLoadedState] = useState(false);

    useEffect(() => { // 고화질 이미지 불러오기
        if(props.id === undefined)
            return;

        imageManager.getOriginalImage(props.id).then((img) => {
            setImageUrl(img);
            setLoadedState(true);
        })
    }, [props]);

    useEffect(() => {
        if(contentRef.current.scrollWidth > contentRef.current.clientWidth)
            setAnimateState(true);
    }, [contentRef, props]);

    return (
        <div className='' onClick={onClose}>
            <div className='mobile-imageview' onClick={onInnerBoxClicked}>
                <img className='main-img' src={imageUrl} alt='몬스터 확대 이미지'/>
                <div className='bottom-bar'>
                    <div className='title-contents-box'>
                        <div className='title'>{props.title}</div>
                        <div className='content animated' ref={contentRef}>
                            <div className={animateState ? 'text-animated' : ''}>{props.content}</div>
                        </div>
                    </div>
                    <button className='like' onClick={onLikeClicked}>
                        <img src={props.like ? heart : heartDisabled} alt='좋아요'/>
                        <div>+{props.hearts}</div>
                    </button>
                </div>
                {!loaded && <img className='loading' src={loadingCircle} alt='로딩 중..'/>}
            </div>
        </div>
    )

    function onLikeClicked() {
        if(props.like)
            props.onUnlike(props.id);
        else
            props.onLike(props.id);
    }
    
    function onInnerBoxClicked(event) {
        event.stopPropagation();
    }
    
    function onClose() {
    }
}