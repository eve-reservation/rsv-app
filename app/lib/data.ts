export interface Facility {
	id: string;
	name: string;
	type: string;
	location: string;
	price: number;
	priceUnit: string;
	capacity: number;
	rating: number;
	reviewCount: number;
	images: string[]; // ← now real public URLs
	amenities: string[];
	description: string;
	available: boolean;
}

export interface Category {
	id: string;
	name: string;
	icon: string;
	count: number;
}

export const categories: Category[] = [
	{ id: "hotel-rooms", name: "Hotel Rooms", icon: "hotel", count: 124 },
	{ id: "conference-rooms", name: "Conference Rooms", icon: "presentation", count: 89 },
	{ id: "sports-courts", name: "Sports Courts", icon: "basketball", count: 56 },
	{ id: "ballrooms", name: "Ballrooms", icon: "party", count: 34 },
	{ id: "studios", name: "Studios", icon: "camera", count: 78 },
	{ id: "coworking", name: "Coworking", icon: "laptop", count: 112 },
];

export const facilities: Facility[] = [
	{
		id: "1",
		name: "Skyline Executive Suite",
		type: "Hotel Rooms",
		location: "Manhattan, New York",
		price: 289,
		priceUnit: "night",
		capacity: 2,
		rating: 4.9,
		reviewCount: 128,
		images: [
			"https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&h=800&fit=crop",
			"https://images.unsplash.com/photo-1618778616585-6e8be02ed7f4?w=1200&h=800&fit=crop",
			"https://images.unsplash.com/photo-1596394516093-50128827c287?w=1200&h=800&fit=crop",
		],
		amenities: ["WiFi", "TV", "Mini Bar", "Room Service", "City View"],
		description:
			"Experience luxury living with breathtaking city views from our premium executive suite. Features king-size bed, modern amenities, and 24/7 concierge service.",
		available: true,
	},
	{
		id: "2",
		name: "Innovation Hub Conference Room",
		type: "Conference Rooms",
		location: "Financial District, San Francisco",
		price: 150,
		priceUnit: "hour",
		capacity: 20,
		rating: 4.8,
		reviewCount: 89,
		images: [
			"https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=800&fit=crop",
			"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&h=800&fit=crop",
			"https://images.unsplash.com/photo-1505373877841-8d25f771e224?w=1200&h=800&fit=crop",
		],
		amenities: ["WiFi", "Projector", "Whiteboard", "Video Conferencing", "Catering Available"],
		description:
			"State-of-the-art conference room equipped with the latest technology for your important meetings and presentations.",
		available: true,
	},
	{
		id: "3",
		name: "Championship Basketball Court",
		type: "Sports Courts",
		location: "Brooklyn, New York",
		price: 200,
		priceUnit: "hour",
		capacity: 30,
		rating: 4.7,
		reviewCount: 56,
		images: [
			"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&h=800&fit=crop",
			"https://images.unsplash.com/photo-1622269920059-5f4e28d3e5c9?w=1200&h=800&fit=crop",
			"https://images.unsplash.com/photo-1574629810360-7ef3097c9756?w=1200&h=800&fit=crop",
		],
		amenities: ["Locker Rooms", "Showers", "Equipment Rental", "Scoreboard", "Bleachers"],
		description:
			"Professional-grade indoor basketball court perfect for games, practice, or tournaments. Full-size court with premium flooring.",
		available: true,
	},
	{
		id: "4",
		name: "Grand Crystal Ballroom",
		type: "Ballrooms",
		location: "Beverly Hills, Los Angeles",
		price: 2500,
		priceUnit: "event",
		capacity: 300,
		rating: 4.9,
		reviewCount: 42,
		images: [
			"https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1200&h=800&fit=crop",
			"https://images.unsplash.com/photo-1510070112810-d4e9a46d9e91?w=1200&h=800&fit=crop",
			"https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&h=800&fit=crop",
		],
		amenities: ["Catering", "Sound System", "Lighting", "Stage", "Parking"],
		description:
			"Exquisite ballroom with stunning crystal chandeliers, perfect for weddings, galas, and corporate events.",
		available: true,
	},
	{
		id: "5",
		name: "Creative Photo Studio",
		type: "Studios",
		location: "SoHo, New York",
		price: 95,
		priceUnit: "hour",
		capacity: 10,
		rating: 4.8,
		reviewCount: 167,
		images: [
			"https://images.unsplash.com/photo-1517251442717-0b9f2a62d4dc?w=1200&h=800&fit=crop",
			"https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=1200&h=800&fit=crop",
			"https://images.unsplash.com/photo-1513519270727-2c04c94e24e7?w=1200&h=800&fit=crop",
		],
		amenities: ["Lighting Equipment", "Backdrops", "Props", "Changing Room", "WiFi"],
		description:
			"Fully equipped photography studio with professional lighting, multiple backdrops, and all the tools you need for your shoot.",
		available: true,
	},
	{
		id: "6",
		name: "Modern Coworking Space",
		type: "Coworking",
		location: "Austin, Texas",
		price: 35,
		priceUnit: "day",
		capacity: 1,
		rating: 4.6,
		reviewCount: 234,
		images: [
			"https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&h=800&fit=crop",
			"https://images.unsplash.com/photo-1519389951296-5b5485f83d63?w=1200&h=800&fit=crop",
			"https://images.unsplash.com/photo-1527199378920-284c4e2ea9e0?w=1200&h=800&fit=crop",
		],
		amenities: ["WiFi", "Coffee", "Printing", "Phone Booths", "Kitchen"],
		description:
			"Inspiring workspace designed for productivity. Enjoy premium amenities, networking opportunities, and a vibrant community.",
		available: true,
	},
];
