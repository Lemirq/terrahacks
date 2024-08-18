import { ImageResponse } from 'next/og';
import { NextRequest, NextResponse } from 'next/server';
// App router includes @vercel/og.
// No need to install it.

export const runtime = 'edge';

export async function GET(request: NextRequest) {
	// get search params
	const code = request.nextUrl.searchParams.get('code');
	const mode = request.nextUrl.searchParams.get('mode');
	const host = request.nextUrl.host;

	if (!mode) return NextResponse.json({ error: 'mode is required' }, { status: 400 });

	// console.log(code);

	// Make sure the font exists in the specified path:
	const fontData = await fetch('https://hack49.com/fonts/Satoshi-Black.ttf').then((res) => res.arrayBuffer());

	if (mode === 'applied') {
		return new ImageResponse(
			(
				<div
					tw="flex flex-col w-full h-full items-center justify-center text-white"
					style={{
						backgroundImage: `url(http://${host}/images/applied.png)`,
						backgroundSize: '100% 100%',
						fontFamily: '"Satoshi"',
					}}
				>
					<div tw="absolute top-3 inset-0 justify-end flex p-4">
						<img src="https://www.hack49.com/images/logo-horizontal.png" width="150px" height="51px" />
					</div>
					<div tw="absolute h-full text-white inset-0 px-12 flex flex-col text-white items-start justify-center">
						<h1 tw="text-7xl tracking-tighter font-bold">Just</h1>
						<h1 tw="text-7xl -mt-5 tracking-tighter font-bold">Applied</h1>
						<p tw="text-2xl font-bold -mt-3">Oct. 19 - Oct. 21 • hack49.com</p>
						{code && (
							<p tw="text-2xl font-bold flex flex-wrap -mt-3">
								<span>Use My Referral Code:</span>
								<span tw="text-indigo-500 ml-1 text-2xl font-bold">{code}</span>
							</p>
						)}
					</div>
				</div>
			),
			{
				width: 500,
				height: 500,
				fonts: [
					{
						name: 'Typewriter',
						data: fontData,
						style: 'normal',
					},
				],
			}
		);
	} else if (mode === 'accepted') {
		return new ImageResponse(
			(
				<div
					tw="flex flex-col w-full h-full items-center justify-center text-white"
					style={{
						backgroundImage: `url(http://${host}/images/accepted.png)`,
						backgroundSize: '100% 100%',
						fontFamily: '"Satoshi"',
					}}
				>
					<div tw="absolute top-3 inset-0 justify-end flex p-4">
						<img src="https://www.hack49.com/images/logo-horizontal.png" width="150px" height="51px" />
					</div>
					<div tw="absolute h-full text-white inset-0 px-12 flex flex-col text-white items-start justify-center">
						<h1 tw="text-7xl tracking-tighter font-bold">I Got In! 🎉</h1>
						<p tw="text-2xl font-bold -mt-3">Oct. 19 - Oct. 21 • hack49.com</p>
						{code && (
							<p tw="text-2xl font-bold flex flex-wrap -mt-3">
								<span>Use My Referral Code:</span>
								<span tw="text-indigo-500 ml-1 text-2xl font-bold">{code}</span>
							</p>
						)}
					</div>
				</div>
			),
			{
				width: 500,
				height: 500,
				fonts: [
					{
						name: 'Typewriter',
						data: fontData,
						style: 'normal',
					},
				],
			}
		);
	}
}