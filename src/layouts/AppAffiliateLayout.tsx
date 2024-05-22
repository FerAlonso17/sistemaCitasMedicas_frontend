import { Link, Navigate, Outlet } from "react-router-dom"
import { useAffiliateAuth } from "../hooks/useAffiliateAuth"
import Logo from "../components/Logo"
import NavMenu from "../components/NavMenu"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

export default function AppAffiliateLayout() {

    const {data,isError,isLoading} = useAffiliateAuth()

    if(isLoading) return 'Loading'
    if(isError){
        return <Navigate to={'/auth/affiliate/login'}/>
    }

    if(data) return (
        <>
            <header className="bg-blue-600 py-1">
                <div className="max-w-screen-2xl mx-auto flex flex-col lg:flex-row justify-between items-center">
                    <div className="w-40 lg:ml-5">
                        <Link to={'/'}>
                            <Logo />
                        </Link>
                    </div>
                    <NavMenu name={data.name}/>
                </div>
            </header>
            <section className="max-w-screen-2xl mx-auto mt-5 p-10">
                <Outlet />
            </section>
            <footer className="py-3">
                <p className='text-center'>
                    All rights reserved {new Date().getFullYear()}
                </p>
            </footer>
            <ToastContainer/>
        </>
    )
}
