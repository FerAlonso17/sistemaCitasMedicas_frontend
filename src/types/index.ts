import { z } from "zod";

/** ADMIN AUTH */
const authAdminSchema = z.object({
    name: z.string(),
    position: z.string(),
    email: z.string().email(),
    current_password: z.string(),
    password: z.string(),
    password_confirmation: z.string(),
    token: z.string()
})

type AuthAdmin = z.infer<typeof authAdminSchema>
export type AdminRegistrationForm = Pick<AuthAdmin, 'name' | 'position' | 'email' | 'password' | 'password_confirmation'>
export type AdminConfirmToken = Pick<AuthAdmin, 'token'>
export type RequestConfirmationCode = Pick<AuthAdmin, 'email'>
export type ForgotPasswordForm = Pick<AuthAdmin, 'email'>
export type NewPasswordForm = Pick<AuthAdmin, 'password' | 'password_confirmation'>
export type AuthenticateAdminForm = Pick<AuthAdmin, 'email' | 'password'>


/** ADMIN */
export const adminSchema = authAdminSchema.pick({
    name: true,
    email:true
}).extend({
    _id: z.string()
})


/** AFFILIATE AUTH */
const authAffiliateSchema = z.object({
    dni: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    birthdate: z.string().date(),
    email: z.string().email(),
    current_password: z.string(),
    password: z.string(),
    password_confirmation: z.string(),
    token: z.string()
})

type AuthAffiliate = z.infer<typeof authAffiliateSchema>
export type AffiliateRegistrationForm = Pick<AuthAffiliate,'dni' | 'firstName' | 'lastName' | 'email' |'birthdate' | 'password' | 'password_confirmation'>
export type AffiliateConfirmToken = Pick<AuthAffiliate, 'token'>
export type RequestConfirmationCodeAffiliate = Pick<AuthAffiliate, 'email'>
export type ForgotPasswordFormAffiliate = Pick<AuthAffiliate, 'email'>
export type NewPasswordFormAffiliate = Pick<AuthAffiliate, 'password' | 'password_confirmation'>
export type AuthenticateAffiliateForm = Pick<AuthAffiliate, 'email' | 'password'>

/** AFFILIATE */
export const affiliateSchema = authAffiliateSchema.pick({
    firstName:true,
    lastName:true,
    email:true
}).extend({
    _id: z.string()
})

export type Affiliate = z.infer<typeof affiliateSchema>

/** DOCTOR AUTH */
export const doctorSchema = z.object({
    _id: z.string(),
    name: z.string(),
    dni: z.string(),
    speciality: z.string()
})

export const doctorArraySchema = z.array(
    doctorSchema
)

export type Doctor = z.infer<typeof doctorSchema>
export type DoctorFormData = Pick<Doctor, 'dni' | 'name' | 'speciality'>

/** DOCTOR HOSPITAL */
export const hospitalSchema = z.object({
    _id: z.string(),
    name: z.string(),
    telephone: z.string(),
    direction: z.string()
})

export const hospitalArraySquema = z.array(
    hospitalSchema
)

export type Hospital = z.infer<typeof hospitalSchema>

/** APPOINTMENTS */
export const specialitySchema = z.enum(['General medicine', 'Odontology', 'Obstetrics', 'Pediatrics', 'Geriatrics', 'Psychology'])
export type Speciality = z.infer<typeof specialitySchema>

export const stateSchema = z.enum(['Pending', 'Rescheduled', 'Finished', 'Day_of_appointment'])
export type State = z.infer<typeof stateSchema>

export const appointmentSchema = z.object({
    _id: z.string(),
    doctor: z.object({
        _id: z.string(doctorSchema.pick({ _id: true })),
        name: z.string(doctorSchema.pick({ name: true }))
    }),
    speciality: specialitySchema,
    dateAppointment: z.string(),
    state: stateSchema,
    affiliate: z.string(affiliateSchema.pick({ _id: true })),
    hospital: hospitalSchema,
    orderAttention: z.number(),
})

export const dashboardAppointmentAffiliateSchema = z.array(
    appointmentSchema.pick({
        _id: true,
        doctor: true,
        speciality: true,
        dateAppointment: true,
        state: true,
        hospital: true,
        orderAttention: true,
    })
)

export const editAppointmentSchema = appointmentSchema.pick({
    _id: true,
    doctor: true,
    speciality: true,
    dateAppointment: true,
    hospital: true,
})

export const appointmentFormDataSchema = z.object({
    doctor: z.string(doctorSchema.pick({ name: true })),
    hospital: z.string(hospitalSchema.pick({ _id: true })),
    speciality: z.string(specialitySchema),
    dateAppointment: z.string(),
})

export type Appointment = z.infer<typeof appointmentSchema>
export type AppointmentFormData = z.infer<typeof appointmentFormDataSchema>
