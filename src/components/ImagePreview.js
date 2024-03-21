import React, {useState, useEffect, useRef} from "react";
import "./ImagePreview.css";
import x from '../images/x.svg';
import imageManager from "../utils/ImageManager";

import heart from '../images/heart.svg';
import heartDisabled from '../images/heart-disabled.svg';

import loadingCircle from '../images/loading-circle.svg';

export default function ImagePreview(props) {
    // const bottomBar = useRef(null);
    // const [bottomBarStyle, setBottomBarStyle] = useState({});

    // useEffect(() => {
    //     console.log(bottomBar.offsetWidth);
    //     setBottomBarStyle({...bottomBarStyle, fontSize: bottomBar.offsetWidth + 'px'});
    // }, [bottomBar]);

    const [imageUrl, setImageUrl] = useState(props.src); // 기본값은 썸네일
    const contentRef = useRef(null);
    const [animateState, setAnimateState] = useState(false);

    const [loaded, setLoadedState] = useState(false);
    //const [scroll, setScroll] = useState(0);

    useEffect(() => { // 고화질 이미지 불러오기
        // api.getOriginalImageUrl(props.id).then((url) => {
        //     console.log(url);
        //     setImageUrl(url);
        // });
        imageManager.getOriginalImage(props.id).then((img) => {
            setImageUrl(img);
            setLoadedState(true);
        })
    }, []);

    useEffect(() => {
        // let k = setInterval(() => {
        //     if(scroll >= contentRef.current.scrollWidth - contentRef.current.clientWidth + 100)
        //         setScroll(0);
        //     else
        //         setScroll(scroll+1);

        //     console.log(scroll);
        //     contentRef.current.scrollLeft = scroll;
        // }, 50);

        // return () => clearInterval(k);
        if(contentRef.current.scrollWidth > contentRef.current.clientWidth)
            setAnimateState(true);
    }, [contentRef]);

    return (
        <div className='image-preview-box' onClick={onClose}>
            <div className='image-preview' onClick={onInnerBoxClicked}>
                <img className='main-img' src={imageUrl} alt='몬스터 확대 이미지'/>
                <div className='bottom-bar' /*ref={bottomBar} style={bottomBarStyle}*/>
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
                </div>
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