import type { ReactNode } from "react";

export function AuthShell({ children, eyebrow, title, description }: Readonly<{ children: ReactNode; eyebrow: string; title: string; description: string }>) {
  return (
    <main className="flex min-h-screen items-center justify-center px-5 py-12">
      <section className="w-full max-w-[420px]">
        <div className="mb-9 text-center">
          <div className="mx-auto mb-8 flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-lg font-semibold text-primary-foreground shadow-soft">M</div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">{eyebrow}</p>
          <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
          <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-muted-foreground">{description}</p>
        </div>
        <div className="rounded-2xl border bg-card p-6 shadow-soft sm:p-8">{children}</div>
        <p className="mt-8 text-center text-xs text-muted-foreground">Maré · clareza para a sua vida financeira</p>
      </section>
    </main>
  );
}
