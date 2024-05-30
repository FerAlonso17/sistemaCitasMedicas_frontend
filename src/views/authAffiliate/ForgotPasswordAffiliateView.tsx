import { Link, useNavigate } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage";
import { useForm } from "react-hook-form";
import { ForgotPasswordFormAffiliate } from "../../types";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { forgotPassword } from "../../api/AuthAffiliateAPI";

export default function ForgotPasswordAffiliateView() {

    const initialValues: ForgotPasswordFormAffiliate = {
        email:''
    }
    const {register,handleSubmit,formState:{errors}}=useForm<ForgotPasswordFormAffiliate>({defaultValues:initialValues})

    const navigate = useNavigate()
    const {mutate} = useMutation({
        mutationFn:forgotPassword,
        onError:(error)=>toast.error(error.message),
        onSuccess:(data)=>{
            toast.success(data)
            navigate('/auth/affiliate/new-password')
        }
    })

    const handleRequestCode=(formData:ForgotPasswordFormAffiliate)=>mutate(formData)

    return (
        <>
            <h1 className="text-center text-5xl font-black text-blue-600 mt-6">Restore password</h1>
            <p className="text-2xl font-light text-blue-600 mt-4 text-center">
                Enter your email and restore your password
            </p>

            <form
                onSubmit={handleSubmit(handleRequestCode)}
                className="space-y-6 p-8 mt-1 bg-white"
                noValidate
            >
                <div className="flex flex-col gap-1">
                    <label
                        className="font-normal text-xl"
                        htmlFor="email"
                    >Email</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Registration email"
                        className="w-full p-3 rounded-lg border-gray-300 border focus:border-gray-500 focus:outline-none"
                        {...register("email", {
                            required: "Email required",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "E-mail valid",
                            },
                        })}
                    />
                    {errors.email && (
                        <ErrorMessage>{errors.email.message}</ErrorMessage>
                    )}
                </div>

                <input
                    type="submit"
                    value='Send Instruccions'
                    className="bg-blue-600 hover:bg-blue-700 rounded-md w-full p-2 text-white font-black  text-md cursor-pointer"
                />
            </form>

            <nav className="mb-4 flex flex-col space-y-4 w-fit mx-auto">
                <Link
                    to='/auth/affiliate/login'
                    className="text-center text-gray-500 font-normal"
                >
                    Do you already have an account? Sign In
                </Link>
                <Link
                    to='/auth/affiliate/register'
                    className="text-center text-gray-500 font-normal"
                >
                    Don't have an account? Sign Up
                </Link>
            </nav>
        </>
    )
}
