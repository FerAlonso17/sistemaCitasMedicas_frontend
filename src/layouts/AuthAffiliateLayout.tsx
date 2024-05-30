import { Outlet } from "react-router-dom";
import Logo from "../components/Logo";
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from "react-toastify";

export default function AuthAffiliateLayout() {
    return (
        <>
            <div className="bg-blue-600 min-h-screen grid place-items-center">
                <div className="w-2/4 mx-auto flex flex-col items-center justify-stretch">
                    <div className="hidden lg:block w-1/3">
                        <Logo />
                    </div>
                    <div className="bg-white lg:m-4 mx-auto w-2/3 rounded-2xl shadow-2xl drop-shadow-lg overflow-y-hidden p-2 lg:p-1">
                        <Outlet/>
                    </div>
                </div>
            </div>
            <ToastContainer/>
        </>
    )
}
