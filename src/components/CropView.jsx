import React, { useState, useCallback, useRef, useEffect } from "react";
import Cropper from 'react-easy-crop';
import './CropView.css';
import heart from '../images/heart.svg';

//GetCrop.js
/**
 * This function was adapted from the one in the ReadMe of https://github.com/DominicTobias/react-image-crop
 */
async function getCroppedImg(
    imageSrc,
    pixelCrop
) {
    const image = new Image();
    image.src = imageSrc;
    await image.decode();

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
        return null;
    }
    const bBoxWidth = image.width;
    const bBoxHeight = image.height;

    canvas.width = bBoxWidth;
    canvas.height = bBoxHeight;

    ctx.drawImage(image, 0, 0);

    // croppedAreaPixels values are bounding box relative
    // extract the cropped image using these values
    const data = ctx.getImageData(
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
    );

    // set canvas width to final desired crop size - this will clear existing context
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    // paste generated rotate image at the top left corner
    ctx.putImageData(data, 0, 0);

    // As Base64 string
    const blob = await new Promise(resolve => canvas.toBlob(resolve));
    return URL.createObjectURL(blob);
    //return canvas.toDataURL('image/png');

    // As a blob
    //   return new Promise((resolve, reject) => {
    //     canvas.toBlob((file) => {
    //       resolve(URL.createObjectURL(file));
    //     }, 'image/jpeg');
    //   });
}

export default function CropView(props) {
    let image = props.image;
    let ratio = props.ratio;
    let cropShape = props.shape ? props.shape : 'none';

    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);

    const [croppedArea, setCroppedArea] = useState({ x: 0, y: 0, width: 0, height: 0 });

    const contentRef = useRef(null);
    const [animateState, setAnimateState] = useState(false);

    const onCropComplete = useCallback((croppedArea, croppedAreaPixel) => {
        setCroppedArea(croppedAreaPixel);
    }, []);

    const finish = () => {
        async function f() {
            let img = await getCroppedImg(image, croppedArea);
            props.onFinished(img);
        }
        f();
    }

    useEffect(() => {
        if(contentRef.current.scrollWidth > contentRef.current.clientWidth)
            setAnimateState(true);
    }, [contentRef]);

    return (
        <div className={`cropview ${props.className}`}>
            <div className='crop-box'>
                <Cropper
                    image={image}
                    crop={crop}
                    zoom={zoom}
                    aspect={ratio}
                    onCropChange={setCrop}
                    onCropComplete={onCropComplete}
                    onZoomChange={setZoom}
                    cropShape={cropShape}
                    style={{
                        containerStyle: {borderRadius: '2rem', border: '2px solid #BEBEBE'},
                        cropAreaStyle: {borderRadius: '1rem'}
                    }}
                />

                <div className='bottom-bar'>
                    <div className='title-contents-box'>
                        <div className='title'>{props.title}</div>
                        <div className='content animated' ref={contentRef}>
                            <div className={animateState ? 'text-animated' : ''}>{props.content}</div>
                        </div>
                    </div>
                    <button className='finish' onClick={finish}>
                        <img src={heart} alt='완료'/>
                        <div>완료</div>
                    </button>
                </div>
            </div>
            {/* <button onClick={finish}>완료</button> */}
        </div>
    );
}