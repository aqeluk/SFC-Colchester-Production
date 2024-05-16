"use client";

import { useFormStatus } from "react-dom";

export function SubmitButton({ cn, label, loading }: { cn: string, label: string, loading: React.ReactNode}) {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending} className={cn}>
      {pending ? loading : label}
    </button>
  );
}
