import React from "react";
import PropTypes from "prop-types";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";

export default function Layout({ onRefresh, isVisible }) {
  return (
    <>
      <Header onRefresh={onRefresh} isVisible={isVisible} />
      <div style={{ paddingTop: "4.5rem" }} />
      <Outlet />
    </>
  );
}

Layout.propTypes = {
  onRefresh: PropTypes.func.isRequired,
  isVisible: PropTypes.bool.isRequired,
};
