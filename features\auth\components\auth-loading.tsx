import { Skeleton } from "@/components";

export function AuthLoading() {
  return <main className="flex min-h-screen items-center justify-center px-5"><div className="w-full max-w-[420px] space-y-4"><Skeleton className="mx-auto h-11 w-11 rounded-2xl" /><Skeleton className="mx-auto h-8 w-52" /><Skeleton className="h-72 w-full rounded-2xl" /></div></main>;
}

