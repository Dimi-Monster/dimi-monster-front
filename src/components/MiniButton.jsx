import React from "react";
import PropTypes from "prop-types";
import "./MiniButton.css";

export default function MiniButton(props) {
  return (
    <button className="mini-button" onClick={props.onClick}>
      <img src={props.src} alt={props.buttonTitle} />
      <div>{props.buttonTitle}</div>
    </button>
  );
}

MiniButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  src: PropTypes.string.isRequired,
  buttonTitle: PropTypes.string.isRequired,
};
