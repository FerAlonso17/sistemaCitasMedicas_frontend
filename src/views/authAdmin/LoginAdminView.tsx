import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import ErrorMessage from "../../components/ErrorMessage"
import { useMutation } from "@tanstack/react-query"
import { login } from "../../api/AuthAdminAPI"
import { toast } from "react-toastify"
import { AuthenticateAdminForm } from "../../types"

export default function LoginAdminView() {

    const initialValues:AuthenticateAdminForm = {
        email: '',
        password: ''
    }
    const {register,formState:{errors},handleSubmit} = useForm<AuthenticateAdminForm>({defaultValues: initialValues})

    const {mutate} = useMutation({
        mutationFn: login,
        onError:(error)=>toast.error(error.message),
        onSuccess:()=>{
            toast.success('Iniciando sesión')
        }
    })
    const handleLogin =(formData:AuthenticateAdminForm)=>mutate(formData)

    return (
        <>
            <h1 className="text-center text-5xl font-black text-blue-600 mt-6">Welcome</h1>
            <p className="text-2xl font-light text-blue-600 mt-4 text-center">
                Medical appointment {''}
                <span className="font-bold">management system</span>
            </p>
            <form
                onSubmit={handleSubmit(handleLogin)}
                className="space-y-6 p-8 mt-1 bg-white"
                noValidate
            >
                <div className="flex flex-col gap-2">
                    <label
                        className="font-semibold text-xl"
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

                <div className="flex flex-col gap-2">
                    <label
                        className="font-semibold text-xl"
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
            <nav className="flex flex-col space-y-4 mb-4 w-fit mx-auto">
                <Link
                    to={'/auth/admin/register'}
                    className="text-center text-gray-500 font-normal"
                >
                    Don't have an account? Sign Up
                </Link>
                <Link
                    to={'/auth/admin/forgot-password'}
                    className="text-center text-gray-500 font-normal"
                >
                    Forgot Password?
                </Link>
            </nav>
        </>
    )
}
