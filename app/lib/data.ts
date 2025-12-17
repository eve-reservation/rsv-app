import {
	lebronCourt,
	tennisCourt,
	futsalCourt,
	beachCourt,
	badminton,
	cebuCityHoops,
	lawnTennis,
} from "@/assets/images/index";

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
	images: string[];
	amenities: string[];
	description: string;
	available: boolean;
	category: "sports" | "dining" | "wellness";
}

export interface Category {
	id: string;
	name: string;
	icon: string;
	count: number;
}

export const categories: Category[] = [
	{ id: "basketball", name: "Basketball", icon: "basketball", count: 8 },
	{ id: "tennis", name: "Tennis", icon: "tennis", count: 12 },
	{ id: "futsal", name: "Futsal", icon: "football", count: 6 },
	{ id: "volleyball", name: "Volleyball", icon: "volleyball", count: 5 },
	{ id: "badminton", name: "Badminton", icon: "badminton", count: 10 },
	{ id: "baseball", name: "Baseball", icon: "baseball", count: 4 },
	{ id: "billiards", name: "Billiards", icon: "billiard", count: 7 },
	{ id: "bowling", name: "Bowling", icon: "bowling", count: 3 },
	{ id: "fitness", name: "Fitness", icon: "fitness", count: 15 },
	{ id: "golf", name: "Golf", icon: "golf", count: 2 },
	{ id: "rugby", name: "Rugby", icon: "rugby", count: 3 },
	{ id: "pickleball", name: "Pickleball", icon: "pickleball", count: 5 },
	{ id: "dining", name: "Dining", icon: "dining", count: 1 },
	{ id: "function-hall", name: "Function Hall", icon: "function-hall", count: 1 },
	{ id: "spa", name: "Spa", icon: "spa", count: 2 },
	{ id: "wellness", name: "Wellness", icon: "wellness", count: 1 },
	{ id: "bar-lounge", name: "Bar & Lounge", icon: "bar-lounge", count: 1 },
];

export const facilities: Facility[] = [
	{
		id: "1",
		name: "BGC Full Court",
		type: "Basketball",
		location: "Taguig, Metro Manila",
		price: 4500,
		priceUnit: "hour",
		capacity: 15,
		rating: 4.8,
		reviewCount: 154,
		images: [
			"https://images.unsplash.com/photo-1504450758481-7338eba7524a?q=80&w=1000&auto=format&fit=crop",
			"https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1000&auto=format&fit=crop",
			"https://images.unsplash.com/photo-1504450758481-7338eba7524a?q=80&w=1000&auto=format&fit=crop",
			"https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1000&auto=format&fit=crop",
			"https://images.unsplash.com/photo-1504450758481-7338eba7524a?q=80&w=1000&auto=format&fit=crop",
		],
		amenities: ["Locker Rooms", "Showers", "Scoreboard", "Bleachers"],
		description:
			"A full-sized indoor basketball court in the heart of BGC, perfect for leagues and pickup games. Features hardwood floors and adjustable hoops.",
		available: true,
		category: "sports",
	},
	{
		id: "2",
		name: "Makati Tennis Club",
		type: "Tennis",
		location: "Makati, Metro Manila",
		price: 2500,
		priceUnit: "hour",
		capacity: 4,
		rating: 4.7,
		reviewCount: 212,
		images: [
			"https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?q=80&w=1000&auto=format&fit=crop",
			"https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?q=80&w=1000&auto=format&fit=crop",
		],
		amenities: ["Clay Courts", "Night Lighting", "Equipment Rental", "Pro Shop"],
		description:
			"Enjoy a match in our well-maintained clay tennis courts in Makati. Available day and night.",
		available: true,
		category: "sports",
	},
	{
		id: "3",
		name: "Ayala Alabang Futsal Pitch",
		type: "Futsal",
		location: "Muntinlupa, Metro Manila",
		price: 5500,
		priceUnit: "hour",
		capacity: 12,
		rating: 4.9,
		reviewCount: 98,
		images: [
			"https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1000&auto=format&fit=crop",
		],
		amenities: ["Turf Field", "Goals", "Night Lighting"],
		description:
			"A top-quality futsal pitch in Ayala Alabang, perfect for competitive matches or casual games.",
		available: false,
		category: "sports",
	},
	{
		id: "4",
		name: "La Union Beach Volleyball",
		type: "Volleyball",
		location: "San Juan, La Union",
		price: 1800,
		priceUnit: "day",
		capacity: 12,
		rating: 4.8,
		reviewCount: 305,
		images: [
			"https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?q=80&w=1000&auto=format&fit=crop",
		],
		amenities: ["Ocean View", "Sand Court", "Nets Provided", "Public Restrooms"],
		description:
			"Classic beach volleyball right on the iconic La Union beach. Rent a court and enjoy the sun and surf.",
		available: true,
		category: "sports",
	},
	{
		id: "5",
		name: "Poblacion Badminton Center",
		type: "Badminton",
		location: "Makati, Metro Manila",
		price: 1500,
		priceUnit: "hour",
		capacity: 6,
		rating: 4.6,
		reviewCount: 88,
		images: [
			"https://images.unsplash.com/photo-1626224583764-847890e0b379?q=80&w=1000&auto=format&fit=crop",
		],
		amenities: ["Multiple Courts", "Equipment Rental", "Locker Rooms", "Vending Machines"],
		description:
			"Spacious indoor hall with multiple badminton courts available for single or group play. All skill levels welcome.",
		available: true,
		category: "sports",
	},
	{
		id: "6",
		name: "Cebu City Hoops",
		type: "Basketball",
		location: "Cebu City, Cebu",
		price: 3500,
		priceUnit: "hour",
		capacity: 10,
		rating: 4.5,
		reviewCount: 120,
		images: [
			"https://images.unsplash.com/photo-1544919978-87f420371602?q=80&w=1000&auto=format&fit=crop",
		],
		amenities: ["Indoor Court", "Glass Backboards", "Electronic Scoreboard"],
		description:
			"A well-maintained indoor court in Cebu City, perfect for practice sessions or competitive games.",
		available: true,
		category: "sports",
	},
	{
		id: "7",
		name: "Davao Lawn Tennis Club",
		type: "Tennis",
		location: "Davao City, Davao del Sur",
		price: 3200,
		priceUnit: "hour",
		capacity: 4,
		rating: 4.9,
		reviewCount: 280,
		images: [
			"https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?q=80&w=1000&auto=format&fit=crop",
		],
		amenities: ["Hard Courts", "Lessons Available", "Cafe"],
		description:
			"Well-maintained tennis courts in Davao City, offering a great environment for your game.",
		available: true,
		category: "sports",
	},
	{
		id: "8",
		name: "Courtside Cafe",
		type: "Dining",
		location: "Taguig, Metro Manila",
		price: 500,
		priceUnit: "person",
		capacity: 50,
		rating: 4.5,
		reviewCount: 45,
		images: [
			"https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1000&auto=format&fit=crop",
		], // Placeholder image
		amenities: ["Free Wifi", "Air Conditioning", "Outdoor Seating"],
		description: "Relax and refuel at our Courtside Cafe with a variety of snacks and drinks.",
		available: true,
		category: "dining",
	},
	{
		id: "9",
		name: "VIP Function Room",
		type: "Function Hall",
		location: "Makati, Metro Manila",
		price: 10000,
		priceUnit: "4 hours",
		capacity: 100,
		rating: 4.9,
		reviewCount: 12,
		images: [
			"https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1000&auto=format&fit=crop",
		], // Placeholder image
		amenities: ["Projector", "Sound System", "Catering Available"],
		description: "Perfect for events and private gatherings.",
		available: true,
		category: "dining",
	},
	{
		id: "10",
		name: "Recovery Spa",
		type: "Spa",
		location: "Quezon City, Metro Manila",
		price: 1500,
		priceUnit: "session",
		capacity: 10,
		rating: 4.8,
		reviewCount: 30,
		images: [
			"https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=1000&auto=format&fit=crop",
		], // Placeholder image
		amenities: ["Massage", "Sauna", "Steam Room"],
		description: "Recover faster with our professional sports massage and spa facilities.",
		available: true,
		category: "wellness",
	},
	{
		id: "11",
		name: "Zen Yoga Studio",
		type: "Wellness",
		location: "BGC, Taguig",
		price: 800,
		priceUnit: "class",
		capacity: 20,
		rating: 4.7,
		reviewCount: 55,
		images: [
			"https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?q=80&w=1000&auto=format&fit=crop",
		], // Placeholder image
		amenities: ["Yoga Mats", "Changing Room", "Water Station"],
		description: "Find your balance and focus in our peaceful yoga studio.",
		available: true,
		category: "wellness",
	},
	{
		id: "12",
		name: "The Locker Room Bar",
		type: "Bar & Lounge",
		location: "Makati, Metro Manila",
		price: 1200,
		priceUnit: "person",
		capacity: 80,
		rating: 4.6,
		reviewCount: 110,
		images: [
			"https://images.unsplash.com/photo-1534405111774-ade5c6e8f02d?q=80&w=1495&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		], // Placeholder image
		amenities: ["Live Sports TV", "Pool Table", "Happy Hour"],
		description: "Catch the game and enjoy drinks with friends.",
		available: true,
		category: "dining",
	},
	{
		id: "13",
		name: "Hydrotherapy Pool",
		type: "Spa",
		location: "Alabang, Muntinlupa",
		price: 2000,
		priceUnit: "session",
		capacity: 8,
		rating: 4.9,
		reviewCount: 25,
		images: [
			"https://images.unsplash.com/photo-1660676694495-5a96866804cb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		], // Placeholder image
		amenities: ["Heated Pool", "Jacuzzi", "Towel Service"],
		description: "Therapeutic water treatments for muscle relaxation.",
		available: true,
		category: "wellness",
	},
];

export interface Deal {
	id: string;
	title: string;
	description: string;
	code: string;
	discount: string;
	image: string;
	validUntil: string;
}

export const deals: Deal[] = [
	{
		id: "summer-promo",
		title: "Summer Hoops Special",
		description: "Get 20% off on all basketball court bookings this summer!",
		code: "SUMMERHOOPS20",
		discount: "20% OFF",
		image: lebronCourt,
		validUntil: "May 31, 2024",
	},
	{
		id: "weekend-smash",
		title: "Weekend Smash",
		description: "Book a badminton court on weekends and get a free hour.",
		code: "BADMINTONWEEKEND",
		discount: "FREE HOUR",
		image: badminton,
		validUntil: "June 30, 2024",
	},
	{
		id: "clay-court-discount",
		title: "Clay Court Experience",
		description: "Experience professional clay courts at a discounted rate.",
		code: "CLAY15",
		discount: "15% OFF",
		image: tennisCourt,
		validUntil: "July 15, 2024",
	},
	{
		id: "summer-promo",
		title: "Summer Hoops Special",
		description: "Get 20% off on all basketball court bookings this summer!",
		code: "SUMMERHOOPS20",
		discount: "20% OFF",
		image: lebronCourt,
		validUntil: "May 31, 2024",
	},
	{
		id: "weekend-smash",
		title: "Weekend Smash",
		description: "Book a badminton court on weekends and get a free hour.",
		code: "BADMINTONWEEKEND",
		discount: "FREE HOUR",
		image: badminton,
		validUntil: "June 30, 2024",
	},
	{
		id: "clay-court-discount",
		title: "Clay Court Experience",
		description: "Experience professional clay courts at a discounted rate.",
		code: "CLAY15",
		discount: "15% OFF",
		image: tennisCourt,
		validUntil: "July 15, 2024",
	},
];

export interface Game {
	id: string;
	name: string;
	type: string;
	location: string;
	pricePerHead: number;
	playersJoined: number;
	maxPlayers: number;
	images: string[];
	date: string;
	category: string;
}

export const games: Game[] = [
	{
		id: "g1",
		name: "Saturday Night Hoops",
		type: "Basketball",
		location: "BGC Full Court",
		pricePerHead: 200,
		playersJoined: 8,
		maxPlayers: 15,
		images: [lebronCourt],
		date: "Tomorrow, 7:00 PM",
		category: "sports",
	},
	{
		id: "g2",
		name: "Sunday Morning Spikes",
		type: "Volleyball",
		location: "La Union Beach",
		pricePerHead: 150,
		playersJoined: 6,
		maxPlayers: 12,
		images: [beachCourt],
		date: "Sunday, 8:00 AM",
		category: "sports",
	},
	{
		id: "g3",
		name: "Futsal Frenzy",
		type: "Futsal",
		location: "Ayala Alabang",
		pricePerHead: 250,
		playersJoined: 4,
		maxPlayers: 10,
		images: [futsalCourt],
		date: "Tonight, 9:00 PM",
		category: "sports",
	},
	{
		id: "g4",
		name: "Badminton Smash",
		type: "Badminton",
		location: "Poblacion Center",
		pricePerHead: 180,
		playersJoined: 2,
		maxPlayers: 4,
		images: [badminton],
		date: "Sunday, 2:00 PM",
		category: "sports",
	},
	{
		id: "g5",
		name: "Tennis Doubles",
		type: "Tennis",
		location: "Makati Club",
		pricePerHead: 300,
		playersJoined: 2,
		maxPlayers: 4,
		images: [tennisCourt],
		date: "Saturday, 4:00 PM",
		category: "sports",
	},
];
