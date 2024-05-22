import { useQuery } from "@tanstack/react-query"
import { getAdmin } from "../api/AuthAdminAPI"

export const useAuth =()=>{
    const {data,isError,isLoading}= useQuery({
        queryKey:['admin'],
        queryFn: getAdmin,
        retry:1,//las veces que intentará obtener los datos
        refetchOnWindowFocus:false
    })

    return {data,isError,isLoading}
}