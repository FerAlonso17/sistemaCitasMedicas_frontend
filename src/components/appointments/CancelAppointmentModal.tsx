import { Dialog, Transition } from "@headlessui/react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { useLocation, useNavigate } from "react-router-dom"
import { Fragment } from "react/jsx-runtime"
import { cancelAppointment } from "../../api/AppointmentAffiliateApi"
import { toast } from "react-toastify"

export default function CancelAppointmentModal() {

    const navigate=useNavigate()
    const location = useLocation()
    const queryParams= new URLSearchParams(location.search)
    const cancelAppointmentId=queryParams.get('deleteAppointment')!
    const show = cancelAppointmentId?true:false

    const {handleSubmit}=useForm()

    const queryClient=useQueryClient()
    const {mutate} = useMutation({
        mutationFn:cancelAppointment,
        onError:(error)=>toast.error(error.message),
        onSuccess:(data)=>{
            toast.success(data)
            queryClient.invalidateQueries({queryKey:['appointments']})
            navigate(location.pathname,{replace:true})
        }
    })

    const handleCancelAppointment=()=>mutate(cancelAppointmentId)

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
                                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-6">
                                    <Dialog.Title
                                        as="h3"
                                        className="font-black text-2xl  my-4"
                                    >
                                        Cancel Appointment
                                    </Dialog.Title>

                                    <p className="text-lg font-semibold">Are you sure to cancel the appointment?
                                    </p>

                                    <form
                                        className='mt-10 flex gap-4 justify-end'
                                        onSubmit={handleSubmit(handleCancelAppointment)}
                                        noValidate
                                    >
                                        <input
                                            type="submit"
                                            value={'Yes'}
                                            className="bg-red-600 hover:bg-red-700 w-1/4 p-1 text-white font-bold cursor-pointer transition-colors"
                                        />
                                        <input
                                            type="button"
                                            onClick={()=>navigate(location.pathname, { replace: true })}
                                            value={'No'}
                                            className="bg-gray-600 hover:bg-gray-700 w-1/4 p-1 text-white font-bold cursor-pointer transition-colors"
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
