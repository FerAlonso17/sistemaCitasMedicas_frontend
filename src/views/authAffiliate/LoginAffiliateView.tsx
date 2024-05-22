import { useForm } from "react-hook-form";
import Logo from "../../components/Logo";
import { AuthenticateAffiliateForm } from "../../types";
import ErrorMessage from "../../components/ErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { loginAffiliate } from "../../api/AuthAffiliateAPI";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function LoginAffiliateView() {

    const { handleSubmit, reset, register, formState: { errors } } = useForm<AuthenticateAffiliateForm>({ defaultValues: { dni: '' } })
    
    const navigate = useNavigate()
    const { mutate } = useMutation({
        mutationFn: loginAffiliate,
        onError: (error) => toast.error(error.message),
        onSuccess: () => {
            // toast.success('Iniciando sesion')
            // reset()
            navigate('/')
        }
    })

    const handleLogin = (formData: AuthenticateAffiliateForm) => mutate(formData)

    return (
        <>
            <div className="bg-blue-800 min-h-screen grid place-items-center">
                <div className="w-2/4 mx-auto flex flex-col items-center justify-stretch">
                    <div className="hidden lg:block w-1/3">
                        <Logo />
                    </div>
                    <div className="bg-white lg:m-4 mx-auto w-2/3 rounded-2xl shadow-2xl drop-shadow-lg overflow-y-hidden p-2 lg:p-1">
                        <h1 className="text-center text-4xl font-black text-blue-600 mt-6">MEDICAL APPOINTMENT SYSTEM</h1>
                        <p className="text-lg font-light text-blue-600 mt-3 text-center">
                            Separate your appointment by entering the system
                        </p>
                        <form
                            onSubmit={handleSubmit(handleLogin)}
                            className="space-y-5 p-8 bg-white"
                            noValidate
                        >
                            <div className="flex flex-col gap-2">
                                <label
                                    className="font-semibold text-xl"
                                >DNI:</label>

                                <input
                                    id="dni"
                                    type="text"
                                    placeholder="Enter your dni"
                                    className="w-full p-3  border-gray-300 border rounded-md focus:border-gray-500 focus:outline-none"
                                    {...register("dni", {
                                        required: "Field required"
                                    })}
                                />
                                {errors.dni && (
                                    <ErrorMessage>{errors.dni.message}</ErrorMessage>
                                )}
                            </div>

                            <input
                                type="submit"
                                value='Sign in'
                                className="bg-blue-600 hover:bg-blue-700 rounded-md w-full p-3 text-white font-black  text-xl cursor-pointer"
                            />
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer/>
        </>
    )
}
