import React, { forwardRef, useState } from 'react';
import './ImageView.css';
import './ImageViewBig.css';
import heart from '../images/heart.svg';
import heartDisabled from '../images/heart-disabled.svg';
import ImagePreview from './ImagePreview';
//import api from '../utils/API';
//import imageManager from '../utils/ImageManager';
//import defaultImage from '../images/default-image.svg';

const ImageView = forwardRef(function (props, forwardedRef) {
    const [previewState, setPreviewState] = useState(false);

    function onImageClicked() {
        setPreviewState(true);
    }
    function onPreviewFinished() {
        setPreviewState(false);
    }

    function onLikeClicked() {
        if(props.like)
            props.onUnlike(props.id);
        else
            props.onLike(props.id);
    }

    return (
        <div className={props.big ? 'imageview-big' : 'imageview'} ref={forwardedRef}>
            <button className='thumbnail' onClick={onImageClicked}>
                <img src={props.src} alt='몬스터 이미지'/>
            </button>
            <div className="rightbox">
                <div className="title">{props.title}</div>
                <div className="content">{props.content}</div>

                <div className="margin"/>

                <button className={props.like ? '' : 'disabled'} onClick={onLikeClicked}>
                    {props.like ? '좋아해요!' : '좋아요'}
                    </button>
            </div>

            <button className='floatbox' onClick={onLikeClicked}>
                <img src={props.like ? heart : heartDisabled} alt='좋아요'/>
                <div>+{props.hearts}</div>
            </button>

            {previewState && <ImagePreview 
                id={props.id}
                title={props.title}
                content={props.content}
                onFinish={onPreviewFinished}
                src={props.src} /* 썸네일 이미지 */
                like={props.like}
                hearts={props.hearts}
                onLikeClicked={onLikeClicked}
                />}
        </div>
    )
});
export default ImageView;