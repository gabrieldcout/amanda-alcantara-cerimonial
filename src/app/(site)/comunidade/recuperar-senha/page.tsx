import type { Metadata } from "next";
import { BridePasswordResetForm } from "@/components/community/BridePasswordResetForm";

export const metadata: Metadata = {
  title: "Recuperar senha | Amanda Alcântara Cerimonial",
};

export default function ComunidadeRecuperarSenhaPage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-6 py-16">
      <BridePasswordResetForm />
    </div>
  );
}
