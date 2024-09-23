import createGlobe from 'cobe';
import { useEffect, useRef } from 'react';
import latlong from '@/data/latlong.json';
// https://github.com/shuding/cobe
import { useSpring } from 'react-spring';

export default function Cobe({ countries }: { countries: string[] }) {
	const canvasRef = useRef();
	const pointerInteracting = useRef(null);
	const pointerInteractionMovement = useRef(0);
	const [{ r }, api] = useSpring(() => ({
		r: 0,
		config: {
			mass: 1,
			tension: 280,
			friction: 40,
			precision: 0.001,
		},
	}));
	const getCountries = () => {
		const coords = countries.map((country) => {
			console.log(country);
			const bro = latlong.ref_country_codes.filter((c) => c.alpha2 === country)[0];
			console.log(bro);
			if (!bro) return;
			return { location: [bro.latitude, bro.longitude], size: 0.1 };
		});
		coords.push({ location: [49, 74.006], size: 0.1 });

		// filter out undefined
		const filtered = coords.filter((item) => item !== undefined);
		console.log(filtered);
		return filtered;
	};
	useEffect(() => {
		let phi = 0;
		let width = 0;
		const onResize = () => canvasRef.current && (width = canvasRef.current.offsetWidth);
		window.addEventListener('resize', onResize);
		onResize();
		const filtered = getCountries();
		console.log(filtered);

		const globe = createGlobe(canvasRef.current, {
			devicePixelRatio: 2,
			width: 900 * 2,
			height: 900 * 2,
			phi: 0,
			theta: 0,
			dark: 1,
			diffuse: 1.2,
			mapSamples: 16000,
			mapBrightness: 6,
			baseColor: [0.388, 0.4, 0.945],
			markerColor: [0.1, 0.8, 1],
			glowColor: [1, 1, 1],
			markers: [...filtered],
			onRender: (state) => {
				// This prevents rotation while dragging
				if (!pointerInteracting.current) {
					// Called on every animation frame.
					// `state` will be an empty object, return updated params.
					phi += 0.005;
				}
				state.phi = phi + r.get();
				state.width = width * 2;
				state.height = width * 2;
			},
		});

		return () => {
			globe.destroy();
		};
	}, [countries]);

	return (
		<canvas
			onPointerDown={(e) => {
				pointerInteracting.current = e.clientX - pointerInteractionMovement.current;
				canvasRef.current.style.cursor = 'grabbing';
			}}
			onPointerUp={() => {
				pointerInteracting.current = null;
				canvasRef.current.style.cursor = 'grab';
			}}
			onPointerOut={() => {
				pointerInteracting.current = null;
				canvasRef.current.style.cursor = 'grab';
			}}
			onMouseMove={(e) => {
				if (pointerInteracting.current !== null) {
					const delta = e.clientX - pointerInteracting.current;
					pointerInteractionMovement.current = delta;
					api.start({
						r: delta / 200,
					});
				}
			}}
			onTouchMove={(e) => {
				if (pointerInteracting.current !== null && e.touches[0]) {
					const delta = e.touches[0].clientX - pointerInteracting.current;
					pointerInteractionMovement.current = delta;
					api.start({
						r: delta / 100,
					});
				}
			}}
			ref={canvasRef}
			style={{ width: 900, height: 900, maxWidth: '100%', aspectRatio: 1 }}
		/>
	);
}
