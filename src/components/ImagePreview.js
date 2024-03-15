import React, {useState, useEffect} from "react";
import "./ImagePreview.css";
import x from '../images/x.svg';
import api from "../utils/API";

export default function ImagePreview(props) {
    // const bottomBar = useRef(null);
    // const [bottomBarStyle, setBottomBarStyle] = useState({});

    // useEffect(() => {
    //     console.log(bottomBar.offsetWidth);
    //     setBottomBarStyle({...bottomBarStyle, fontSize: bottomBar.offsetWidth + 'px'});
    // }, [bottomBar]);

    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        api.getOriginalImageUrl(props.id).then((url) => {
            console.log(url);
            setImageUrl(url);
        });
    }, []);

    return (
        <div className='image-preview-box'>
            <div className='image-preview'>
                <img src={imageUrl}/>
                <div className='bottom-bar' /*ref={bottomBar} style={bottomBarStyle}*/>
                    <div className='title-contents-box'>{props.content}</div>
                    <div>좋아요버튼</div>
                </div>
                <button className='close' onClick={onClose}>
                    <img src={x}/>
                </button>
            </div>
        </div>
    )
    
    function onClose() {
        props.onFinish();
    }
}