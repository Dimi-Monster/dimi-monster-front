import React, {useState, useEffect, useRef} from "react";
import "./ImagePreview.css";
import x from '../images/x.svg';
import imageManager from "../utils/ImageManager";

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
    //const [scroll, setScroll] = useState(0);

    useEffect(() => { // 고화질 이미지 불러오기
        // api.getOriginalImageUrl(props.id).then((url) => {
        //     console.log(url);
        //     setImageUrl(url);
        // });
        imageManager.getOriginalImage(props.id).then((img) => {
            setImageUrl(img);
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
                <img src={imageUrl} alt='몬스터 확대 이미지'/>
                <div className='bottom-bar' /*ref={bottomBar} style={bottomBarStyle}*/>
                    <div className='title-contents-box'>
                        <div className='title'>{props.title}</div>
                        <div className='content animated' ref={contentRef}>
                            <div className={animateState ? 'text-animated' : ''}>{props.content}</div>
                        </div>
                    </div>
                    <div className='like'>좋아요버튼</div>
                </div>
                <button className='close' onClick={onClose}>
                    <img src={x} alt='종료 버튼'/>
                </button>
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