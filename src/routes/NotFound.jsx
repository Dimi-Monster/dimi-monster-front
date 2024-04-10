import React, { useState } from "react";
import "./NotFound.css";
import notfoundImage from "../images/notfound.png";
import logo from "../images/logo.svg";
import logoDark from "../images/logo-dark.svg";

export default function NotFound() {
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
  return (
    <div className="notfound">
      <img
        src={notfoundImage}
        className="notfound-image"
        alt="없는 페이지 로고"
      />
      <img
        src={isDarkMode ? logoDark : logo}
        className="logo-image"
        alt="디미몬스터 로고"
      />
      <div>잘못 찾아오신 것 같아요.</div>
    </div>
  );
}
