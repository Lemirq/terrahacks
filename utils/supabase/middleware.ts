import { Database } from '@/database.types';
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function updateSession(request: NextRequest) {
	let response = NextResponse.next({
		request: {
			headers: request.headers,
		},
	});

	const supabase = createServerClient<Database>(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
		cookies: {
			get(name: string) {
				``;
				return request.cookies.get(name)?.value;
			},
			set(name: string, value: string, options: CookieOptions) {
				request.cookies.set({
					name,
					value,
					...options,
				});
				response = NextResponse.next({
					request: {
						headers: request.headers,
					},
				});
				response.cookies.set({
					name,
					value,
					...options,
				});
			},
			remove(name: string, options: CookieOptions) {
				request.cookies.set({
					name,
					value: '',
					...options,
				});
				response = NextResponse.next({
					request: {
						headers: request.headers,
					},
				});
				response.cookies.set({
					name,
					value: '',
					...options,
				});
			},
		},
	});

	const {
		data: { user },
		error,
	} = await supabase.auth.getUser();
	const protectedRoutes = ['/admin', '/dashboard', '/apply'];
	// url starts with any of the protected routes, dont use .includes
	if (!user && protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route))) {
		// no user, potentially respond by redirecting the user to the login page
		const url = request.nextUrl.clone();
		url.pathname = '/login';
		return NextResponse.redirect(url);
	} else if (user) {
		if (request.nextUrl.pathname.startsWith('/admin')) {
			const admin = [
				'519vihaansh@gmail.com',
				'spacecoder9849999@hotmail.com',
				'smitjohn3221@gmail.com',
				'shayan.awan.shakeel@gmail.com',
				'prabhnannu07@gmail.com',
			];
			if (!admin.includes(user?.email!)) {
				const url = request.nextUrl.clone();
				url.pathname = '/dashboard';
				return NextResponse.redirect(url);
			}
		}
	}

	return response;
}
