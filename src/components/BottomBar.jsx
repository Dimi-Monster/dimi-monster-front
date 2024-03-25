import React, { useRef, useState, useEffect } from 'react';
import './BottomBar.css';

export default function BottomBar(props) {
    const contentRef = useRef(null);
    const [animateState, setAnimateState] = useState(false);

    useEffect(() => {
        if (contentRef.current.scrollWidth > contentRef.current.clientWidth)
            setAnimateState(true);
    }, [contentRef]);

    return (
        <div className='bottom-bar-component'>
            <div className='title-contents-box'>
                <div className='title'>{props.title}</div>
                <div className='content animated' ref={contentRef}>
                    <div className={animateState ? 'text-animated' : ''}>{props.content}</div>
                </div>
            </div>
            <button className='like' onClick={props.onClick}>
                <img src={props.src} alt={props.buttonTitle} />
                <div>{props.buttonTitle}</div>
            </button>
        </div>
    );
}