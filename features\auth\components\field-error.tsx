export function FieldError({ message }: Readonly<{ message?: string }>) {
  return message ? <p className="mt-1.5 text-xs text-destructive">{message}</p> : null;
}

