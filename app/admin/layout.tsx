import Sidebar from './Sidebar';

export default function AdminLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="w-full items-start min-h-screen fr px-5 sm:px-10">
			<Sidebar />
			<div className="py-28 w-full h-full pl-64">{children}</div>
		</div>
	);
}
