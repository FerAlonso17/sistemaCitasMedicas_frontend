import { useState } from "react"
import { AdminConfirmToken } from "../../types"
import NewPasswordForm from "../../components/AuthAdmin/NewPasswordForm"
import NewPasswordToken from "../../components/AuthAdmin/NewPasswordToken"

export default function NewPasswordView() {

    const [token,setToken] = useState<AdminConfirmToken['token']>('')
    const [isValidToken,setIsValidToken] = useState(false)

    return (
        <>
            <h1 className="text-center text-5xl font-black text-blue-600 mt-6">Restore password</h1>
            {isValidToken ? 
                <NewPasswordForm token={token}/>:
                <NewPasswordToken token={token} setToken={setToken} setIsValidToken={setIsValidToken}/>
            }
        </>
    )
}
