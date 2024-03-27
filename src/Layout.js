import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";

export default function Layout({onRefresh}) {
    return (
        <>
            <Header onRefresh={onRefresh}/>
            <div style={{paddingTop: '4.5rem'}}/>
            <Outlet/>
        </>
    );
}
