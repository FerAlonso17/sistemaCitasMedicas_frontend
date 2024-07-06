import { useNavigate } from "react-router-dom";
import DoctorsTable from "../../components/admin/DoctorsTable";
import { useQuery } from "@tanstack/react-query";
import { getDoctors } from "../../api/AdminApi";
import NewDoctorModal from "../../components/admin/NewDoctorModal";
import EditDoctorData from "../../components/admin/EditDoctorData";
import DeleteDoctorModal from "../../components/admin/DeleteDoctorModal";
import { useState } from "react";
import { Dropdown } from 'primereact/dropdown';

export type ListSpecilitiesType = {
    name:string,
    code:string
}
const listSpecilities:ListSpecilitiesType[] = [
    { name: 'All', code: 'All' },
    { name: 'General medicine', code: 'GM' },
    { name: 'Odontology', code: 'OD' },
    { name: 'Obstetrics', code: 'OB' },
    { name: 'Pediatrics', code: 'PD' },
    { name: 'Geriatrics', code: 'GR' },
    { name: 'Psychology', code: 'PS' }
]
export default function DoctorsView() {

    const [filter, setFilter] = useState<ListSpecilitiesType>({
        name:'All',
        code:'All'
    })
    const navigate = useNavigate()

    const { data, isLoading } = useQuery({
        queryKey: ['doctors'],
        queryFn: getDoctors
    })

    if (isLoading) return 'Loading...'

    if (data) return (
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
                        onClick={() => navigate(location.pathname + '?newDoctor=true')}
                    >
                        Register doctor
                    </button>
                    <div className="card flex justify-content-center">
                        <Dropdown value={filter} onChange={(e) => setFilter(e.value)} options={listSpecilities} optionLabel="name"
                            placeholder="Select a Speciality" className="w-full md:w-14rem" checkmark={true} highlightOnSelect={false} />
                    </div>

                </div>
                <DoctorsTable doctors={data} filter={filter} />
            </div>
            <NewDoctorModal />
            <EditDoctorData />
            <DeleteDoctorModal />
        </>
    )
}
