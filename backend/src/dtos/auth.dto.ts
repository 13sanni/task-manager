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



/* user login*/
export const loginUserSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password is required"),
});


export const updateProfileSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters")
    .optional(),

  email: z
    .email("Invalid email address")
    .optional(),
});




export const changePasswordSchema = z.object({
  oldPassword: z.string().min(6),
  newPassword: z.string().min(6),
});

export type ChangePasswordDto = z.infer<typeof changePasswordSchema>;

export type UpdateProfileDto = z.infer<typeof updateProfileSchema>;

export type LoginUserDto = z.infer<typeof loginUserSchema>;

export type RegisterUserDto = z.infer<typeof registerUserSchema>;