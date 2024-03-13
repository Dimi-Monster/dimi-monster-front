import React from 'react';
import './Content.css';

export default function Content(props) {
    return (
        <div className={`content ${props.className}`}>
            <div className="title">{props.title}</div>

            <div className={props.innerClassName}>
                {props.children}
            </div>
        </div>
    )
}