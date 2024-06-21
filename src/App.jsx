import './App.css'
import React from "react"
import SIgnUp from "./components/sign-up/SIgnUp.jsx";
import MainPage from "./pages/main/MainPage.jsx";
import {RouterProvider} from "react-router-dom";
import RootLayout from "./whs-manager/RootLayout.jsx";

function App() {
    return (

            <RootLayout/>
    )
}

export default App
