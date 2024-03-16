import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";

export default function Layout() {
    return (
        <div style={{display: 'grid', gridTemplateRows: '4.5rem minmax(0, 1fr)', height: '100vh'}}>
            <Header/>
            <Outlet style={{flexGrow: 1}}/>
        </div>
    );
}
