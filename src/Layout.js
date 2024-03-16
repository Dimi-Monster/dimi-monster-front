import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";

export default function Layout() {
    return (
        <>
            <Header/>
            <div style={{paddingTop: '4.5rem'}}/>
            <Outlet/>
        </>
    );
}
