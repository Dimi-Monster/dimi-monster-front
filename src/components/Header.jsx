import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./Header.css";

import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";

import logo from "../images/logo.svg";
import logoDark from "../images/logo-dark.svg";
import logoMobile from "../images/logo-mobile.svg";

import api from "../utils/API";

import { useMediaQuery } from "react-responsive";

export default function Header({ onRefresh, isVisible }) {
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ query: "(max-width:520px)" });
  const location = useLocation();

  const [menuState, setMenuState] = useState(false);

  const menuFeature = false;

  useEffect(() => {
    if (localStorage.getItem("refresh-token") === null)
      navigate("/main", { replace: true });
  }, []);

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

  function onRootClicked() {
    if (location.pathname == "/") {
      if (window.scrollY < 40) {
        onRefresh();
      }

      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  if (!isVisible) return <></>;

  const logout = () => {
    if(menuFeature)
      setMenuState(!menuState);
    else {
      if (confirm("로그아웃하시겠습니까?"))
        api.logout().then(() => navigate("/main", { replace: true }));
    }
  }

  return (
    <header>
      <Link to="/" className="logo" onClick={onRootClicked}>
        {!isMobile && (
          <img
            src={isDarkMode ? logoDark : logo}
            className="logo"
            alt="디미몬스터"
          />
        )}
        {isMobile && <img src={logoMobile} className="logo" alt="디미몬스터" />}
      </Link>

      <NavLink
        to="/"
        className="navlink"
        style={({ isActive }) => ({
          color: isActive ? "#DD0D75" : isDarkMode ? "white" : "black",
        })}
        onClick={onRootClicked}
      >
        메인
      </NavLink>
      <NavLink
        to="/about"
        className="navlink"
        style={({ isActive }) => ({
          color: isActive ? "#DD0D75" : isDarkMode ? "white" : "black",
        })}
      >
        소개
      </NavLink>
      <NavLink
        to="/upload"
        className="navlink"
        style={({ isActive }) => ({
          color: isActive ? "#DD0D75" : isDarkMode ? "white" : "black",
        })}
      >
        업로드
      </NavLink>

      {location.pathname == "/report" && (
        <NavLink
          to={`/report${location.search}`}
          className="navlink"
          style={({ isActive }) => ({
            color: isActive ? "#DD0D75" : isDarkMode ? "white" : "black",
          })}
        >
          신고
        </NavLink>
      )}

      <div className="margin"></div>

      <button className="header-right" onClick={logout}>
        <div className="logout">로그아웃</div>
        <div>{localStorage.getItem("name")}</div>
      </button>

      {menuState && (
        <div className="menu">
          <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
            <img src={logoMobile} style={{boxSizing: 'border-box', width: '2rem', padding: '0.15rem', marginRight: '0.5rem', borderRadius: '1rem', border: '.7px solid #BEBEBE'}} />
            2319이동현
          </div>
          <div>언어 설정</div>
          <div>로그아웃</div>
        </div>
      )}
      
    </header>
  );
}

Header.propTypes = {
  onRefresh: PropTypes.func,
  isVisible: PropTypes.bool,
};
