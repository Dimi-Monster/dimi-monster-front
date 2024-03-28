import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";

export default function Layout({onRefresh, isVisible}) {
    return (
        <>
            <Header onRefresh={onRefresh} isVisible={isVisible}/>
            <div style={{paddingTop: '4.5rem'}}/>
            <Outlet/>
        </>
    );
}
