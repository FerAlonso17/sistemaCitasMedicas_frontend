import { useQuery } from "@tanstack/react-query"
import { Navigate, useLocation} from "react-router-dom"
import { getDoctorById } from "../../api/AdminApi"
import EditDoctorModal from "./EditDoctorModal"

export default function EditDoctorData() {

    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const editDoctorId = queryParams.get('editDoctor')!
    const show = !!editDoctorId

    const {data,isError}=useQuery({
        queryKey:['editDoctor',editDoctorId],
        queryFn:()=>getDoctorById(editDoctorId),
        enabled:!!editDoctorId
    })
    
    if (isError) return (<Navigate to={'/404'}/>)
    if (data) return (<EditDoctorModal data={data} editDoctorId={editDoctorId} show={show}/>)
}
