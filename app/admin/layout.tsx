import Sidebar from "./Sidebar";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full items-start min-h-screen fc justify-start px-5 py-28 sm:px-10 pt-48 sm:pt-28">
      {children}
    </div>
  );
}
