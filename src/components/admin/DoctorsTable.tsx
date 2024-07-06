import { useNavigate } from "react-router-dom";
import { Doctor } from "../../types";
import { ListSpecilitiesType } from "../../views/RecordsAdmin/DoctorsView";

type DoctorsTableProps = {
    doctors: Doctor[]
    filter: ListSpecilitiesType
}
export default function DoctorsTable({ doctors, filter }: DoctorsTableProps) {

    const navigate = useNavigate()

    const doctorsfilter = doctors.filter(item => item.speciality.toString() === filter?.name.toString())

    return (
        <div className="px-4 sm:px-6 lg:px-8 mt-20">
            <div className="mt-8 flow-root ">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8 bg-white p-5 ">
                        <table className="min-w-full divide-y divide-gray-300 ">
                            <thead>
                                <tr>
                                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                        Name
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        DNI
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Speciality
                                    </th>
                                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                                        <span className="sr-only">Actions</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {doctorsfilter && filter?.name!=='All' ?
                                    doctorsfilter.map(doctor => (
                                        <tr key={doctor._id}>
                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                                {doctor.name}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                {doctor.dni}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                {doctor.speciality}
                                            </td>
                                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0 flex flex-col md:flex-row gap-1 justify-evenly">
                                                <button
                                                    type="button"
                                                    className="text-indigo-600 hover:text-indigo-800"
                                                    onClick={() => navigate(location.pathname + `?editDoctor=${doctor._id}`)}
                                                >
                                                    Edit<span className="sr-only">{doctor.name}</span>
                                                </button>
                                                <button
                                                    type="button"
                                                    className="text-red-600 hover:text-red-800"
                                                    onClick={() => navigate(location.pathname + `?deleteDoctor=${doctor._id}`)}
                                                >
                                                    Delete<span className="sr-only">{doctor.name}</span>
                                                </button>
                                            </td>
                                        </tr>
                                    )) : doctors.map(doctor => (
                                        <tr key={doctor._id}>
                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                                {doctor.name}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                {doctor.dni}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                {doctor.speciality}
                                            </td>
                                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0 flex flex-col md:flex-row gap-1 justify-evenly">
                                                <button
                                                    type="button"
                                                    className="text-indigo-600 hover:text-indigo-800"
                                                    onClick={() => navigate(location.pathname + `?editDoctor=${doctor._id}`)}
                                                >
                                                    Edit<span className="sr-only">{doctor.name}</span>
                                                </button>
                                                <button
                                                    type="button"
                                                    className="text-red-600 hover:text-red-800"
                                                    onClick={() => navigate(location.pathname + `?deleteDoctor=${doctor._id}`)}
                                                >
                                                    Delete<span className="sr-only">{doctor.name}</span>
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                }
                                {/* {doctors.map(doctor => (
                                    <tr key={doctor._id}>
                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                            {doctor.name}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                            {doctor.dni}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                            {doctor.speciality}
                                        </td>
                                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0 flex flex-col md:flex-row gap-1 justify-evenly">
                                            <button
                                                type="button"
                                                className="text-indigo-600 hover:text-indigo-800"
                                                onClick={() => navigate(location.pathname + `?editDoctor=${doctor._id}`)}
                                            >
                                                Edit<span className="sr-only">{doctor.name}</span>
                                            </button>
                                            <button
                                                type="button"
                                                className="text-red-600 hover:text-red-800"
                                                onClick={() => navigate(location.pathname + `?deleteDoctor=${doctor._id}`)}
                                            >
                                                Delete<span className="sr-only">{doctor.name}</span>
                                            </button>
                                        </td>
                                    </tr>
                                ))} */}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
