import { z } from "zod";

export const clinicNewUserSchema = z
  .object({
    fullname: z
      .string({ required_error: "Wajib diisi!" })
      .min(1, "Minimal 1 huruf"),
    email: z
      .string({ required_error: "Wajib diisi!" })
      .email("Email tidak valid!"),
    phone: z
      .string({ required_error: "Wajib diisi!" })
      .min(10, "Minimal 10 digit")
      .max(13, "Maksimal 13 digit"),
    password: z
      .string({ required_error: "Wajib diisi!" })
      .min(1, "Minimal 1 huruf"),
    confirmPassword: z
      .string({ required_error: "Wajib diisi!" })
      .min(1, "Minimal 1 huruf"),
    role: z.enum(["ADMIN", "DOCTOR", "PHARMACY"]),
    address: z
      .string({ required_error: "Wajib diisi!" })
      .min(1, "Minimal 1 huruf"),
    nik: z
      .string({ required_error: "Wajib diisi!" })
      .min(16, "Harus 16 digit")
      .max(16, "Harus 16 digit"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password tidak sama!",
    path: ["confirmPassword"],
  });
export type ClinicNewUserSchema = z.infer<typeof clinicNewUserSchema>;
