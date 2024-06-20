import axios from "axios";
import {useState} from "react";
import {data} from "autoprefixer";
import {useNavigate} from "react-router";
import {message} from "antd";

export default function SIgnUp() {

    const navigate = useNavigate()
    const [EmployeeCode, setEmployeeCode] = useState('')
    const [ExternalEmployeeNumber, setExternalEmployeeNumber] = useState('')
    const accessToken = localStorage.getItem('accessToken')
    const userInfo = {
        EmployeeCode: EmployeeCode,
        ExternalEmployeeNumber: ExternalEmployeeNumber
    }




    const showPassword = () => {
        const passwordInput = document.querySelector('.passwordInput');
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
        } else {
            passwordInput.type = 'password';
        }
    }


    function getUserData() {
        axios.get(`https://dotnet-csharp.uz/api/auth?EmployeeCode=${EmployeeCode}&ExternalEmployeeNumber=${ExternalEmployeeNumber}`, {
            headers: {
                'B1S-CaseInsensitive': true,
            }
        })


            .then(res => {

                const accessToken = res.data.accessToken
                console.log(accessToken)
                const token = localStorage.setItem('accessToken', accessToken);
                message.success('Muvaffaqiyatli o`tdingiz')
                navigate('/home')

                }

            )
            .catch(err =>  {
               message.error('Bunaqa user topilmadi')

            })


    }

    return (
        <div className="bg-white w-screen h-screen flex justify-center items-center mx-auto ">
            <div className="max-w-[298px] lg:max-w-[398px]  bg-signUp-gradient w-full text-white rounded-[30px]">
                <h4 className="text-2xl text-white py-[31px] text-center font-bold ">Avtorizatsiya</h4>
                <div className="px-[39px] w-full h-full">
                    <p className="text-white font-bold px-[11px] text-base">Login</p>
                    <input onChange={(e) => setEmployeeCode(e.target.value)}
                           className=" w-full max-h-[60px] h-[40px] lg:h-[60px] rounded-[10px] my-[15px] text-black px-2 outline-none"
                           required={true} type="text"/>
                    <p className="mt-8 font-bold mb-[15px] px-[11px] text-base  ">Parol</p>
                    <div className='relative flex justify-end '>
                        <input onChange={(e) => setExternalEmployeeNumber(e.target.value)}
                               className="passwordInput w-full max-h-[60px] h-[40px] lg:h-[60px] rounded-[10px] mb-[87px] text-black px-2 outline-none"
                               required={true} type="text" />
                        {/*<i className="fa-solid fa-eye absolute  text-gray-400 right-5 cursor-pointer top-6"></i>*/}
                        <i onClick={()=> showPassword()} className="fa-solid fa-eye-slash absolute  text-gray-400 right-5 cursor-pointer top-6"></i>
                    </div>
                    <button onClick={() => getUserData()}
                            className="text-black text-center  bg-white w-full h-[40px] lg:h-[60px] rounded-[10px] mb-20 lg:mb-[111px] active:bg-slate-200 font-bold text-base hover:bg-blue-400 hover:text-white duration-300">Kirish
                    </button>


                </div>
            </div>
        </div>
    )
}