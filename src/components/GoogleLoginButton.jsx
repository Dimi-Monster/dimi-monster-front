import React from "react";
import PropTypes from "prop-types";
import "./GoogleLoginButton.css";
import Button from "./Button";
import googlelogo from "../images/googlelogo.svg";
import { LOGIN_URL } from "../routes/login";

export default function GoogleLoginButton() {
  return (
    <Button
      onClick={click}
      title="디미고 계정으로 로그인"
      imgSrc={googlelogo}
      height="1.3rem"
    />
  );

  function click() {
    window.location.href = LOGIN_URL;
  }
}

GoogleLoginButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
};
