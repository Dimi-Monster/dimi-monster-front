import React from 'react';
import './TitleBox.css';

export default function TitleBox(props) {
    return (
        <div className={`titlebox ${props.className}`}>
            <div className="title">{props.title}</div>

            <div className={props.innerClassName}>
                {props.children}
            </div>
        </div>
    )
}