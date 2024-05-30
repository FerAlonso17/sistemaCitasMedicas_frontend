import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { Link } from "react-router-dom";
import { AffiliateConfirmToken } from "../../types";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { validateToken } from "../../api/AuthAffiliateAPI";

type NewPasswordTokenProps={
    token:AffiliateConfirmToken['token']
    setToken:React.Dispatch<React.SetStateAction<string>>
    setIsValidToken:React.Dispatch<React.SetStateAction<boolean>>
}

export default function NewPasswordTokenAffiliate({token,setToken,setIsValidToken}:NewPasswordTokenProps) {

    const {mutate} = useMutation({
        mutationFn: validateToken,
        onError:(error)=> toast.error(error.message),
        onSuccess:(data)=>{
            toast.success(data)
            setIsValidToken(true)
        }
    })

    const handleChange=(token:AffiliateConfirmToken['token'])=>setToken(token)
    const handleComplete=(token:AffiliateConfirmToken['token'])=>mutate({token})

    return (
        <>
            <p className="text-2xl font-light text-blue-600 mt-4 text-center">
                Enter the code you received by e-mail
            </p>
            <form
                className="space-y-6 p-8 mt-1 bg-white"
            >
                <label
                    className="font-normal text-2xl text-center block"
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
                    to='/auth/affiliate/forgot-password'
                    className="text-center text-gray-500 font-normal"
                >
                    Request a new code
                </Link>
            </nav>
        </>
    )
}
