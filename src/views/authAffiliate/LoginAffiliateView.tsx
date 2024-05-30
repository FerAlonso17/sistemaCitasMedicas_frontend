import { useForm } from "react-hook-form";
import { AuthenticateAffiliateForm } from "../../types";
import ErrorMessage from "../../components/ErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { loginAffiliate } from "../../api/AuthAffiliateAPI";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

export default function LoginAffiliateView() {

    const initialValues: AuthenticateAffiliateForm = {
        email: '',
        password: ''
    }

    const { handleSubmit, register, formState: { errors } } = useForm<AuthenticateAffiliateForm>({ defaultValues: initialValues })

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
            <h1 className="text-center text-3xl font-black text-blue-600 mt-3 px-1">MEDICAL APPOINTMENT SYSTEM</h1>
            <p className="text-lg font-light text-blue-600 mt-2 text-center">
                Separate your appointment by entering the system
            </p>
            <form
                onSubmit={handleSubmit(handleLogin)}
                className="space-y-4 p-8 bg-white"
                noValidate
            >
                <div className="flex flex-col gap-1">
                    <label
                        className="font-semibold text-lg"
                    >Email:</label>

                    <input
                        id="email"
                        type="email"
                        placeholder="Registration email"
                        className="w-full p-3  border-gray-300 border rounded-md focus:border-gray-500 focus:outline-none"
                        {...register("email", {
                            required: "Email required",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "E-mail no válido",
                            },
                        })}
                    />
                    {errors.email && (
                        <ErrorMessage>{errors.email.message}</ErrorMessage>
                    )}
                </div>

                <div className="flex flex-col gap-1">
                    <label
                        className="font-semibold text-lg"
                    >Password:</label>

                    <input
                        type="password"
                        placeholder="Registration password"
                        className="w-full p-3  border-gray-300 border rounded-md focus:border-gray-500 focus:outline-none"
                        {...register("password", {
                            required: "Password required",
                        })}
                    />
                    {errors.password && (
                        <ErrorMessage>{errors.password.message}</ErrorMessage>
                    )}
                </div>

                <input
                    type="submit"
                    value='Sign in'
                    className="bg-blue-600 hover:bg-blue-700 rounded-md w-full p-3 text-white font-black  text-xl cursor-pointer"
                />
            </form>
            <nav className="flex flex-col space-y-2 -mt-2 mb-4 w-fit mx-auto">
                <Link
                    to={'/auth/affiliate/register'}
                    className="text-center text-gray-500 font-normal"
                >
                    Don't have an account? Sign Up
                </Link>
                <Link
                    to={'/auth/affiliate/forgot-password'}
                    className="text-center text-gray-500 font-normal"
                >
                    Forgot Password?
                </Link>
            </nav>
        </>
    )
}
