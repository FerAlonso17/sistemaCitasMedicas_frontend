import { useAuth } from '../../hooks/useAuth'

export default function DashboardAdminView() {

    const {data:admin,isLoading:loadingAdmin} = useAuth()
    if (loadingAdmin) return 'Loading...'

    if (admin) return (
        <>
            <div className="md:px-20">
                <h1
                    className="text-2xl my-10 font-black text-blue-800"
                >
                    Manage doctors
                </h1>

                <div className="flex flex-col md:flex-row md:justify-between gap-4 items-center">
                    <button
                        type="button"
                        className="bg-blue-600 hover:bg-blue-500 rounded-xl px-8 py-2 text-white text-lg font-bold cursor-pointer transition-colors"
                        //onClick={() => navigate(location.pathname + '?newRecord=true')}
                    >
                        Create record
                    </button>

                </div>
                <div className='w-full h-96 flex justify-center items-center'>
                    <h2 className='border border-black border-dashed p-7'>Choose a day to view the record</h2>
                </div>
            </div>
        </>
    )
}
