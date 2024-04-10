import React, { useState } from "react";
import PropTypes from "prop-types";
import "./Button.css";

export default function Button(props) {
  let color = props.color;

  if (!color) color = "default";

  let [isDarkMode, setIsDarkMode] = useState(
    window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
  );
  // update isDarkMode when the system changes the theme
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      if (e.matches) {
        setIsDarkMode(true);
      } else {
        setIsDarkMode(false);
      }
    });

  const backgroundColorPalette = [
    {
      default: "white",
      enabled: "#DD0D75",
      disabled: "#8A8A8A",
    },
    {
      default: "#333333",
      enabled: "white",
      disabled: "white",
    },
  ];
  const colorPalette = [
    {
      default: "#333333",
      enabled: "white",
      disabled: "white",
    },
    {
      default: "#FFFDFE",
      enabled: "#DD0D75",
      disabled: "#8A8A8A",
    },
  ];

  return (
    <button
      className="pretty-button"
      type={props.type}
      onClick={props.onClick}
      style={{
        backgroundColor: backgroundColorPalette[isDarkMode ? 1 : 0][color],
        color: colorPalette[isDarkMode ? 1 : 0][color],
      }}
    >
      {props.imgSrc && (
        <img
          src={props.imgSrc}
          style={{ height: props.height }}
          alt={props.title + "버튼"}
        />
      )}
      <div>{props.title}</div>
    </button>
  );
}

Button.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  type: PropTypes.string,
  imgSrc: PropTypes.string,
  height: PropTypes.string,
  color: PropTypes.string,
};
