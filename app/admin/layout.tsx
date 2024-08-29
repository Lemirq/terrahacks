import Sidebar from "./Sidebar";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full items-start fc justify-start px-5 sm:px-10  pt-24 pb-10 sm:pt-28">
      {children}
    </div>
  );
}
