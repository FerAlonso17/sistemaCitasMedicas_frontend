import { useState } from "react"
import { AffiliateConfirmToken } from "../../types"
import NewPasswordFormAffiliate from "../../components/AuthAffiliate/NewPasswordFormAffiliate"
import NewPasswordTokenAffiliate from "../../components/AuthAffiliate/NewPasswordTokenAffiliate"

export default function NewPasswordAffiliateView() {

    const [token,setToken] = useState<AffiliateConfirmToken['token']>('')
    const [isValidToken,setIsValidToken] = useState(false)

    return (
        <>
            <h1 className="text-center text-5xl font-black text-blue-600 mt-6">Restore password</h1>
            {isValidToken ? 
                <NewPasswordFormAffiliate token={token}/>:
                <NewPasswordTokenAffiliate token={token} setToken={setToken} setIsValidToken={setIsValidToken}/>
            }
        </>
    )
}
