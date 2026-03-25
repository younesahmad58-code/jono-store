import { Sidebar } from "@/components/admin/Sidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";

export const metadata = {
  title: "Admin Dashboard",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col lg:ml-0">
        <div className="hidden lg:block">
          <AdminHeader />
        </div>
        <div className="lg:hidden h-14" />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
