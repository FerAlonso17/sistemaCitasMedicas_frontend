import { isAxiosError } from "axios";
import api from "../lib/axios";
import { Doctor, DoctorFormData, doctorArraySchema, doctorSchema } from "../types";

export async function registerDoctor(formData:DoctorFormData) {
    try {
        const url = 'admin/doctors'
        const {data} = await api.post(url,formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export async function getDoctorById(doctorId:Doctor['_id']) {
    try {
        const {data} = await api(`admin/doctors/${doctorId}`)
        const response = doctorSchema.safeParse(data)
        if (response.success) {
            return response.data
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function getDoctors() {
    try {
        const {data} = await api(`admin/doctors`)
        const response = doctorArraySchema.safeParse(data)
        if (response.success) {
            return response.data
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

type updateDoctorProps = {
    editDoctorId:Doctor['_id']
    formData:DoctorFormData
}
export async function updateDoctor({editDoctorId,formData}:updateDoctorProps) {
    try {
        const url = `admin/doctors/${editDoctorId}`
        const {data} = await api.put<string>(url,formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function deleteDoctor(deleteDoctorId:Doctor['_id']) {
    try {
        const url = `admin/doctors/${deleteDoctorId}`
        const {data} = await api.delete<string>(url)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}