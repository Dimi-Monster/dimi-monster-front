import React from "react";
import PropTypes from "prop-types";
import "./TitleBox.css";

export default function TitleBox(props) {
  return (
    <div className={`titlebox ${props.className}`}>
      <div className={`title ${props.titleClassName}`}>{props.title}</div>

      <div className={props.innerClassName} style={props.innerStyle}>
        {props.children}
      </div>
    </div>
  );
}

TitleBox.propTypes = {
  className: PropTypes.string,
  titleClassName: PropTypes.string,
  title: PropTypes.string.isRequired,
  innerClassName: PropTypes.string,
  innerStyle: PropTypes.object,
  children: PropTypes.node,
};
