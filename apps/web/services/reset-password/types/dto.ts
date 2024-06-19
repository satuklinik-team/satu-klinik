import { z } from "zod";

export const forgotPasswordRequestSchema = z.object({
  email: z.string().email("Email tidak valid!"),
});

export const resetPasswordRequestSchema = z
  .object({
    newPassword: z.string().min(1),
    confirmPassword: z.string().min(1),
    resetToken: z.string().min(1),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Password tidak sama!",
    path: ["confirmPassword"],
  });

export type ForgotPasswordRequestSchema = z.infer<
  typeof forgotPasswordRequestSchema
>;
export type ResetPasswordRequestSchema = z.infer<
  typeof resetPasswordRequestSchema
>;

export type ForgotPasswordRequestDto = ForgotPasswordRequestSchema;
export type ResetPasswordRequestDto = ResetPasswordRequestSchema;
