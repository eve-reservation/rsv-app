import { useState } from "react";
import { MapPin, Loader2, AlertCircle } from "lucide-react";

interface LocationData {
	latitude: number;
	longitude: number;
	accuracy: number;
	timestamp: number;
}

interface IPLocationData {
	city: string;
	region: string;
	country: string;
	latitude: number;
	longitude: number;
}

export default function LocationTracker() {
	const [location, setLocation] = useState<LocationData | null>(null);
	const [ipLocation, setIpLocation] = useState<IPLocationData | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [method, setMethod] = useState<"gps" | "ip" | null>(null);

	const getGPSLocation = () => {
		setLoading(true);
		setError(null);
		setMethod("gps");

		if (!("geolocation" in navigator)) {
			setError("Geolocation is not supported by your browser");
			setLoading(false);
			return;
		}

		navigator.geolocation.getCurrentPosition(
			(position) => {
				setLocation({
					latitude: position.coords.latitude,
					longitude: position.coords.longitude,
					accuracy: position.coords.accuracy,
					timestamp: position.timestamp,
				});
				setLoading(false);
			},
			(err) => {
				setError(`Error: ${err.message}`);
				setLoading(false);
			},
			{
				enableHighAccuracy: true,
				timeout: 10000,
				maximumAge: 0,
			},
		);
	};

	const getIPLocation = async () => {
		setLoading(true);
		setError(null);
		setMethod("ip");

		try {
			const response = await fetch("https://ipapi.co/json/");
			if (!response.ok) throw new Error("Failed to fetch IP location");

			const data = await response.json();
			setIpLocation({
				city: data.city,
				region: data.region,
				country: data.country_name,
				latitude: data.latitude,
				longitude: data.longitude,
			});
			setLoading(false);
		} catch (err) {
			setError("Failed to get IP-based location");
			setLoading(false);
		}
	};

	const formatDate = (timestamp: number) => {
		return new Date(timestamp).toLocaleString();
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-8">
			<div className="max-w-2xl mx-auto">
				<div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
					{/* Header */}
					<div className="text-center mb-8">
						<div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
							<MapPin className="w-8 h-8 text-indigo-600" />
						</div>
						<h1 className="text-3xl font-bold text-gray-900 mb-2">Location Tracker</h1>
						<p className="text-gray-600">
							Get your current location using GPS or IP detection
						</p>
					</div>

					{/* Buttons */}
					<div className="flex flex-col sm:flex-row gap-4 mb-8">
						<button
							onClick={getGPSLocation}
							disabled={loading}
							className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2">
							{loading && method === "gps" ? (
								<>
									<Loader2 className="w-5 h-5 animate-spin" />
									Getting GPS...
								</>
							) : (
								<>
									<MapPin className="w-5 h-5" />
									GPS Location
								</>
							)}
						</button>

						<button
							onClick={getIPLocation}
							disabled={loading}
							className="flex-1 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2">
							{loading && method === "ip" ? (
								<>
									<Loader2 className="w-5 h-5 animate-spin" />
									Getting IP...
								</>
							) : (
								"IP Location"
							)}
						</button>
					</div>

					{/* Error Message */}
					{error && (
						<div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
							<AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
							<div>
								<h3 className="font-semibold text-red-900 mb-1">Error</h3>
								<p className="text-red-700 text-sm">{error}</p>
							</div>
						</div>
					)}

					{/* GPS Location Display */}
					{location && method === "gps" && (
						<div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-6 border border-indigo-100">
							<h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
								<MapPin className="w-5 h-5 text-indigo-600" />
								GPS Location
							</h2>
							<div className="space-y-3">
								<div className="flex justify-between items-center">
									<span className="text-gray-600 font-medium">Latitude:</span>
									<span className="text-gray-900 font-mono">
										{location.latitude.toFixed(6)}°
									</span>
								</div>
								<div className="flex justify-between items-center">
									<span className="text-gray-600 font-medium">Longitude:</span>
									<span className="text-gray-900 font-mono">
										{location.longitude.toFixed(6)}°
									</span>
								</div>
								<div className="flex justify-between items-center">
									<span className="text-gray-600 font-medium">Accuracy:</span>
									<span className="text-gray-900">
										±{Math.round(location.accuracy)}m
									</span>
								</div>
								<div className="flex justify-between items-center">
									<span className="text-gray-600 font-medium">Time:</span>
									<span className="text-gray-900 text-sm">
										{formatDate(location.timestamp)}
									</span>
								</div>
							</div>

							{/* Map Link */}
							<a
								href={`https://www.google.com/maps?q=${location.latitude},${location.longitude}`}
								target="_blank"
								rel="noopener noreferrer"
								className="mt-4 block w-full bg-indigo-600 hover:bg-indigo-700 text-white text-center py-2 px-4 rounded-lg transition-colors duration-200">
								View on Google Maps
							</a>
						</div>
					)}

					{/* IP Location Display */}
					{ipLocation && method === "ip" && (
						<div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-100">
							<h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
								<MapPin className="w-5 h-5 text-emerald-600" />
								IP-Based Location
							</h2>
							<div className="space-y-3">
								<div className="flex justify-between items-center">
									<span className="text-gray-600 font-medium">City:</span>
									<span className="text-gray-900">{ipLocation.city}</span>
								</div>
								<div className="flex justify-between items-center">
									<span className="text-gray-600 font-medium">Region:</span>
									<span className="text-gray-900">{ipLocation.region}</span>
								</div>
								<div className="flex justify-between items-center">
									<span className="text-gray-600 font-medium">Country:</span>
									<span className="text-gray-900">{ipLocation.country}</span>
								</div>
								<div className="flex justify-between items-center">
									<span className="text-gray-600 font-medium">Latitude:</span>
									<span className="text-gray-900 font-mono">
										{ipLocation.latitude.toFixed(6)}°
									</span>
								</div>
								<div className="flex justify-between items-center">
									<span className="text-gray-600 font-medium">Longitude:</span>
									<span className="text-gray-900 font-mono">
										{ipLocation.longitude.toFixed(6)}°
									</span>
								</div>
							</div>

							{/* Map Link */}
							<a
								href={`https://www.google.com/maps?q=${ipLocation.latitude},${ipLocation.longitude}`}
								target="_blank"
								rel="noopener noreferrer"
								className="mt-4 block w-full bg-emerald-600 hover:bg-emerald-700 text-white text-center py-2 px-4 rounded-lg transition-colors duration-200">
								View on Google Maps
							</a>
						</div>
					)}

					{/* Info Box */}
					{!location && !ipLocation && !error && (
						<div className="bg-gray-50 rounded-lg p-6 text-center">
							<p className="text-gray-600">
								Click a button above to get your location
							</p>
							<div className="mt-4 text-sm text-gray-500 space-y-2">
								<p>
									<strong>GPS Location:</strong> Most accurate, requires
									permission
								</p>
								<p>
									<strong>IP Location:</strong> Less accurate, no permission
									needed
								</p>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
