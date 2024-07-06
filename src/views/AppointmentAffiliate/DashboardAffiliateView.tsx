import { useQuery } from "@tanstack/react-query"
import { useAffiliateAuth } from "../../hooks/useAffiliateAuth"
import { getAllAppointments } from "../../api/AppointmentAffiliateApi"
import { useNavigate } from "react-router-dom"
import { Menu, Transition } from "@headlessui/react"
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid"
import { Fragment } from "react/jsx-runtime"
import { formatDate } from "../../utils/utils"
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from "react-tooltip"
import NewAppointmentModal from "../../components/appointments/NewAppointmentModal"
import CancelAppointmentModal from "../../components/appointments/CancelAppointmentModal"
import EditAppointmentData from "../../components/appointments/EditAppointmentData"

const stateColor: { [key: string]: string } = {
    Pending: "bg-yellow-50 text-yellow-500 border-2 border-yellow-500",
    Rescheduled: "bg-orange-50 text-orange-500 border-2 border-orange-500",
    Finished: "bg-gray-50 text-gray-500 border-2 border-gray-500",
    Day_of_appointment: "bg-green-50 text-green-500 border-2 border-green-500"
}
export default function DashboardAffiliateView() {

    const navigate = useNavigate()

    const { data: affiliate, isLoading: authLoading } = useAffiliateAuth()
    const { data, isLoading } = useQuery({
        queryKey: ['appointments'],
        queryFn: getAllAppointments
    })

    if (isLoading && authLoading) return 'Loading...'

    if (data && affiliate) return (
        <>
            <h1 className="text-3xl font-black">My appointments</h1>
            <p className="text-lg font-normal text-gray-500 mt-1">Manage your appointments</p>
            <nav className="my-6">
                <button
                    type='button'
                    className="bg-blue-600 hover:bg-blue-800 rounded-xl px-8 py-2 text-white text-lg font-bold cursor-pointer transition-colors"
                    onClick={() => navigate(location.pathname + '?newAppointment=true')}
                >
                    New appointment
                </button>
            </nav>
            {data.length ? (
                <ul role="list" className="divide-y divide-gray-100 border border-gray-100 mt-10 bg-white shadow-lg">
                    {data.map(appointment => (
                        <li key={appointment._id}
                            style={{ borderBottom: '2px solid #ccc'}}
                            className="flex border justify-between gap-x-6 px-5 py-10">
                            <div className="flex min-w-0 gap-x-4">
                                <div className="min-w-0 flex-auto space-y-2">
                                    <h3
                                        className="text-gray-700 cursor-pointer hover:underline text-xl font-bold"
                                    >MEDICAL APPOINTMENT</h3>
                                    <p className="text-sm text-gray-600 font-bold">
                                        Speciality: <span className="font-semibold text-gray-500">{appointment.speciality}</span>
                                    </p>
                                    <p className="text-sm text-gray-600 font-bold">
                                        Date: <span className="font-semibold text-gray-500">{formatDate(appointment.dateAppointment)}</span>
                                    </p>
                                    <p className="text-sm text-gray-600 font-bold">
                                        Doctor: <span className="font-semibold text-gray-500">{appointment.doctor.name}</span>
                                    </p>
                                    <p className="text-sm text-gray-600 font-bold" >
                                        Order of attention: <span className="font-semibold text-gray-500">{appointment.orderAttention}</span>
                                    </p>
                                    <p className="text-sm text-gray-600 font-bold" data-tooltip-id='hospital'>
                                        Hospital: <span className="font-semibold text-gray-500">{appointment.hospital.name}</span>
                                    </p>
                                    <Tooltip id='hospital' variant="info" opacity={'inherit'} className="opacity-100 font-bold" place="bottom-start">
                                        Telephone: <span className="font-normal">{appointment.hospital.telephone}</span><br />
                                        Direction: <span className="font-normal">{appointment.hospital.direction}</span>
                                    </Tooltip>
                                </div>
                            </div>
                            <div className="flex shrink-0 items-center gap-x-6">
                                <p className={`p-1 rounded-xl ${stateColor[appointment.state]}`}>{appointment.state}</p>
                                {appointment.state === ('Pending' || 'Rescheduled') &&
                                <Menu as="div" className="relative flex-none">
                                    <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                                        <span className="sr-only">opciones</span>
                                        <EllipsisVerticalIcon className="h-9 w-9" aria-hidden="true" />
                                    </Menu.Button>
                                    <Transition as={Fragment} enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95">
                                        <Menu.Items
                                            className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none"
                                        >
                                            <Menu.Item>
                                                <button
                                                    type='button'
                                                    className='block px-3 py-1 text-sm leading-6 text-gray-900'
                                                    onClick={() => navigate(location.pathname + `?editAppointment=${appointment._id}`)}
                                                >
                                                    Edit appointment
                                                </button>
                                            </Menu.Item>
                                            <Menu.Item>
                                                <button
                                                    type='button'
                                                    className='block px-3 py-1 text-sm leading-6 text-red-500'
                                                    onClick={() => navigate(location.pathname + `?deleteAppointment=${appointment._id}`)}
                                                >
                                                    Cancel appointment
                                                </button>
                                            </Menu.Item>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                                }
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-center py-20">There aren't appoitnments yet</p>
            )}
            <NewAppointmentModal />
            <EditAppointmentData/>
            <CancelAppointmentModal/>
        </>
    )
}
