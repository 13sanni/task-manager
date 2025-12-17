import { z } from "zod";
export const registerUserSchema = z.object({
    name: z
        .string()
        .min(2, "name must have atleast 2 characters")
        .max(50, "must not have more than 50 characters"),

    email: z
        .email({
            message: "Invalid email address",
        }),

    password: z
        .string()
        .min(8, "should have atleast 8 characters")

})

export type RegisterUserDto = z.infer<typeof registerUserSchema>;