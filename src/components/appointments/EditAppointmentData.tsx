import { useQuery } from "@tanstack/react-query"
import { Navigate, useLocation} from "react-router-dom"
import { getAppointmentById } from "../../api/AppointmentAffiliateApi"
import EditAppointmentModal from "./EditAppointmentModal"

export default function EditAppointmentData() {

    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const editAppointmentId = queryParams.get('editAppointment')!
    const show = !!editAppointmentId

    const {data,isError}=useQuery({
        queryKey:['editAppointment',editAppointmentId],
        queryFn:()=>getAppointmentById(editAppointmentId),
        enabled:!!editAppointmentId
    })
    
    if (isError) return (<Navigate to={'/404'}/>)
    if (data) return (<EditAppointmentModal data={data} editAppointmentId={editAppointmentId} show={show}/>)
}
