export default function Loader() {
	return (
		<div className="relative w-10 h-10">
			{/* First dot */}
			<div className="absolute top-0 left-0 -mt-2 -ml-2 w-4 h-4 bg-[#2a1ea4] animate-orbit [animation:orbit_2s_infinite,spin-half_0.5s_infinite]" />

			{/* Second dot */}
			<div className="absolute top-0 left-0 -mt-2 -ml-2 w-4 h-4 bg-[#c32e32] [animation:orbit_2s_-1s_infinite,spin-half_0.5s_0s_infinite]" />
		</div>
	);
}
