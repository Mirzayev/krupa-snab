import SIgnUp from "../../components/sign-up/SIgnUp.jsx";
import MySales from "../../pages/my-sales/MySales.jsx";
import RootLayout from "../RootLayout.jsx";

export default function Header() {
    return (
        <div className="w-full shadow-lg ">
            <div className="flex justify-end h-[73px] items-center ">
                <div>

                </div>
                <div className="flex gap-2 pr-10 items-center">
                    <p className="bg-slate-200 w-8 h-8 flex justify-center items-center text-center rounded-full text-blue-400 ">W</p>
                    <p className='font-medium'>Whs Manager</p>
                </div>
            </div>

        </div>

    )
}