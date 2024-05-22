import { useQuery } from "@tanstack/react-query"
import { getAffiliate } from "../api/AuthAffiliateAPI"

export const useAffiliateAuth =()=>{
    const {data,isError,isLoading} = useQuery({
        queryKey:['affiliate'],
        queryFn: getAffiliate,
        retry: 1,//las veces que intentará obtener los datos
        refetchOnWindowFocus: false
    })

    return {data,isError,isLoading}
}