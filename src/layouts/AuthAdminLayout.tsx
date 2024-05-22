import { Outlet } from "react-router-dom";
import Logo from "../components/Logo";
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from "react-toastify";

export default function AuthAdminLayout() {
    return (
        <>
            <div className="bg-blue-600 min-h-screen grid place-items-center">
                <div className="w-2/3 mx-auto flex items-center justify-stretch">
                    <div className="hidden lg:block w-2/3">
                        <Logo />
                    </div>
                    <div className="bg-white lg:m-10 mx-auto w-11/12 rounded-2xl shadow-2xl drop-shadow-lg overflow-y-hidden">
                        <Outlet />
                    </div>
                </div>
            </div>
            <ToastContainer/>
        </>
    )
}
