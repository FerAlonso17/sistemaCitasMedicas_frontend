import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { confirmAccount } from "../../api/AuthAffiliateAPI";
import { toast } from "react-toastify";
import { AffiliateConfirmToken } from "../../types";

export default function ConfirmAccountAffiliateView() {

    const [token,setToken] = useState<AffiliateConfirmToken['token']>('')

    const navigate = useNavigate()
    const {mutate} = useMutation({
        mutationFn: confirmAccount,
        onError:(error)=> toast.error(error.message),
        onSuccess:()=>{
            // toast.success('Iniciando sesion...')
            navigate('/')
        }
    })

    const handleChange = (token: AffiliateConfirmToken['token'])=> setToken(token)
    const handleComplete = (token: AffiliateConfirmToken['token'])=> mutate({token})
    return (
        <>
            <h1 className="text-center text-3xl font-black text-blue-600 mt-6">Confirm your account</h1>
            <p className="text-xl font-light text-blue-600 mt-3 text-center">
                Enter the code you received by e-mail
            </p>
            <form
                className="space-y-4 p-8 mt-1 bg-white"
            >
                <label
                    className="font-normal text-xl text-center block"
                >Six digit code</label>
                <div className="flex justify-center gap-5">
                    <PinInput
                        value={token}
                        onChange={handleChange}
                        onComplete={handleComplete}
                    >
                        <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white focus:border-gray-500 focus:outline-none"/>
                        <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white focus:border-gray-500 focus:outline-none"/>
                        <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white focus:border-gray-500 focus:outline-none"/>
                        <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white focus:border-gray-500 focus:outline-none"/>
                        <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white focus:border-gray-500 focus:outline-none"/>
                        <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white focus:border-gray-500 focus:outline-none"/>
                    </PinInput>
                </div>
            </form>

            <nav className="mb-4 flex flex-col space-y-4 w-fit mx-auto">
                <Link
                    to='/auth/affiliate/request-code'
                    className="text-center text-gray-500 font-normal"
                >
                    Request a new code
                </Link>
            </nav>
        </>
    )
}
