import { isAxiosError } from "axios";
import api from "../lib/axios";
import { Appointment, AppointmentFormData, appointmentSchema, dashboardAppointmentAffiliateSchema, doctorArraySchema, hospitalArraySquema } from "../types";

export async function getAllAppointments() {
    try {
        const {data} = await api('affiliate/appointments')
        const response = dashboardAppointmentAffiliateSchema.safeParse(data)
        if (response.success) {
            return response.data
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function registerAppointment(formData:AppointmentFormData) {
    try {
        const url = `affiliate/appointments`
        const {data} = await api.post(url,formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function getDoctors() {
    try {
        const {data} = await api('affiliate/appointments/doctors')
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

export async function getHospitals() {
    try {
        const {data} = await api('affiliate/appointments/hospitals')
        const response = hospitalArraySquema.safeParse(data)
        if (response.success) {
            return response.data
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function cancelAppointment(id:Appointment['_id']) {
    try {
        const {data} = await api.delete(`affiliate/appointments/${id}`)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}
type editAppointmentProps={
    editAppointmentId: Appointment['_id']
    formData: AppointmentFormData
}
export async function editAppointment({editAppointmentId,formData}:editAppointmentProps) {
    try {
        const {data} = await api.put<string>(`affiliate/appointments/${editAppointmentId}`,formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function getAppointmentById(editAppointmentId:Appointment['_id']) {
    try {
        const {data} = await api(`affiliate/appointments/${editAppointmentId}`)
        const response = appointmentSchema.safeParse(data)
        if (response.success) {
            return response.data
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}