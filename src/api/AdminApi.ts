import { isAxiosError } from "axios";
import api from "../lib/axios";
import { Doctor, DoctorFormData, Record, RecordFormData, doctorArraySchema, doctorSchema, recordSchema } from "../types";

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


/** RECORDS */
export async function getRecordById(recordId:Record['_id']) {
    try {
        const {data} = await api(`admin/records/manageRecord/${recordId}`)
        const response = recordSchema.safeParse(data)
        if (response.success) {
            return response.data
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function getRecordByDate(dateRecord:RecordFormData['dateRecord']) {
    try {
        const {data} = await api(`admin/records/manageRecord/${dateRecord}`)
        const response = recordSchema.safeParse(data)
        if (response.success) {
            return response.data
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function createRecord(formData:RecordFormData) {
    try {
        const url = 'admin/records/manageRecord'
        const {data} = await api.post(url,formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

type addDoctorToRecordProps = {
    editRecordId:Record['_id']
    formData:RecordFormData['specialityR'|'doctorR'|'numberAppointment']
}
export async function addDoctorToRecord({editRecordId,formData}:addDoctorToRecordProps) {
    try {
        const url = `admin/records/manageRecord/${editRecordId}`
        const {data} = await api.put<string>(url,formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

type deleteSpecialityOfRecordProps = {
    editRecordId:Record['_id']
    formData:RecordFormData['specialityR']
}
export async function deleteSpecialityOfRecord({editRecordId,formData}:deleteSpecialityOfRecordProps) {
    try {
        const url = `admin/records/manageRecord/${editRecordId}/speciality`
        const {data} = await api.put<string>(url,formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

type deleteDoctorFromRecordProps = {
    editRecordId:Record['_id']
    formData:RecordFormData['specialityR'|'doctorR']
}
export async function deleteDoctorFromRecord({editRecordId,formData}:deleteDoctorFromRecordProps) {
    try {
        const url = `admin/records/manageRecord/${editRecordId}/doctor`
        const {data} = await api.put<string>(url,formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function updateNumberAppointments({editRecordId,formData}:addDoctorToRecordProps) {
    try {
        const url = `admin/records/manageRecord/${editRecordId}`
        const {data} = await api.patch<string>(url,formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}