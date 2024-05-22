import { isAxiosError } from "axios";
import api from "../lib/axios";
import { AuthenticateAffiliateForm, affiliateSchema } from "../types";

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