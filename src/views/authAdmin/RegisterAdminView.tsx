import { useForm } from "react-hook-form"
import ErrorMessage from "../../components/ErrorMessage"
import { Link } from "react-router-dom"
import { AdminRegistrationForm } from "../../types"
import { useMutation } from "@tanstack/react-query"
import { createAccount } from "../../api/AuthAdminAPI"
import { toast } from "react-toastify"

export default function RegisterAdminView() {

    const initialValues: AdminRegistrationForm = {
        name: '',
        position: '',
        email: '',
        password: '',
        password_confirmation: '',
    }

    const {register,handleSubmit,formState:{errors}, watch,reset} = useForm<AdminRegistrationForm>({defaultValues: initialValues})

    const {mutate} = useMutation({
        mutationFn: createAccount,
        onError: (error)=> toast.error(error.message),
        onSuccess:(data)=>{
            toast.success(data)
            reset()
        }
    })
    const password = watch('password')

    const handleRegister =(formData: AdminRegistrationForm)=>mutate(formData)

    return (
        <>
            <h1 className=" text-center text-3xl font-black text-blue-600 mt-5">Create account</h1>
            <p className="text-xl font-light text-blue-600 mt-2 text-center">
                Fill out the form to {''}
                <span className="font-bold">create your account</span>
            </p>
            <form
                onSubmit={handleSubmit(handleRegister)}
                className="space-y-4 p-6 mt-1 bg-white"
                noValidate
            >
                <div className="flex flex-col gap-1">
                    <label
                        className="font-semibold text-md"
                    >Name:</label>

                    <input
                        type="name"
                        placeholder="Registration name"
                        className="w-full p-2  border-gray-300 border rounded-md focus:border-gray-500 focus:outline-none"
                        {...register("name", {
                            required: "Name required",
                        })}
                    />
                    {errors.name && (
                        <ErrorMessage>{errors.name.message}</ErrorMessage>
                    )}
                </div>

                <div className="flex flex-col gap-1">
                    <label
                        className="font-semibold text-md"
                    >Position:</label>

                    <input
                        type="position"
                        placeholder="Registration position"
                        className="w-full p-2  border-gray-300 border rounded-md focus:border-gray-500 focus:outline-none"
                        {...register("position", {
                            required: "Position required",
                        })}
                    />
                    {errors.position && (
                        <ErrorMessage>{errors.position.message}</ErrorMessage>
                    )}
                </div>

                <div className="flex flex-col gap-1">
                    <label
                        className="font-semibold text-md"
                    >Email:</label>

                    <input
                        id="email"
                        type="email"
                        placeholder="Registration email"
                        className="w-full p-2  border-gray-300 border rounded-md focus:border-gray-500 focus:outline-none"
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
                        className="font-semibold text-md"
                    >Password:</label>

                    <input
                        type="password"
                        placeholder="Registration password"
                        className="w-full p-2  border-gray-300 border rounded-md focus:border-gray-500 focus:outline-none"
                        {...register("password", {
                            required: "Password required",
                            minLength:{
                                value:8,
                                message:'The password must be at least 8 characters'
                            }
                        })}
                    />
                    {errors.password && (
                        <ErrorMessage>{errors.password.message}</ErrorMessage>
                    )}
                </div>

                <div className="flex flex-col gap-1">
                    <label
                        className="font-semibold text-md"
                    >Repeat Password:</label>

                    <input
                        id="password_confirmation"
                        type="password"
                        placeholder="Repeat password"
                        className="w-full p-2  border-gray-300 border rounded-md focus:border-gray-500 focus:outline-none"
                        {...register("password_confirmation", {
                            required: "Password required",
                            validate: value => value === password || 'The passwords are not the same'
                        })}
                    />
                    {errors.password_confirmation && (
                        <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
                    )}
                </div>

                <input
                    type="submit"
                    value='Register'
                    className="bg-blue-600 hover:bg-blue-700 rounded-md w-full p-2 text-white font-black  text-md cursor-pointer"
                />
            </form>
            <nav className="flex flex-col space-y-4 mb-4 w-fit mx-auto">
                <Link
                    to={'/auth/admin/login'}
                    className="text-center text-sm text-gray-500 font-normal"
                >
                    Do you already have an account? Sign In
                </Link>
                <Link
                    to={'/auth/admin/forgot-password'}
                    className="text-center text-sm text-gray-500 font-normal"
                >
                    Forgot Password?
                </Link>
            </nav>
        </>
    )
}
