import React from 'react';
import './ImageView.css';
import heart from '../images/heart.svg';

export default function ImageView(props) {
    return (
        <div className="imageview">
            <img src={props.src}/>
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
        </div>
    )
}