import type { ReactNode } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

// Todo o painel admin é dinâmico (auth por request + queries ao banco),
// então nunca deve ser pre-renderizado no build.
export const dynamic = "force-dynamic";

export default function AdminDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <AdminSidebar />
      <main className="flex-1 overflow-x-auto p-4 sm:p-6 lg:p-8">{children}</main>
    </div>
  );
}
