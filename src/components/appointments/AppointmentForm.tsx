import { FieldErrors, UseFormRegister } from "react-hook-form"
import { AppointmentFormData, Doctor } from "../../types"
import ErrorMessage from "../ErrorMessage"
import { useQuery } from "@tanstack/react-query"
import { getDoctors, getHospitals } from "../../api/AppointmentAffiliateApi"
import { useEffect, useState } from "react"

type AppointmentFormProps = {
    register: UseFormRegister<AppointmentFormData>
    errors: FieldErrors<AppointmentFormData>
}
export default function AppointmentForm({ register, errors }: AppointmentFormProps) {

    const [speciality, setSpeciality] = useState('')
    const [doctorsBySpeciality, setDoctorsBySpeciality] = useState<Doctor[]>([])
    const { data: doctors } = useQuery({
        queryKey: ['doctors'],
        queryFn: getDoctors
    })
    const { data: hospitals } = useQuery({
        queryKey: ['hospitals'],
        queryFn: getHospitals
    })

    const listSpecilities = ['General medicine', 'Odontology', 'Obstetrics', 'Pediatrics', 'Geriatrics', 'Psychology']

    useEffect(() => {
        if (doctors) {
            const doctorBySpeciality = doctors?.filter(item => item.speciality === speciality)
            setDoctorsBySpeciality(doctorBySpeciality)
        }
    }, [speciality,doctors])


    return (
        <>
        <div className="flex flex-col gap-2">
                <label
                    className="font-medium text-lg"
                    htmlFor="hospital"
                >Hospital:</label>
                <select
                    id="hospital"
                    className="w-full p-1 border-gray-300 border"
                    {...register("hospital", {
                        required: "Field required",
                    })}
                >
                    <option value=''>-- Select --</option>
                    {hospitals?.map(hospital=>
                        <option 
                            key={hospital._id}
                            value={hospital._id}
                        >
                            {hospital.name}
                        </option>
                    )}
                </select>
                {errors.hospital && (
                    <ErrorMessage>{errors.hospital.message}</ErrorMessage>
                )}
            </div>
            <div className="flex flex-col gap-2">
                <label
                    className="font-medium text-lg"
                    htmlFor="speciality"
                >Speciality:</label>
                <select
                    id="speciality"
                    className="w-full p-1 border-gray-300 border"
                    {...register("speciality", {
                        required: "Field required",
                    })}
                    value={speciality}
                    onChange={e => setSpeciality(e.target.value)}
                >
                    <option value=''>-- Select --</option>
                    {listSpecilities?.map(speciality => (
                        <option
                            key={speciality}
                            value={speciality}
                        >{speciality}</option>
                    ))}
                </select>
                {errors.speciality && (
                    <ErrorMessage>{errors.speciality.message}</ErrorMessage>
                )}
            </div>
            <div className="flex flex-col gap-2">
                <label
                    className="font-medium text-lg"
                    htmlFor="doctor"
                >Doctor:</label>
                <select
                    id="doctor"
                    className="w-full p-1 border-gray-300 border"
                    {...register("doctor", {
                        required: "Field required",
                    })}
                >
                    <option value=''>-- Select --</option>
                    {doctorsBySpeciality?.map(doctor => (
                        <option
                            key={doctor._id}
                            value={doctor._id}
                        >
                            {doctor.name}
                        </option>
                    ))}
                </select>
                {errors.doctor && (
                    <ErrorMessage>{errors.doctor.message}</ErrorMessage>
                )}
            </div>
            <div className="flex flex-col gap-2">
                <label
                    className="font-medium text-lg"
                    htmlFor="dateAppointment"
                >Date:</label>
                <input 
                    type="date"
                    id="dateAppointment"
                    className="w-full p-3  border-gray-300 border rounded-md focus:border-gray-500 focus:outline-none"
                        {...register("dateAppointment", {
                            required: "Field required",
                        })}
                />
                {errors.dateAppointment && (
                    <ErrorMessage>{errors.dateAppointment.message}</ErrorMessage>
                )}
            </div>

            {/* <div className="flex flex-col gap-5 pb-2">
                <label
                    className="font-normal text-2xl"
                    htmlFor="description"
                >Descripción de la tarea</label>
                <textarea
                    id="description"
                    placeholder="Descripción de la tarea"
                    className="w-full p-3  border-gray-300 border"
                    {...register("description", {
                        required: "La descripción de la tarea es obligatoria"
                    })}
                />
                {errors.description && (
                    <ErrorMessage>{errors.description.message}</ErrorMessage>
                )}
            </div> */}
        </>
    )
}
