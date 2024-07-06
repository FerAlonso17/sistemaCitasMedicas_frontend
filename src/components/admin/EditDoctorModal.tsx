import { Dialog, Transition } from "@headlessui/react"
import { Fragment } from "react/jsx-runtime"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"
import { Doctor, DoctorFormData } from "../../types"
import { updateDoctor } from "../../api/AdminApi"
import DoctorForm from "./DoctorForm"

type EditDoctorModalProps={
    data: Doctor,
    editDoctorId: Doctor['_id'],
    show:boolean
}
export default function EditDoctorModal({data,editDoctorId,show}:EditDoctorModalProps) {

    const navigate = useNavigate()

    const initialValues : DoctorFormData = {
        name:data.name,
        dni:data.dni,
        speciality:data.speciality
    }

    const { register, handleSubmit, reset, formState: { errors } } = useForm({defaultValues:initialValues})

    const queryClient = useQueryClient()
    const {mutate}=useMutation({
        mutationFn:updateDoctor,
        onError:(error)=>toast.error(error.message),
        onSuccess:(data)=>{
            queryClient.invalidateQueries({queryKey: ['doctors']})
            queryClient.invalidateQueries({queryKey: ['editDoctor',editDoctorId]})
            toast.success(data)
            reset()
            navigate(location.pathname, { replace: true })
        }
    })
    const handleEditDoctor=(formData:DoctorFormData)=>{
        const data = {editDoctorId,formData}
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
                                        Edit Doctor
                                    </Dialog.Title>

                                    <p className="text-xl font-bold">Fill out the form for edit  {''}
                                        <span className="text-blue-600">a doctor</span>
                                    </p>

                                    <form
                                        className='mt-10 space-y-3'
                                        onSubmit={handleSubmit(handleEditDoctor)}
                                        noValidate
                                    >
                                        <DoctorForm register={register} errors={errors}/>
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
