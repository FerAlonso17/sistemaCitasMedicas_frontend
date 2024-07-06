import { Dialog, Transition } from "@headlessui/react"
import { Fragment } from "react/jsx-runtime"
import AppointmentForm from "./AppointmentForm"
import { Navigate, useLocation, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { editAppointment, getAppointmentById } from "../../api/AppointmentAffiliateApi"
import { toast } from "react-toastify"
import { Appointment, AppointmentFormData } from "../../types"

type EditAppointmentModalProps={
    data: Appointment,
    editAppointmentId: Appointment['_id'],
    show:boolean
}
export default function EditAppointmentModal({data,editAppointmentId,show}:EditAppointmentModalProps) {

    const navigate = useNavigate()
    // const location = useLocation()
    // const queryParams = new URLSearchParams(location.search)
    // const editAppointmentId = queryParams.get('editAppointment')!
    // const show = !!editAppointmentId

    // const {data,isError}=useQuery({
    //     queryKey:['editAppointment',editAppointmentId],
    //     queryFn:()=>getAppointmentById(editAppointmentId),
    //     enabled:!!editAppointmentId
    // })

    const initialValues : AppointmentFormData = {
        doctor: data.doctor._id,
        hospital: data.hospital._id,
        speciality: data.speciality,
        dateAppointment: data.dateAppointment
    }

    const { register, handleSubmit, reset, formState: { errors } } = useForm({defaultValues:initialValues})

    const queryClient = useQueryClient()
    const {mutate}=useMutation({
        mutationFn:editAppointment,
        onError:(error)=>toast.error(error.message),
        onSuccess:(data)=>{
            queryClient.invalidateQueries({queryKey: ['appointments']})
            queryClient.invalidateQueries({queryKey: ['editAppointment',editAppointmentId]})
            toast.success(data)
            reset()
            navigate(location.pathname, { replace: true })
        }
    })
    const handleEditAppointment=(formData:AppointmentFormData)=>{
        const data = {editAppointmentId,formData}
        mutate(data)
    }

    return (
        <>
            <Transition appear show={show} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => navigate(location.pathname, { replace: true })}
                    >
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/70" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-2 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-10">
                                    <Dialog.Title
                                        as="h3"
                                        className="font-black text-3xl  my-4"
                                    >
                                        Edit Appointment
                                    </Dialog.Title>

                                    <p className="text-xl font-bold">Fill out the form and edit  {''}
                                        <span className="text-blue-600">your appointment</span>
                                    </p>

                                    <form
                                        className='mt-10 space-y-3'
                                        onSubmit={handleSubmit(handleEditAppointment)}
                                        noValidate
                                    >
                                        <AppointmentForm register={register} errors={errors}/>
                                        <input
                                            type="submit"
                                            value={'Save changes'}
                                            className="bg-blue-600 hover:bg-blue-700 w-full p-3 text-white font-bold cursor-pointer transition-colors"
                                        />
                                    </form>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
