import { useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom";

type BtnSignOffProps={
    queryKey:string
}
export default function BtnSignOff({queryKey}:BtnSignOffProps) {

    const queryClient = useQueryClient()
    const navigate = useNavigate();
    const logout =()=>{
        localStorage.removeItem('AUTH_TOKEN')
        queryClient.removeQueries({queryKey:[`${queryKey}`]})
        navigate(`/auth/${queryKey}/login`)
    }

    return (
        <button
            className='block p-2 hover:text-purple-950'
            type='button'
            onClick={logout}
        >
            <div className="flex gap-4 justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                </svg>
                Sign Off
            </div>
        </button>
    )
}
