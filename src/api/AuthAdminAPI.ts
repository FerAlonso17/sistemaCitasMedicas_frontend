import { isAxiosError } from "axios";
import { AdminConfirmToken, AdminRegistrationForm, AuthenticateAdminForm, ForgotPasswordForm, NewPasswordForm, RequestConfirmationCode, adminSchema } from "../types";
import api from "../lib/axios";

export async function createAccount(formData:AdminRegistrationForm) {
    try {
        const url = '/auth/create-account'
        const {data} = await api.post<string>(url,formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function confirmAccount(formData: AdminConfirmToken) {
    try {
        const url = '/auth/confirm-account'
        const {data} = await api.post<string>(url,formData)
        localStorage.setItem('AUTH_TOKEN',data)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export async function requestConfirmationCode(formData:RequestConfirmationCode) {
    try {
        const url = '/auth/request-code'
        const {data} = await api.post<string>(url,formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function forgotPassword(formData:ForgotPasswordForm) {
    try {
        const url = '/auth/forgot-password'
        const {data} = await api.post<string>(url,formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function validateToken(formData:AdminConfirmToken) {
    try {
        const url = '/auth/validate-token'
        const {data} = await api.post<string>(url,formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function updatePasswordWithToken({formData,token}:{formData:NewPasswordForm,token:AdminConfirmToken['token']}) {
    try {
        const url = `/auth/update-password/${token}`
        const {data} = await api.post<string>(url,formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function login(formData:AuthenticateAdminForm) {
    try {
        const url = '/auth/login'
        const {data} = await api.post<string>(url,formData)
        localStorage.setItem('AUTH_TOKEN',data)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function getAdmin() {
    try {
        const {data} = await api('/auth/admin')
        const response = adminSchema.safeParse(data)
        if (response.success) {
            return response.data
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}