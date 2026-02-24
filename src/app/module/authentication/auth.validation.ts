import { z } from "zod";

const userCreatedValidationSchema = z.object({
    body: z.object({
        name: z.string().min(3).max(50),
        email: z.string().email(),
        password: z.string().min(6).max(50),
        role: z.enum(["admin", "user"]).default("user"),
        isDeleted: z.boolean().default(false),
    })
})

const verifyEmailValidationSchema = z.object({
    body: z.object({
        email: z.string().email(),
        code: z.string().length(6)
    })
})

const forgotPasswordValidationSchema = z.object({
    body: z.object({
        email: z.string().email()
    })
})

const resetPasswordValidationSchema = z.object({
    body: z.object({
        email: z.string().email(),
        code: z.string().length(6),
        newPassword: z.string().min(6).max(50)
    })
})

export const UserCreatedValidation = {
    userCreatedValidationSchema,
    verifyEmailValidationSchema,
    forgotPasswordValidationSchema,
    resetPasswordValidationSchema
} 
