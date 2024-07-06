import { FieldErrors, UseFormRegister } from "react-hook-form"
import { DoctorFormData } from "../../types"
import ErrorMessage from "../ErrorMessage"

type DoctorFormProps = {
    register: UseFormRegister<DoctorFormData>
    errors: FieldErrors<DoctorFormData>
}
export default function DoctorForm({ register, errors }: DoctorFormProps) {

    const listSpecilities = ['General medicine', 'Odontology', 'Obstetrics', 'Pediatrics', 'Geriatrics', 'Psychology']

    return (
        <>
            <div className="flex flex-col gap-2">
                <label
                    htmlFor="name"
                    className="font-medium text-lg"
                >
                    Name
                </label>
                <input
                    type="text"
                    id="name"
                    className="w-full p-2  border-gray-300 border rounded-md focus:border-gray-500 focus:outline-none"
                    {...register("name",{
                        required:'Field required'
                    })}
                />
                {errors.name && (
                    <ErrorMessage>{errors.name.message}</ErrorMessage>
                )}
            </div>
            <div className="flex flex-col gap-2">
                <label
                    htmlFor="dni"
                    className="font-medium text-lg"
                >
                    DNI
                </label>
                <input
                    type="text"
                    id="dni"
                    className="w-full p-2  border-gray-300 border rounded-md focus:border-gray-500 focus:outline-none"
                    {...register("dni",{
                        required:'Field required'
                    })}
                />
                {errors.dni && (
                    <ErrorMessage>{errors.dni.message}</ErrorMessage>
                )}
            </div>
            <div className="flex flex-col gap-2">
                <label
                    className="font-medium text-lg"
                    htmlFor="speciality"
                >Speciality:</label>
                <select
                    id="speciality"
                    className="w-full p-1 border-gray-300 border mb-3"
                    {...register("speciality", {
                        required: "Field required",
                    })}
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
        </>
    )
}
