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
export const affiliateSchema = z.object({
    _id: z.string(),
    dni: z.string(),
    name: z.string()
})

export type AuthAffiliate = z.infer<typeof affiliateSchema>
export type AuthenticateAffiliateForm = Pick<AuthAffiliate, 'dni'>