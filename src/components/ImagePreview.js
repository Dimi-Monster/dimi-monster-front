import React from "react";
import "./ImagePreview.css";
import x from '../images/x.svg';

export default function ImagePreview(props) {
    return (
        <div className='image-preview-box'>
            <div className='image-preview'>
                <img src={props.src}/>
                <div className='bottom-bar'>
                    {props.content}
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