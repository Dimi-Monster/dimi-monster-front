import React from "react";
import './Button.css';

export default function Button(props) {
    let color = props.color

    if(!color)
        color = 'default';

    const backgroundColorPalette = {
        default: 'white',
        enabled: '#DD0D75',
        disabled: '#8A8A8A'
    };
    const colorPalette = {
        default: '#333333',
        enabled: 'white',
        disabled: 'white'
    };

    return (
        <button className='pretty-button' type={props.type} style={{
            backgroundColor: backgroundColorPalette[color],
            color: colorPalette[color]
            }}>
            {props.imgSrc && <img src={props.imgSrc} style={{height: props.height}}/>}
            <div>{props.title}</div>
        </button>
    )
}