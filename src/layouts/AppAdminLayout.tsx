import { useAuth } from '../hooks/useAuth'
import { Navigate, Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import AdminSidebar from '../components/admin/AdminSidebar'

export default function AppAdminLayout() {

    const {data,isError,isLoading}=useAuth()

    if(isLoading) return 'Loading...'
    if (isError) {
        return <Navigate to={'/auth/admin/login'}/>
    }
    
    if(data) return (
        <>
            <div className='md:flex'>
                <aside className='md:w-72 md:h-screen bg-blue-700 text-white'>
                    <AdminSidebar name={data.name}/>
                </aside>
                <main className="md:flex-1 md:h-screen md:overflow-y-scroll bg-gray-100 p-5">
                    <Outlet/>
                </main>
            </div>
            <ToastContainer/>
        </>
    )
}
