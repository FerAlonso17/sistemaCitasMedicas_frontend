import { isAxiosError } from "axios";
import api from "../lib/axios";
import { AffiliateConfirmToken, AffiliateRegistrationForm, AuthenticateAffiliateForm, ForgotPasswordFormAffiliate, NewPasswordFormAffiliate, RequestConfirmationCodeAffiliate, affiliateSchema } from "../types";

export async function createAccount(formData:AffiliateRegistrationForm) {
    try {
        const url = '/affiliate/auth/create-account'
        console.log(formData)
        const {data} = await api.post<string>(url,formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function confirmAccount(formData: AffiliateConfirmToken) {
    try {
        const url = '/affiliate/auth/confirm-account'
        const {data} = await api.post<string>(url,formData)
        localStorage.setItem('AUTH_TOKEN',data)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export async function requestConfirmationCode(formData:RequestConfirmationCodeAffiliate) {
    try {
        const url = '/affiliate/auth/request-code'
        const {data} = await api.post<string>(url,formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function forgotPassword(formData:ForgotPasswordFormAffiliate) {
    try {
        const url = '/affiliate/auth/forgot-password'
        const {data} = await api.post<string>(url,formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function validateToken(formData:AffiliateConfirmToken) {
    try {
        const url = '/affiliate/auth/validate-token'
        const {data} = await api.post<string>(url,formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function updatePasswordWithToken({formData,token}:{formData:NewPasswordFormAffiliate,token:AffiliateConfirmToken['token']}) {
    try {
        const url = `/affiliate/auth/update-password/${token}`
        const {data} = await api.post<string>(url,formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function loginAffiliate(formData:AuthenticateAffiliateForm) {
    try {
        const url = '/affiliate/auth/login'
        const {data} = await api.post<string>(url,formData)
        localStorage.setItem('AUTH_TOKEN',data)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function getAffiliate() {
    try {
        const {data} = await api('/affiliate/auth/patient')
        const response = affiliateSchema.safeParse(data)
        if (response.success) {
            return response.data
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}