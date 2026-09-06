import { createClient } from "@/lib/supabase/client";
import type { ForgotPasswordInput, LoginInput, SignUpInput } from "../schemas/auth.schema";

export async function signIn(input: LoginInput) {
  return createClient().auth.signInWithPassword({ email: input.email, password: input.password });
}

export async function signUp(input: SignUpInput) {
  const origin = window.location.origin;
  return createClient().auth.signUp({
    email: input.email,
    password: input.password,
    options: { data: { full_name: input.name }, emailRedirectTo: `${origin}/auth/callback?next=/dashboard` },
  });
}

export async function sendPasswordResetEmail(input: ForgotPasswordInput) {
  return createClient().auth.resetPasswordForEmail(input.email, {
    redirectTo: `${window.location.origin}/auth/callback?next=/redefinir-senha`,
  });
}

export async function signOut() {
  return createClient().auth.signOut();
}

