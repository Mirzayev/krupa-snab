import React from "react";
import Header from "../header/Header.jsx";
import WhsLeftBar from "../left-bar/WhsLeftBar.jsx";
import SIgnUp from "../../components/sign-up/SIgnUp.jsx";

const accessToken = localStorage.accesToken;

function Layout({ children }) {
    return (
        <div className="flex max-w-[1580px] max-h-screen">
            <div className=""><WhsLeftBar/></div>

            <div className="rightBar w-full overflow-y-auto">
                <Header/>

                <div className="overflow-x-scroll ">{children}</div>
            </div>
        </div>
    );
}

export default Layout;
