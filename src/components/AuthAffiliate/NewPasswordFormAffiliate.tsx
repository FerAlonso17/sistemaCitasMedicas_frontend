import { useForm } from "react-hook-form"
import ErrorMessage from "../ErrorMessage"
import { AffiliateConfirmToken, NewPasswordForm as NewPswdForm } from "../../types"
import { useMutation } from "@tanstack/react-query"
import { toast } from "react-toastify"
import { updatePasswordWithToken } from "../../api/AuthAffiliateAPI"
import { Link, useNavigate } from "react-router-dom"

type NewPasswordFormProps = {
    token: AffiliateConfirmToken['token']
}
export default function NewPasswordFormAffiliate({token}:NewPasswordFormProps) {

    const navigate = useNavigate()

    const initialValues: NewPswdForm = {
        password: '',
        password_confirmation: '',
    }
    const {handleSubmit,register,watch,formState:{errors}}=useForm<NewPswdForm>({defaultValues:initialValues})
    
    const {mutate} = useMutation({
        mutationFn: updatePasswordWithToken,
        onError: (error)=> toast.error(error.message),
        onSuccess:(data)=>{
            toast.success(data)
            navigate('/auth/affiliate/login')
        }
    })
    const handleNewPassword =(formData:NewPswdForm)=>{
        const data = {formData,token}
        mutate(data)
    }

    const password = watch('password')
    
    return (
        <>
            <form
                onSubmit={handleSubmit(handleNewPassword)}
                className="space-y-6 p-8 mt-1 bg-white"
                noValidate
            >

                <div className="flex flex-col gap-2">
                    <label
                        className="font-semibold text-xl"
                    >Password</label>

                    <input
                        type="password"
                        placeholder="Registration password"
                        className="w-full p-3  border-gray-300 border rounded-md focus:border-gray-500 focus:outline-none"
                        {...register("password", {
                            required: "Password required",
                            minLength: {
                                value: 8,
                                message: 'The password must be at least 8 characters'
                            }
                        })}
                    />
                    {errors.password && (
                        <ErrorMessage>{errors.password.message}</ErrorMessage>
                    )}
                </div>

                <div className="flex flex-col gap-2">
                    <label
                        className="font-semibold text-xl"
                    >Repetir Password</label>

                    <input
                        id="password_confirmation"
                        type="password"
                        placeholder="Repeat Password"
                        className="w-full p-3  border-gray-300 border rounded-md focus:border-gray-500 focus:outline-none"
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
                    value='Establish new password'
                    className="bg-blue-600 hover:bg-blue-700 rounded-md w-full p-2 text-white font-black  text-md cursor-pointer"
                />
            </form>
            <nav className="mb-4 flex flex-col space-y-4 w-fit mx-auto">
                <Link
                    to='/auth/affiliate/forgot-password'
                    className="text-center text-gray-500 font-normal"
                >
                    Request a new code
                </Link>
            </nav>
        </>
    )
}
