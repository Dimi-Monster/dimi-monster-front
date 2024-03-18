import React, {useState, useEffect} from "react";
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

    useEffect(() => { // 고화질 이미지 불러오기
        // api.getOriginalImageUrl(props.id).then((url) => {
        //     console.log(url);
        //     setImageUrl(url);
        // });
        imageManager.getOriginalImage(props.id).then((img) => {
            setImageUrl(img);
        })
    }, []);

    return (
        <div className='image-preview-box' onClick={onClose}>
            <div className='image-preview' onClick={onInnerBoxClicked}>
                <img src={imageUrl} alt='몬스터 확대 이미지'/>
                <div className='bottom-bar' /*ref={bottomBar} style={bottomBarStyle}*/>
                    <div className='title-contents-box'>{props.content}</div>
                    <div>좋아요버튼</div>
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