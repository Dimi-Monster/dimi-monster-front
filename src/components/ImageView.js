import React, { useState } from 'react';
import './ImageView.css';
import heart from '../images/heart.svg';
import ImagePreview from './ImagePreview';

export default function ImageView(props) {
    const [previewState, setPreviewState] = useState(false);

    function onImageClicked() {
        setPreviewState(true);
    }
    function onPreviewFinished() {
        setPreviewState(false);
    }

    return (
        <div className="imageview">
            <button onClick={onImageClicked}>
                <img src={props.src}/>
            </button>
            <div className="rightbox">
                <div className="title">{props.title}</div>
                <div className="content">{props.content}</div>

                <div className="margin"/>

                <button className={props.enabled ? '' : 'disabled'}>좋아요</button>
            </div>

            <div className='floatbox'>
                <img src={heart}/>
                <div>+{props.hearts}</div>
            </div>

            {previewState && <ImagePreview src={props.src} title={props.title} content={props.content} onFinish={onPreviewFinished}/>}
        </div>
    )
}