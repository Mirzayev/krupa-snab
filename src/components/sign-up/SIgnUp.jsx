import axios from "axios";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { useDispatch } from 'react-redux'
// import {main} from "../../store/slices/index.js";
export default function SignUp() {

    // const {setMe}=main.actions

    // const dispatch=useDispatch()

    const navigate = useNavigate();
    const [EmployeeCode, setEmployeeCode] = useState("");
    const [ExternalEmployeeNumber, setExternalEmployeeNumber] = useState("");
    const passwordInputRef = useRef(null);

    const showPassword = () => {
        const passwordInput = passwordInputRef.current;
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
        } else {
            passwordInput.type = "password";
        }
    };

    const getUserData = async () => {
        try {
            const res = await axios.get(
                `https://dotnet-csharp.uz/api/auth`,
                {
                    params: {
                        EmployeeCode: EmployeeCode,
                        ExternalEmployeeNumber: ExternalEmployeeNumber
                    },
                    headers: {
                        "B1S-CaseInsensitive": true,
                    }
                }
            );

            const accessToken = res.data.accessToken;
            const userRole = res.data.jobTitle;
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("userRole", userRole);


            if (userRole === "Whsmanager") {
            message.success("Muvaffaqiyatli o'tdingiz. Xush kelibsiz Whs Manager");
                navigate("/home");
            } else if (userRole === "Seller") {
                message.success("Muvaffaqiyatli o'tdingiz. Xush kelibsiz Sales Manager");
                navigate("/home");
            }
            console.log(res.data)
        } catch (err) {
            console.error(err);
            if (err.response) {
                message.error(`Server xatosi: ${err.response.statusText}`);
            } else if (err.request) {
                message.error("Serverdan javob olinmadi");
            } else {
                message.error(`So'rov xatosi: ${err.message}`);
            }
        }
    };

    return (
        <div className="bg-white w-screen h-screen flex justify-center items-center mx-auto">
            <div className="max-w-[298px] lg:max-w-[398px] bg-signUp-gradient w-full text-white rounded-[30px]">
                <h4 className="text-2xl text-white py-[31px] text-center font-bold">Avtorizatsiya</h4>
                <div className="px-[39px] w-full h-full">
                    <p className="text-white font-bold px-[11px] text-base">Login</p>
                    <input
                        onChange={(e) => setEmployeeCode(e.target.value)}
                        className="w-full max-h-[60px] h-[40px] lg:h-[60px] rounded-[10px] my-[15px] text-black px-2 outline-none"
                        required={true}
                        type="text"
                    />
                    <p className="mt-8 font-bold mb-[15px] px-[11px] text-base">Parol</p>
                    <div className="relative flex justify-end">
                        <input
                            onChange={(e) => setExternalEmployeeNumber(e.target.value)}
                            ref={passwordInputRef}
                            className="passwordInput w-full max-h-[60px] h-[40px] lg:h-[60px] rounded-[10px] mb-[87px] text-black px-2 outline-none"
                            required={true}
                            type="password"
                        />
                        <i
                            onClick={showPassword}
                            className="fa-solid fa-eye-slash absolute text-gray-400 right-5 cursor-pointer lg:top-6 top-3"
                        ></i>

                    </div>
                    <button
                        onClick={getUserData}
                        className="text-black text-center bg-white w-full h-[40px] lg:h-[60px] rounded-[10px] mb-20 lg:mb-[111px] active:bg-slate-200 font-bold text-base hover:bg-blue-400 hover:text-white duration-300"
                    >
                        Kirish
                    </button>
                </div>
            </div>
        </div>
    );
}
