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