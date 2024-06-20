import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { MenuFoldOutlined } from "@ant-design/icons";
import LeftLogo from '/src/assets/images/BIS_logo.png';
import salesIcon from '/src/assets/icons/sale_icon.png';
import userIcon from '/src/assets/icons/users_icon.png';
import './left-bar.css';

export default function LeftBar() {
    const navigate = useNavigate();
    const location = useLocation();
    const [menu, setMenu] = useState(false);
    const [collapsed, setCollapsed] = useState(false); // New state for collapsing
    const [subMenu, setSubMenu] = useState(false);

    const toggleMenu = () => {
        const menubar = document.querySelector('.menuBar');
        if (menubar) {
            menubar.style.transition = 'all 0.8s ease';
        }
        setMenu(!menu);
    };

    const toggleCollapse = () => {
        setCollapsed(!collapsed);
    };

    const toggleSubMenu = () => {
        setSubMenu(!subMenu);
    };

    const isActive = (path) => {
        return location.pathname === path;
    };

    return (
        <div className={`max-w-[360px] bg-[#0A4D68] leftBar px-6 py-6 h-screen ${collapsed ? 'w-20' : 'w-full'} h-full text-white transition-all duration-500`}>
            <div className="flex justify-between items-center gap-5">
                {!collapsed && <img className="max-w-[130px]" src={LeftLogo} alt="Logo" />}
                <MenuFoldOutlined className='text-xl cursor-pointer' onClick={toggleCollapse} />
                {/*<img className="max-w-6 max-h-5 cursor-pointer" src={navbarClose} alt="" />*/}
            </div>

            {!collapsed && (
                <div>
                    <div className="mt-20">
                        <div className={`flex gap-3 my-4 items-center cursor-pointer px-3 py-2 ml-[-12px] ${isActive('/main-page') && 'bg-[#05BFDBCC]'} rounded-sm`}>
                            <i className="fa-brands fa-figma text-xl"></i>
                            <button onClick={() => navigate('/main-page')} className="font-medium text-base">Asosiy</button>
                        </div>
                        <div onClick={toggleMenu} className='menubar flex justify-between items-center cursor-pointer my-1'>
                            <div className="flex gap-[14px] items-center">
                                <img className="max-w-[22px]" src={salesIcon} alt="Sales" />
                                <p className="text-white font-medium text-base">Sotuv</p>
                            </div>
                            <i className={`chevron fa-solid fa-chevron-${menu ? 'up' : 'down'} text-white text-[12px]`}></i>
                        </div>

                        <div className="menuBar transition-all ease-in-out" style={{ maxHeight: menu ? 180 : 0, overflow: "hidden" }}>
                            <button
                                className={`text-start py-2 hover:bg-[#05BFDBCC] w-full px-3 mt-3 rounded-sm duration-300 text-[15px] ${isActive('/my-sales') && 'bg-[#05BFDBCC]'}`}
                                onClick={() => navigate('/my-sales')}>
                                Sotuv so'rovnomasi
                            </button>
                            <br />
                            <button
                                className={`text-start py-2 hover:bg-[#05BFDBCC] w-full px-3 rounded-sm duration-300 text-[15px] ${isActive('/sales-department') && 'bg-[#05BFDBCC]'}`}
                                onClick={() => navigate('/sales-department')}>
                                Tasdiqlangan sotuv buyurtmalari
                            </button>
                            <br />
                            <button
                                className={`text-start py-2 hover:bg-[#05BFDBCC] w-full px-3 rounded-sm duration-300 text-[15px] ${isActive('/loaded-sales') && 'bg-[#05BFDBCC]'}`}
                                onClick={() => navigate('/loaded-sales')}>
                                Yuklangan sotuvlar
                            </button>
                            <br />
                            <button
                                className={`text-start py-2 hover:bg-[#05BFDBCC] w-full px-3 rounded-sm duration-300 text-[15px] ${isActive('/completed-order') && 'bg-[#05BFDBCC]'}`}
                                onClick={() => navigate('/completed-order')}>
                                Yakunlangan sotuvlar
                            </button>
                        </div>

                        <div className="flex justify-between items-center mt-[20px] cursor-pointer" onClick={toggleSubMenu}>
                            <div className="flex gap-[14px] items-center">
                                <img className="max-w-[22px]" src={userIcon} alt="User" />
                                <p className="text-white font-medium text-base">Yuk ko'chirish</p>
                            </div>
                            <i className={`fa-solid fa-chevron-${subMenu ? 'up' : 'down'} text-white text-[12px]`}></i>
                        </div>

                        <div className={`transition-all ease-in-out ${subMenu ? 'max-h-60' : 'max-h-0'} overflow-hidden`} style={{ maxHeight: subMenu ? 180 : 0, overflow: "hidden" }}>
                            <button
                                className={`text-start py-2 hover:bg-[#05BFDBCC] w-full px-3 rounded-sm duration-300 mt-3 ${isActive('/moving-cargo-request') && 'bg-[#05BFDBCC]'}`}
                                onClick={() => navigate('/moving-cargo-request')}>
                                Yuk ko'chirish so'rovnomasi
                            </button>
                            <button
                                className={`text-start py-2 hover:bg-[#05BFDBCC] w-full px-3 rounded-sm duration-300 ${isActive('/moving-cargo') && 'bg-[#05BFDBCC]'}`}
                                onClick={() => navigate('/moving-cargo')}>
                                Yuk ko`chirish
                            </button>
                        </div>

                        <div className={`flex gap-3 ml-[-12px] mt-3 items-center w-full cursor-pointer px-3 py-2 ${isActive('/purchases') && 'bg-[#05BFDBCC]'} rounded-sm`}>
                            <i className="fa-solid fa-cart-shopping"></i>
                            <button onClick={() => navigate('/purchases')} className="font-medium text-base my-1">Xaridlar</button>
                        </div>
                        <div className={`flex gap-3  ml-[-12px] items-center cursor-pointer px-3 py-2 ${isActive('/warehouse-account') && 'bg-[#05BFDBCC]'} rounded-sm`}>
                            <i className="fa-solid fa-warehouse"></i>
                            <button onClick={() => navigate('/warehouse-account')} className="font-medium text-base ">Ombor Hisobi</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
