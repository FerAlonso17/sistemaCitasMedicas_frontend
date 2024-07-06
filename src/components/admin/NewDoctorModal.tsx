import { Dialog, Transition } from "@headlessui/react"
import { useForm } from "react-hook-form"
import { useLocation, useNavigate } from "react-router-dom"
import { Fragment } from "react/jsx-runtime"
import { DoctorFormData } from "../../types"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { registerDoctor } from "../../api/AdminApi"
import { toast } from "react-toastify"
import DoctorForm from "./DoctorForm"

export default function NewDoctorModal() {

    const navigate = useNavigate()
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const modalNewDoctor = queryParams.get('newDoctor')
    const show = modalNewDoctor?true:false

    const initialValues :DoctorFormData = {
        name:'',
        dni:'',
        speciality:''
    }
    const {handleSubmit,register,formState:{errors},reset}=useForm<DoctorFormData>({defaultValues:initialValues})

    const queryClient = useQueryClient()
    const {mutate} = useMutation({
        mutationFn:registerDoctor,
        onError:(error)=>toast.error(error.message),
        onSuccess:(data)=>{
            toast.success(data)
            navigate(location.pathname,{replace:true})
            queryClient.invalidateQueries({queryKey:['doctors']})
            reset()
        }
    })

    const handleRegisterDoctor = (formData:DoctorFormData)=>mutate(formData)

    return (
        <>
            <Transition appear show={show} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => 
                    {
                        navigate(location.pathname, { replace: true })
                        reset()
                    }}
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
                                        className="font-black text-3xl my-1 -mt-2"
                                    >
                                        New Doctor
                                    </Dialog.Title>

                                    <p className="text-xl font-bold">Fill out the form for register  {''}
                                        <span className="text-blue-600">a doctor</span>
                                    </p>

                                    <form
                                        className='mt-5 space-y-2'
                                        onSubmit={handleSubmit(handleRegisterDoctor)}
                                        noValidate
                                    >
                                        <DoctorForm register={register} errors={errors}/>
                                        <input
                                            type="submit"
                                            value={'Register doctor'}
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
