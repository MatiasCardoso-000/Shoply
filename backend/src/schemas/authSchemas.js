import { z } from "zod";

export const registerSchema = z
  .object({
    email: z.email("Email format invalid"),
    username: z.string("Username is required").min(4),
    password: z
      .string()
      .min(8, "La contraseña debe ser de al menos 8 caracteres")
      .regex(
        /^(?=.*[A-Z])(?=.*[0-9])(?=.*[_\-ñÑ.])[a-zA-Z0-9_ñÑ.\-]+$/,
        "La contraseña debe contener al menos una mayúscula, un número y un caracter especial ( _ - ñ Ñ . )"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Las contraseñas no coinciden.",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z.email("El formato de correo es inválido."),
  password: z
    .string()
    .min(8, "La contraseña debe ser de al menos 8 caracteres")
    .regex(
      /^(?=.*[A-Z])(?=.*[0-9])(?=.*[_\-ñÑ.])[a-zA-Z0-9_ñÑ.\-]+$/,
      "La contraseña debe contener al menos una mayúscula, un número y un caracter especial ( _ - ñ Ñ . )"
    ),
});
