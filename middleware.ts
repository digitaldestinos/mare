import { type NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import type { CookieOptions } from "@supabase/ssr";

const publicRoutes = new Set(["/login", "/cadastro", "/cadastro/confirmacao", "/esqueci-senha", "/redefinir-senha", "/auth/callback"]);

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request });
  const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll: (cookiesToSet: { name: string; value: string; options: CookieOptions }[]) => cookiesToSet.forEach(({ name, value, options }) => { request.cookies.set(name, value); response = NextResponse.next({ request }); response.cookies.set(name, value, options); }),
    },
  });
  const { data: { user } } = await supabase.auth.getUser();
  const isPublic = publicRoutes.has(request.nextUrl.pathname);
  if (!user && !isPublic) return NextResponse.redirect(new URL("/login", request.url));
  if (user && (request.nextUrl.pathname === "/" || publicRoutes.has(request.nextUrl.pathname) && request.nextUrl.pathname !== "/redefinir-senha")) return NextResponse.redirect(new URL("/dashboard", request.url));
  return response;
}

export const config = { matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"] };
