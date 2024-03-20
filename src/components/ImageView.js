import React, { useState } from 'react';
import './ImageView.css';
import heart from '../images/heart.svg';
import heartDisabled from '../images/heart-disabled.svg';
import ImagePreview from './ImagePreview';
//import api from '../utils/API';
//import imageManager from '../utils/ImageManager';
//import defaultImage from '../images/default-image.svg';

export default function ImageView(props) {
    const [previewState, setPreviewState] = useState(false);
    //const [imageUrl, /*setImageUrl*/] = useState('');

    function onImageClicked() {
        setPreviewState(true);
    }
    function onPreviewFinished() {
        setPreviewState(false);
    }

    function onLikeClicked() {
        if(props.enabled)
            props.onLike(props.id);
        else
            props.onUnlike(props.id);
    }

    return (
        <div className="imageview">
            <button onClick={onImageClicked}>
                <img src={props.src} alt='몬스터 이미지'/>
            </button>
            <div className="rightbox">
                <div className="title">{props.title}</div>
                <div className="content">{props.content}</div>

                <div className="margin"/>

                <button className={props.enabled ? '' : 'disabled'} onClick={onLikeClicked}>
                    {props.enabled ? '좋아요' : '좋아해요!'}
                    </button>
            </div>

            <div className='floatbox'>
                <img src={props.enabled ? heartDisabled : heart} alt='좋아요'/>
                <div>+{props.hearts}</div>
            </div>

            {previewState && <ImagePreview 
                id={props.id}
                title={props.title}
                content={props.content}
                onFinish={onPreviewFinished}
                src={props.src} /* 썸네일 이미지 */
                enabled={props.enabled}
                />}
        </div>
    )
}