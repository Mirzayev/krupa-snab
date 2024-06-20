import React from "react";
import Header from "../header/Header.jsx";
import LeftBar from "../left-bar/LeftBar.jsx";
import SIgnUp from "../sign-up/SIgnUp.jsx";

const accessToken = localStorage.accesToken;

function Layout({ children }) {
    return (
        <div className="flex max-w-[1580px] max-h-screen">
            <div className=""><LeftBar/></div>

            <div className="rightBar w-full overflow-y-auto">
                <Header/>
                <div className="overflow-x-scroll ">{children}</div>
            </div>
        </div>
    );
}

export default Layout;
