import { z } from "zod";

const password = z.string().min(8, "A senha deve ter pelo menos 8 caracteres.");

export const loginSchema = z.object({
  email: z.string().trim().email("Digite um e-mail válido."),
  password,
});

export const signUpSchema = z
  .object({
    name: z.string().trim().min(2, "Digite seu nome completo."),
    email: z.string().trim().email("Digite um e-mail válido."),
    password,
    confirmPassword: z.string().min(1, "Confirme sua senha."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "As senhas precisam ser iguais.",
  });

export const forgotPasswordSchema = z.object({
  email: z.string().trim().email("Digite um e-mail válido."),
});

export const resetPasswordSchema = z
  .object({ password, confirmPassword: z.string().min(1, "Confirme sua senha.") })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "As senhas precisam ser iguais.",
  });

export type LoginInput = z.infer<typeof loginSchema>;
export type SignUpInput = z.infer<typeof signUpSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
