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
	{ id: "sports", name: "Sports Facilities", icon: "basketball", count: 12 },
	{ id: "dining", name: "Dining", icon: "dining", count: 6 },
	{ id: "wellness", name: "Wellness & Others", icon: "wellness", count: 11 },
];

export const facilities: Facility[] = [
	// Sports Facilities
	{
		id: "s6",
		name: "Indoor Basketball Court",
		type: "Indoor Athletics",
		location: "Main Gymnasium",
		price: 3000,
		priceUnit: "hour",
		capacity: 20,
		rating: 4.9,
		reviewCount: 450,
		images: ["https://images.unsplash.com/photo-1504450758481-7338eba7524a?q=80&w=1000"],
		amenities: ["Hardwood Floor", "Scoreboard", "Bleachers"],
		description: "Full-sized indoor basketball court for games, tournaments, and practice.",
		available: true,
		category: "sports",
	},
	{
		id: "s7",
		name: "Billiards & Table Tennis",
		type: "Indoor Athletics",
		location: "Game Zone",
		price: 250,
		priceUnit: "hour",
		capacity: 4,
		rating: 4.5,
		reviewCount: 88,
		images: ["https://images.unsplash.com/photo-1534405111774-ade5c6e8f02d?q=80&w=1000"],
		amenities: ["Billiards Tables", "Table Tennis Tables", "Lounge Area"],
		description: "Recreational area featuring billiards tables and table tennis.",
		available: true,
		category: "sports",
	},
	{
		id: "s8",
		name: "Dance Studio",
		type: "Indoor Athletics",
		location: "Wellness Wing",
		price: 1000,
		priceUnit: "hour",
		capacity: 15,
		rating: 4.7,
		reviewCount: 65,
		images: ["https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=1000"],
		amenities: ["Mirrors", "Sound System", "Wood Flooring"],
		description: "A spacious studio suitable for dance rehearsals, yoga, and aerobics.",
		available: true,
		category: "sports",
	},
	{
		id: "s9",
		name: "Main Gym",
		type: "Fitness",
		location: "Fitness Center",
		price: 500,
		priceUnit: "day pass",
		capacity: 30,
		rating: 4.8,
		reviewCount: 500,
		images: ["https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000"],
		amenities: ["Cardio Machines", "Free Weights", "Trainers Available"],
		description: "Fully equipped gym for all your fitness and strength training needs.",
		available: true,
		category: "sports",
	},
	{
		id: "s1",
		name: "Competition Swimming Pool",
		type: "Aquatics",
		location: "Aquatics Center",
		price: 200,
		priceUnit: "visit",
		capacity: 50,
		rating: 4.9,
		reviewCount: 120,
		images: [
			"https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=1000",
			"https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=1000",
			"https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=1000",
		],
		amenities: ["25-meter Pool", "Children's Pool", "Locker Rooms", "Showers"],
		description:
			"A 25-meter adult competition swimming pool and separate children's pools for recreational and competitive swimming.",
		available: true,
		category: "sports",
	},
	{
		id: "s2",
		name: "Tennis Courts",
		type: "Racquet Sports",
		location: "Sports Complex",
		price: 600,
		priceUnit: "hour",
		capacity: 4,
		rating: 4.8,
		reviewCount: 200,
		images: ["https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?q=80&w=1000"],
		amenities: ["5 Covered Courts", "3 Open Courts", "Night Lighting"],
		description:
			"8 tennis courts available for booking: 5 covered for all-weather play and 3 open courts.",
		available: true,
		category: "sports",
	},
	{
		id: "s3",
		name: "Badminton Hall",
		type: "Racquet Sports",
		location: "Sports Complex",
		price: 400,
		priceUnit: "hour",
		capacity: 4,
		rating: 4.7,
		reviewCount: 150,
		images: [
			"https://images.unsplash.com/photo-1641352848874-c96659e03144?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		],
		amenities: ["7 Covered Courts", "Non-slip Flooring", "Air Flow System"],
		description: "7 covered badminton courts designed for competitive and recreational play.",
		available: true,
		category: "sports",
	},
	{
		id: "s4",
		name: "Squash Courts",
		type: "Racquet Sports",
		location: "Sports Complex",
		price: 350,
		priceUnit: "hour",
		capacity: 2,
		rating: 4.6,
		reviewCount: 45,
		images: [
			"https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1000", // Placeholder (yoga/gym generic if specific squash not found easily, but let's try generic indoor sport)
		],
		amenities: ["2 Courts", "Glass Back Wall", "Viewing Area"],
		description: "Two professional squash courts available for members and guests.",
		available: true,
		category: "sports",
	},
	{
		id: "s5",
		name: "Bowling Alley",
		type: "Indoor Athletics",
		location: "Recreation Center",
		price: 1500,
		priceUnit: "hour",
		capacity: 6,
		rating: 4.8,
		reviewCount: 310,
		images: [
			"https://images.unsplash.com/photo-1545056453-f0359c3df6db?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		],
		amenities: ["10 Lanes", "Shoe Rental", "Scoring System"],
		description: "A 10-lane bowling alley perfect for family fun or competitive leagues.",
		available: true,
		category: "sports",
	},

	{
		id: "s10",
		name: "Elorde Muay Thai & Boxing",
		type: "Combat Sports",
		location: "Fitness Center Annex",
		price: 600,
		priceUnit: "session",
		capacity: 12,
		rating: 4.9,
		reviewCount: 130,
		images: ["https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?q=80&w=1000"],
		amenities: ["Boxing Ring", "Punching Bags", "Trainers"],
		description: "Specialized area for Muay Thai and boxing training.",
		available: true,
		category: "sports",
	},
	{
		id: "s11",
		name: "Children's Playground",
		type: "Youth",
		location: "Outdoor Garden",
		price: 0,
		priceUnit: "entry",
		capacity: 20,
		rating: 4.7,
		reviewCount: 300,
		images: ["https://images.unsplash.com/photo-1542998966-267924da8af9?q=80&w=1000"],
		amenities: ["Slides", "Swings", "Soft Flooring"],
		description: "A dedicated safe and fun playground area for children.",
		available: true,
		category: "sports", // Grouped under sports/recreation as per request structure implications or just keep consistency
	},

	// Dining Facilities
	{
		id: "d1",
		name: "Daily Dining Room",
		type: "Restaurant",
		location: "Main Clubhouse",
		price: 800,
		priceUnit: "avg meal",
		capacity: 100,
		rating: 4.6,
		reviewCount: 450,
		images: ["https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1000"],
		amenities: ["Buffet", "A la Carte", "Family Seating"],
		description: "Casual dining room serving breakfast, lunch, and dinner daily.",
		available: true,
		category: "dining",
	},
	{
		id: "d2",
		name: "Shabu-Shabu Restaurant",
		type: "Restaurant",
		location: "East Wing",
		price: 1200,
		priceUnit: "person",
		capacity: 60,
		rating: 4.8,
		reviewCount: 220,
		images: [
			"https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1000", // Placeholder for restaurant
		],
		amenities: ["Hot Pot", "Private Tables", "Fresh Ingredients"],
		description: "Authentic Shabu-Shabu experience with premium meats and vegetables.",
		available: true,
		category: "dining",
	},
	{
		id: "d3",
		name: "Club Coffee Shop",
		type: "Casual",
		location: "Lobby",
		price: 250,
		priceUnit: "item",
		capacity: 30,
		rating: 4.7,
		reviewCount: 330,
		images: ["https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=1000"],
		amenities: ["Coffee", "Pastries", "WiFi"],
		description: "A cozy spot for coffee, tea, and light snacks.",
		available: true,
		category: "dining",
	},
	{
		id: "d4",
		name: "Bar and Lounge",
		type: "Casual",
		location: "2nd Floor",
		price: 500,
		priceUnit: "drink",
		capacity: 50,
		rating: 4.6,
		reviewCount: 180,
		images: ["https://images.unsplash.com/photo-1572116469696-31de0f17cc34?q=80&w=1000"],
		amenities: ["Cocktails", "Music", "Lounge Seating"],
		description: "Relax with a wide selection of beverages in our bar and lounge.",
		available: true,
		category: "dining",
	},
	{
		id: "d5",
		name: "Potato Corner",
		type: "Casual",
		location: "Poolside",
		price: 150,
		priceUnit: "item",
		capacity: 10,
		rating: 4.9,
		reviewCount: 600,
		images: [
			"https://images.unsplash.com/photo-1518013431117-e3252b406322?q=80&w=1000", // Generic fries
		],
		amenities: ["Flavored Fries", "Quick Snacks"],
		description: "Your favorite flavored fries stall located near the pool.",
		available: true,
		category: "dining",
	},
	{
		id: "d6",
		name: "Grand Banquet Hall",
		type: "Events",
		location: "Main Building",
		price: 50000,
		priceUnit: "event",
		capacity: 300,
		rating: 4.9,
		reviewCount: 80,
		images: ["https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1000"],
		amenities: ["Stage", "Sound System", "Catering Service"],
		description: "A large banquet hall perfect for weddings, parties, and corporate events.",
		available: true,
		category: "dining",
	},

	// Wellness & Social Facilities
	{
		id: "w1",
		name: "Function Rooms",
		type: "Function Room",
		location: "Conference Wing",
		price: 5000,
		priceUnit: "4 hours",
		capacity: 80,
		rating: 4.7,
		reviewCount: 90,
		images: ["https://images.unsplash.com/photo-1431540015161-0bf868a2d407?q=80&w=1000"],
		amenities: ["Quezon Hall", "Pugad Lawin Hall", "Bagumbayan Hall", "Garden Pavilion"],
		description: "Several air-conditioned halls and pavilions for meetings and gatherings.",
		available: true,
		category: "wellness",
	},
	{
		id: "w2",
		name: "Board Room",
		type: "Meeting Space",
		location: "Business Center",
		price: 3000,
		priceUnit: "3 hours",
		capacity: 12,
		rating: 4.8,
		reviewCount: 40,
		images: ["https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000"],
		amenities: ["Conference Table", "Video Conferencing", "Macario Sakay Room"],
		description: "Dedicated board rooms and smaller function rooms for private meetings.",
		available: true,
		category: "wellness",
	},
	{
		id: "w3",
		name: "Wellness Spa & Sauna",
		type: "Wellness",
		location: "Wellness Center",
		price: 1500,
		priceUnit: "session",
		capacity: 10,
		rating: 4.9,
		reviewCount: 150,
		images: ["https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1000"],
		amenities: ["Sauna", "Massage Room", "Reflexology Clinic"],
		description: "Relax and rejuvenate with our sauna, massage, and reflexology services.",
		available: true,
		category: "wellness",
	},
	{
		id: "w4",
		name: "Beauty Salon & Barber Shop",
		type: "Wellness",
		location: "Arcade",
		price: 500,
		priceUnit: "service",
		capacity: 8,
		rating: 4.6,
		reviewCount: 110,
		images: ["https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1000"],
		amenities: ["Haircuts", "Styling", "Grooming"],
		description: "Professional beauty salon and barber shop for all your grooming needs.",
		available: true,
		category: "wellness",
	},
	{
		id: "w5",
		name: "Club Library",
		type: "Leisure",
		location: "Quiet Zone",
		price: 0,
		priceUnit: "entry",
		capacity: 20,
		rating: 4.8,
		reviewCount: 75,
		images: ["https://images.unsplash.com/photo-1507842217121-9e9f147d7121?q=80&w=1000"],
		amenities: ["Books", "Reading Nooks", "Quiet Atmosphere"],
		description: "A peaceful library for reading and study.",
		available: true,
		category: "wellness",
	},
	{
		id: "w6",
		name: "Game Rooms & Iskor",
		type: "Leisure",
		location: "Recreation Area",
		price: 300,
		priceUnit: "hour",
		capacity: 25,
		rating: 4.7,
		reviewCount: 130,
		images: ["https://images.unsplash.com/photo-1511512578047-923ee9626372?q=80&w=1000"],
		amenities: ["2 Game Rooms", "Pro-shop (Iskor)", "Network Neighborhood"],
		description: "Leisure facilities including game rooms and the Iskor pro-shop.",
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

export interface Player {
	id: string;
	name: string;
	avatar: string;
}

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
	players: Player[];
	facilityId: string;
	host: Player;
}

export const games: Game[] = [
	{
		id: "g1",
		name: "Saturday Night Hoops",
		type: "Basketball",
		location: "Indoor Basketball Court",
		pricePerHead: 200,
		playersJoined: 8,
		maxPlayers: 15,
		images: ["https://images.unsplash.com/photo-1504450758481-7338eba7524a?q=80&w=1000"],
		date: "Tomorrow, 7:00 PM",
		category: "sports",
		players: [
			{ id: "p1", name: "John Doe", avatar: "JD" },
			{ id: "p2", name: "Jane Smith", avatar: "JS" },
			{ id: "p3", name: "Mike Johnson", avatar: "MJ" },
			{ id: "p4", name: "Sarah Williams", avatar: "SW" },
			{ id: "p5", name: "Chris Brown", avatar: "CB" },
			{ id: "p6", name: "Patricia Davis", avatar: "PD" },
			{ id: "p7", name: "Robert Miller", avatar: "RM" },
			{ id: "p8", name: "Linda Wilson", avatar: "LW" },
		],
		facilityId: "s6",
		host: { id: "p1", name: "John Doe", avatar: "JD" },
	},
	{
		id: "g2",
		name: "Tennis Doubles",
		type: "Tennis",
		location: "Tennis Courts",
		pricePerHead: 300,
		playersJoined: 2,
		maxPlayers: 4,
		images: ["https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?q=80&w=1000"],
		date: "Saturday, 4:00 PM",
		category: "sports",
		players: [
			{ id: "p18", name: "Paul Robinson", avatar: "PR" },
			{ id: "p19", name: "Lisa Clark", avatar: "LC" },
		],
		facilityId: "s2",
		host: { id: "p18", name: "Paul Robinson", avatar: "PR" },
	},
	{
		id: "g3",
		name: "Badminton Smash",
		type: "Badminton",
		location: "Badminton Hall",
		pricePerHead: 180,
		playersJoined: 2,
		maxPlayers: 4,
		images: [
			"https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		],
		date: "Sunday, 2:00 PM",
		category: "sports",
		players: [
			{ id: "p2", name: "Jane Smith", avatar: "JS" },
			{ id: "p17", name: "Daniel Martinez", avatar: "DM" },
		],
		facilityId: "s3",
		host: { id: "p2", name: "Jane Smith", avatar: "JS" },
	},
	{
		id: "g4",
		name: "Bowling League",
		type: "Bowling",
		location: "Bowling Alley",
		pricePerHead: 500,
		playersJoined: 3,
		maxPlayers: 6,
		images: [
			"https://images.unsplash.com/photo-1545056453-f0359c3df6db?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		],
		date: "Friday, 8:00 PM",
		category: "sports",
		players: [
			{ id: "p3", name: "Mike Johnson", avatar: "MJ" },
			{ id: "p14", name: "Karen Martin", avatar: "KM" },
			{ id: "p15", name: "Thomas Thompson", avatar: "TT" },
		],
		facilityId: "s5",
		host: { id: "p3", name: "Mike Johnson", avatar: "MJ" },
	},
	{
		id: "g5",
		name: "Swim Meet",
		type: "Swimming",
		location: "Competition Swimming Pool",
		pricePerHead: 100,
		playersJoined: 10,
		maxPlayers: 20,
		images: [
			"https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=1000",
			"https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=1000",
		],
		date: "Saturday, 9:00 AM",
		category: "sports",
		players: [
			{ id: "p1", name: "John Doe", avatar: "JD" },
			{ id: "p9", name: "David Anderson", avatar: "DA" },
			{ id: "p10", name: "Jennifer Thomas", avatar: "JT" },
		],
		facilityId: "s1",
		host: { id: "p1", name: "John Doe", avatar: "JD" },
	},
];
