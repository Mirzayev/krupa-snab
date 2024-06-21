import React from "react"
import { BrowserRouter, Routes,Route} from "react-router-dom";
import HomePage from "./home/HomePage.jsx";
import MySales from "../pages/my-sales/MySales.jsx";
import SalesDepartment from "../pages/sales-department/SalesDepartment.jsx";
import LoadedSales from "../pages/loaded-sales/LoadedSales.jsx";
import CompletedOrder from "../pages/completed-order/CompletedOrder.jsx";
import SIgnUp from "../components/sign-up/SIgnUp.jsx";
import SPurchases from "../pages/purchases/SPurchases.jsx";
import WarehouseAccount from "../pages/ warehouse-accout/ WarehouseAccout.jsx";
import MovingCargo from "../pages/moving-cargo/MovingCargo.jsx";
import MovingCargoRequest from "../pages/moving-cargo-request/MovingCargoRequest.jsx";
import MainPage from "../pages/main/MainPage.jsx";
import WhsManager from "./Layout/WhsManager.jsx";
import ClientList from "../components/clients-list/ClientList.jsx";


 function RootLayout(){


    return(
        <BrowserRouter>
            <Routes >
                <Route index  element={<SIgnUp/>} />
                <Route  path={'/home'} element={<WhsManager/>} />
                <Route  path={'/my-sales'} element={<MySales/>} />
                <Route  path={'/sales-department'} element={<SalesDepartment/>} />
                <Route  path={'/loaded-sales'} element={<LoadedSales/>} />
                <Route  path={'/completed-order'} element={<CompletedOrder/>} />
                <Route  path={'/purchases'} element={<SPurchases/>} />
                <Route  path={'/warehouse-account'} element={<WarehouseAccount/>} />
                <Route  path={'/moving-cargo'} element={<MovingCargo/>} />
                <Route  path={'/moving-cargo-request'} element={<MovingCargoRequest/>} />
                <Route  path={'/main-page'} element={<MainPage/>} />
                <Route  path={'/client-list'} element={<ClientList/>} />


            </Routes>
        </BrowserRouter>
    )
}

export  default RootLayout