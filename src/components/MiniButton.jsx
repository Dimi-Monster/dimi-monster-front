import React from 'react';
import './MiniButton.css';

export default function MiniButton(props) {


    return (
        <button className='mini-button' onClick={props.onClick}>
            <img src={props.src} alt={props.buttonTitle} />
            <div>{props.buttonTitle}</div>
        </button>
    )
}