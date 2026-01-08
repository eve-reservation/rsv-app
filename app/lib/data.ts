import { lebronCourt, tennisCourt, badminton } from "@/assets/images/index";

export interface FacilityImage {
	name?: string;
	url: string;
	type: "COVER" | "GALLERY";
}

export interface Facility {
	id: string;
	facilityTypeId?: string;
	identifier?: string;
	displayName: string;
	subtype?: string;
	organizationId?: string | null;
	locationId?: string | null;
	rateTypeId?: string | null;
	attributes?: any;
	spaceType?: string | null;
	rateType?: any;
	metadata: {
		description?: string;
		price: number;
		priceUnit: string;
		maxOccupancy?: number;
		type?: string;
		amenities?: string[];
	};
	status: "AVAILABLE" | "MAINTENANCE" | "BOOKED";
	createdAt?: string;
	updatedAt?: string;
	location?: any;
	filter?: string;
	facilityType?: {
		id?: string;
		name?: string;
		code?: string | null;
		description?: string | null;
		spaceType?: string;
		subtype?: string | null;
		organizationId?: string | null;
		path?: string | null;
		createdAt?: string;
		updatedAt?: string;
	};
	// Optional fields for UI grouping/legacy support
	category?: "sports" | "dining" | "wellness";
	rating?: number;
	reviewCount?: number;
	images: FacilityImage[];
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
		displayName: "Indoor Basketball Court",
		facilityType: { spaceType: "Indoor Athletics" },
		subtype: "Main Gymnasium",
		images: [
			{
				url: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?q=80&w=1000",
				type: "COVER",
			},
		],
		metadata: {
			price: 3000,
			priceUnit: "hour",
			maxOccupancy: 20,
			amenities: ["Hardwood Floor", "Scoreboard", "Bleachers"],
			description: "Full-sized indoor basketball court for games, tournaments, and practice.",
		},
		rating: 4.9,
		reviewCount: 450,
		status: "AVAILABLE",
		category: "sports",
	},
	{
		id: "s7",
		displayName: "Billiards & Table Tennis",
		facilityType: { spaceType: "Indoor Athletics" },
		subtype: "Game Zone",
		images: [
			{
				url: "https://images.unsplash.com/photo-1534405111774-ade5c6e8f02d?q=80&w=1000",
				type: "COVER",
			},
		],
		metadata: {
			price: 250,
			priceUnit: "hour",
			maxOccupancy: 4,
			amenities: ["Billiards Tables", "Table Tennis Tables", "Lounge Area"],
			description: "Recreational area featuring billiards tables and table tennis.",
		},
		rating: 4.5,
		reviewCount: 88,
		status: "AVAILABLE",
		category: "sports",
	},
	{
		id: "s8",
		displayName: "Dance Studio",
		facilityType: { spaceType: "Indoor Athletics" },
		subtype: "Wellness Wing",
		images: [
			{
				url: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=1000",
				type: "COVER",
			},
		],
		metadata: {
			price: 1000,
			priceUnit: "hour",
			maxOccupancy: 15,
			amenities: ["Mirrors", "Sound System", "Wood Flooring"],
			description: "A spacious studio suitable for dance rehearsals, yoga, and aerobics.",
		},
		rating: 4.7,
		reviewCount: 65,
		status: "AVAILABLE",
		category: "sports",
	},
	{
		id: "s9",
		displayName: "Main Gym",
		facilityType: { spaceType: "Fitness" },
		subtype: "Fitness Center",
		images: [
			{
				url: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000",
				type: "COVER",
			},
		],
		metadata: {
			price: 500,
			priceUnit: "day pass",
			maxOccupancy: 30,
			amenities: ["Cardio Machines", "Free Weights", "Trainers Available"],
			description: "Fully equipped gym for all your fitness and strength training needs.",
		},
		rating: 4.8,
		reviewCount: 500,
		status: "AVAILABLE",
		category: "sports",
	},
	{
		id: "s1",
		displayName: "Competition Swimming Pool",
		facilityType: { spaceType: "Aquatics" },
		subtype: "Aquatics Center",
		images: [
			{
				url: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=1000",
				type: "COVER",
			},
			{
				url: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=1000",
				type: "GALLERY",
			},
			{
				url: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=1000",
				type: "GALLERY",
			},
		],
		metadata: {
			price: 200,
			priceUnit: "visit",
			maxOccupancy: 50,
			amenities: ["25-meter Pool", "Children's Pool", "Locker Rooms", "Showers"],
			description:
				"A 25-meter adult competition swimming pool and separate children's pools for recreational and competitive swimming.",
		},
		rating: 4.9,
		reviewCount: 120,
		status: "AVAILABLE",
		category: "sports",
	},
	{
		id: "s2",
		displayName: "Tennis Courts",
		facilityType: { spaceType: "Racquet Sports" },
		subtype: "Sports Complex",
		images: [
			{
				url: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?q=80&w=1000",
				type: "COVER",
			},
		],
		metadata: {
			price: 600,
			priceUnit: "hour",
			maxOccupancy: 4,
			amenities: ["5 Covered Courts", "3 Open Courts", "Night Lighting"],
			description:
				"8 tennis courts available for booking: 5 covered for all-weather play and 3 open courts.",
		},
		rating: 4.8,
		reviewCount: 200,
		status: "AVAILABLE",
		category: "sports",
	},
	{
		id: "s3",
		displayName: "Badminton Hall",
		facilityType: { spaceType: "Racquet Sports" },
		subtype: "Sports Complex",
		images: [
			{
				url: "https://images.unsplash.com/photo-1641352848874-c96659e03144?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				type: "COVER",
			},
		],
		metadata: {
			price: 400,
			priceUnit: "hour",
			maxOccupancy: 4,
			amenities: ["7 Covered Courts", "Non-slip Flooring", "Air Flow System"],
			description:
				"7 covered badminton courts designed for competitive and recreational play.",
		},
		rating: 4.7,
		reviewCount: 150,
		status: "AVAILABLE",
		category: "sports",
	},
	{
		id: "s4",
		displayName: "Squash Courts",
		facilityType: { spaceType: "Racquet Sports" },
		subtype: "Sports Complex",
		images: [
			{
				url: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1000",
				type: "COVER",
			},
		],
		metadata: {
			price: 350,
			priceUnit: "hour",
			maxOccupancy: 2,
			amenities: ["2 Courts", "Glass Back Wall", "Viewing Area"],
			description: "Two professional squash courts available for members and guests.",
		},
		rating: 4.6,
		reviewCount: 45,
		status: "AVAILABLE",
		category: "sports",
	},
	{
		id: "s5",
		displayName: "Bowling Alley",
		facilityType: { spaceType: "Indoor Athletics" },
		subtype: "Recreation Center",
		images: [
			{
				url: "https://images.unsplash.com/photo-1545056453-f0359c3df6db?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				type: "COVER",
			},
		],
		metadata: {
			price: 1500,
			priceUnit: "hour",
			maxOccupancy: 6,
			amenities: ["10 Lanes", "Shoe Rental", "Scoring System"],
			description: "A 10-lane bowling alley perfect for family fun or competitive leagues.",
		},
		rating: 4.8,
		reviewCount: 310,
		status: "AVAILABLE",
		category: "sports",
	},
	{
		id: "s10",
		displayName: "Elorde Muay Thai & Boxing",
		facilityType: { spaceType: "Combat Sports" },
		subtype: "Fitness Center Annex",
		images: [
			{
				url: "https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?q=80&w=1000",
				type: "COVER",
			},
		],
		metadata: {
			price: 600,
			priceUnit: "session",
			maxOccupancy: 12,
			amenities: ["Boxing Ring", "Punching Bags", "Trainers"],
			description: "Specialized area for Muay Thai and boxing training.",
		},
		rating: 4.9,
		reviewCount: 130,
		status: "AVAILABLE",
		category: "sports",
	},
	{
		id: "s11",
		displayName: "Children's Playground",
		facilityType: { spaceType: "Youth" },
		subtype: "Outdoor Garden",
		images: [
			{
				url: "https://images.unsplash.com/photo-1542998966-267924da8af9?q=80&w=1000",
				type: "COVER",
			},
		],
		metadata: {
			price: 0,
			priceUnit: "entry",
			maxOccupancy: 20,
			amenities: ["Slides", "Swings", "Soft Flooring"],
			description: "A dedicated safe and fun playground area for children.",
		},
		rating: 4.7,
		reviewCount: 300,
		status: "AVAILABLE",
		category: "sports",
	},

	// Dining Facilities
	{
		id: "d1",
		displayName: "Daily Dining Room",
		facilityType: { spaceType: "Restaurant" },
		subtype: "Main Clubhouse",
		images: [
			{
				url: "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1000",
				type: "COVER",
			},
		],
		metadata: {
			price: 800,
			priceUnit: "avg meal",
			maxOccupancy: 100,
			amenities: ["Buffet", "A la Carte", "Family Seating"],
			description: "Casual dining room serving breakfast, lunch, and dinner daily.",
		},
		rating: 4.6,
		reviewCount: 450,
		status: "AVAILABLE",
		category: "dining",
	},
	{
		id: "d2",
		displayName: "Shabu-Shabu Restaurant",
		facilityType: { spaceType: "Restaurant" },
		subtype: "East Wing",
		images: [
			{
				url: "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1000",
				type: "COVER",
			},
		],
		metadata: {
			price: 1200,
			priceUnit: "person",
			maxOccupancy: 60,
			amenities: ["Hot Pot", "Private Tables", "Fresh Ingredients"],
			description: "Authentic Shabu-Shabu experience with premium meats and vegetables.",
		},
		rating: 4.8,
		reviewCount: 220,
		status: "AVAILABLE",
		category: "dining",
	},
	{
		id: "d3",
		displayName: "Club Coffee Shop",
		facilityType: { spaceType: "Casual" },
		subtype: "Lobby",
		images: [
			{
				url: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=1000",
				type: "COVER",
			},
		],
		metadata: {
			price: 250,
			priceUnit: "item",
			maxOccupancy: 30,
			amenities: ["Coffee", "Pastries", "WiFi"],
			description: "A cozy spot for coffee, tea, and light snacks.",
		},
		rating: 4.7,
		reviewCount: 330,
		status: "AVAILABLE",
		category: "dining",
	},
	{
		id: "d4",
		displayName: "Bar and Lounge",
		facilityType: { spaceType: "Casual" },
		subtype: "2nd Floor",
		images: [
			{
				url: "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?q=80&w=1000",
				type: "COVER",
			},
		],
		metadata: {
			price: 500,
			priceUnit: "drink",
			maxOccupancy: 50,
			amenities: ["Cocktails", "Music", "Lounge Seating"],
			description: "Relax with a wide selection of beverages in our bar and lounge.",
		},
		rating: 4.6,
		reviewCount: 180,
		status: "AVAILABLE",
		category: "dining",
	},
	{
		id: "d5",
		displayName: "Potato Corner",
		facilityType: { spaceType: "Casual" },
		subtype: "Poolside",
		images: [
			{
				url: "https://images.unsplash.com/photo-1518013431117-e3252b406322?q=80&w=1000",
				type: "COVER",
			},
		],
		metadata: {
			price: 150,
			priceUnit: "item",
			maxOccupancy: 10,
			amenities: ["Flavored Fries", "Quick Snacks"],
			description: "Your favorite flavored fries stall located near the pool.",
		},
		rating: 4.9,
		reviewCount: 600,
		status: "AVAILABLE",
		category: "dining",
	},
	{
		id: "d6",
		displayName: "Grand Banquet Hall",
		facilityType: { spaceType: "Events" },
		subtype: "Main Building",
		images: [
			{
				url: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1000",
				type: "COVER",
			},
		],
		metadata: {
			price: 50000,
			priceUnit: "event",
			maxOccupancy: 300,
			amenities: ["Stage", "Sound System", "Catering Service"],
			description:
				"A large banquet hall perfect for weddings, parties, and corporate events.",
		},
		rating: 4.9,
		reviewCount: 80,
		status: "AVAILABLE",
		category: "dining",
	},

	// Wellness & Social Facilities
	{
		id: "w1",
		displayName: "Function Rooms",
		facilityType: { spaceType: "Function Room" },
		subtype: "Conference Wing",
		images: [
			{
				url: "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?q=80&w=1000",
				type: "COVER",
			},
		],
		metadata: {
			price: 5000,
			priceUnit: "4 hours",
			maxOccupancy: 80,
			amenities: ["Quezon Hall", "Pugad Lawin Hall", "Bagumbayan Hall", "Garden Pavilion"],
			description: "Several air-conditioned halls and pavilions for meetings and gatherings.",
		},
		rating: 4.7,
		reviewCount: 90,
		status: "AVAILABLE",
		category: "wellness",
	},
	{
		id: "w2",
		displayName: "Board Room",
		facilityType: { spaceType: "Meeting Space" },
		subtype: "Business Center",
		images: [
			{
				url: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000",
				type: "COVER",
			},
		],
		metadata: {
			price: 3000,
			priceUnit: "3 hours",
			maxOccupancy: 12,
			amenities: ["Conference Table", "Video Conferencing", "Macario Sakay Room"],
			description: "Dedicated board rooms and smaller function rooms for private meetings.",
		},
		rating: 4.8,
		reviewCount: 40,
		status: "AVAILABLE",
		category: "wellness",
	},
	{
		id: "w3",
		displayName: "Wellness Spa & Sauna",
		facilityType: { spaceType: "Wellness" },
		subtype: "Wellness Center",
		images: [
			{
				url: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1000",
				type: "COVER",
			},
		],
		metadata: {
			price: 1500,
			priceUnit: "session",
			maxOccupancy: 10,
			amenities: ["Sauna", "Massage Room", "Reflexology Clinic"],
			description: "Relax and rejuvenate with our sauna, massage, and reflexology services.",
		},
		rating: 4.9,
		reviewCount: 150,
		status: "AVAILABLE",
		category: "wellness",
	},
	{
		id: "w4",
		displayName: "Beauty Salon & Barber Shop",
		facilityType: { spaceType: "Wellness" },
		subtype: "Arcade",
		images: [
			{
				url: "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1000",
				type: "COVER",
			},
		],
		metadata: {
			price: 500,
			priceUnit: "service",
			maxOccupancy: 8,
			amenities: ["Haircuts", "Styling", "Grooming"],
			description: "Professional beauty salon and barber shop for all your grooming needs.",
		},
		rating: 4.6,
		reviewCount: 110,
		status: "AVAILABLE",
		category: "wellness",
	},
	{
		id: "w5",
		displayName: "Club Library",
		facilityType: { spaceType: "Leisure" },
		subtype: "Quiet Zone",
		images: [
			{
				url: "https://images.unsplash.com/photo-1507842217121-9e9f147d7121?q=80&w=1000",
				type: "COVER",
			},
		],
		metadata: {
			price: 0,
			priceUnit: "entry",
			maxOccupancy: 20,
			amenities: ["Books", "Reading Nooks", "Quiet Atmosphere"],
			description: "A peaceful library for reading and study.",
		},
		rating: 4.8,
		reviewCount: 75,
		status: "AVAILABLE",
		category: "wellness",
	},
	{
		id: "w6",
		displayName: "Game Rooms & Iskor",
		facilityType: { spaceType: "Leisure" },
		subtype: "Recreation Area",
		images: [
			{
				url: "https://images.unsplash.com/photo-1511512578047-923ee9626372?q=80&w=1000",
				type: "COVER",
			},
		],
		metadata: {
			price: 300,
			priceUnit: "hour",
			maxOccupancy: 25,
			amenities: ["2 Game Rooms", "Pro-shop (Iskor)", "Network Neighborhood"],
			description: "Leisure facilities including game rooms and the Iskor pro-shop.",
		},
		rating: 4.7,
		reviewCount: 130,
		status: "AVAILABLE",
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
	subType: string;
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
		subType: "Indoor Basketball Court",
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
		subType: "Tennis Courts",
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
		subType: "Badminton Hall",
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
		subType: "Bowling Alley",
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
		subType: "Competition Swimming Pool",
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

export const mockLandingData = [
	{
		id: "sports-rec",
		name: "Sports & Recreational Facilities",
		facilities: [
			{
				id: "tennis",
				displayName: "Tennis",
				facilityType: { spaceType: "Sports & Recreational Facilities" },
				subtype: "Tennis Complex",
				metadata: {
					description:
						"8 courts in total, consisting of 5 covered and 3 open-air courts.",
					amenities: ["5 Covered Courts", "3 Open Courts", "Night Lighting"],
				},
				rating: 4.8,
				reviewCount: 124,
				images: [
					{
						url: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?q=80&w=1000",
						type: "COVER",
					},
				],
				status: "AVAILABLE",
				category: "sports",
				filter: "subtype:TENNIS",
			},
			{
				id: "badminton",
				displayName: "Badminton",
				facilityType: { spaceType: "Sports & Recreational Facilities" },
				subtype: "Sports Complex",
				metadata: {
					description: "7 covered badminton courts.",
					amenities: ["7 Covered Courts", "Non-slip Flooring"],
				},
				rating: 4.7,
				reviewCount: 89,
				images: [
					{
						url: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=1470",
						type: "COVER",
					},
				],
				status: "AVAILABLE",
				category: "sports",
				filter: "subtype:BADMINTON",
			},
			{
				id: "swimming",
				displayName: "Swimming",
				facilityType: { spaceType: "Sports & Recreational Facilities" },
				subtype: "Aquatics Center",
				metadata: {
					description: "A 25-meter adult competition swimming pool and 2 kiddie pools.",
					amenities: ["25m Lap Pool", "Kiddie Pool", "Lifeguard"],
				},
				rating: 4.9,
				reviewCount: 215,
				images: [
					{
						url: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=1000",
						type: "COVER",
					},
				],
				status: "AVAILABLE",
				category: "sports",
				filter: "subtype:SWIMMING_POOL",
			},
			{
				id: "bowling",
				displayName: "Bowling",
				facilityType: { spaceType: "Sports & Recreational Facilities" },
				subtype: "Recreation Center",
				metadata: {
					description: "A 10-lane ten-pin bowling alley and concourse.",
					amenities: ["10 Lanes", "Shoe Rental", "Pro Shop"],
				},
				rating: 4.6,
				reviewCount: 156,
				images: [
					{
						url: "https://images.unsplash.com/photo-1545056453-f0359c3df6db?q=80&w=1470",
						type: "COVER",
					},
				],
				status: "AVAILABLE",
				category: "sports",
				filter: "subtype:GAME_ROOM",
			},
			{
				id: "pickleball",
				displayName: "Pickleball",
				facilityType: { spaceType: "Sports & Recreational Facilities" },
				subtype: "Outdoor Courts",
				metadata: {
					description: "4 outdoor courts available on a pay-to-play basis.",
					amenities: ["4 Outdoor Courts", "Equipment Rental"],
				},
				rating: 4.5,
				reviewCount: 42,
				images: [
					{
						url: "https://plus.unsplash.com/premium_photo-1683836722606-21013a77d33d?q=80&w=1470",
						type: "COVER",
					},
				],
				status: "AVAILABLE",
				category: "sports",
				filter: "subtype:PICKLEBALL",
			},
			{
				id: "combat-sports",
				displayName: "Combat Sports",
				facilityType: { spaceType: "Sports & Recreational Facilities" },
				subtype: "Fitness Annex",
				metadata: {
					description: "Dedicated space for Elorde Muay Thai and boxing.",
					amenities: ["Boxing Ring", "Punching Bags", "Trainer"],
				},
				rating: 4.9,
				reviewCount: 78,
				images: [
					{
						url: "https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?q=80&w=1000",
						type: "COVER",
					},
				],
				status: "AVAILABLE",
				category: "sports",
				filter: "subtype:OTHER",
			},
			{
				id: "indoor-courts",
				displayName: "Indoor Courts",
				facilityType: { spaceType: "Sports & Recreational Facilities" },
				subtype: "Main Gym",
				metadata: {
					description: "Covered basketball courts and 2 dedicated squash courts.",
					amenities: ["Basketball Court", "Squash Courts", "Air Conditioning"],
				},
				rating: 4.8,
				reviewCount: 310,
				images: [
					{
						url: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?q=80&w=1000",
						type: "COVER",
					},
				],
				status: "AVAILABLE",
				category: "sports",
				filter: "subtype:BASKETBALL",
			},
			{
				id: "others",
				displayName: "Others",
				facilityType: { spaceType: "Sports & Recreational Facilities" },
				subtype: "Recreation Center",
				metadata: {
					description: "Billiard hall, table tennis, and a dance studio.",
					amenities: ["Billiards", "Ping Pong", "Studio Mirrors"],
				},
				rating: 4.4,
				reviewCount: 65,
				images: [
					{
						url: "https://images.unsplash.com/photo-1534405111774-ade5c6e8f02d?q=80&w=1000",
						type: "COVER",
					},
				],
				status: "AVAILABLE",
				category: "sports",
				filter: "subtype:OTHER",
			},
		],
	},
	{
		id: "wellness",
		name: "Wellness & Personal Care",
		facilities: [
			{
				id: "fitness-center",
				displayName: "Fitness Center",
				facilityType: { spaceType: "Wellness & Personal Care" },
				subtype: "Wellness Wing",
				metadata: {
					description: "A fully equipped gym and sauna.",
					amenities: ["Cardio", "Weights", "Sauna"],
				},
				rating: 4.8,
				reviewCount: 450,
				images: [
					{
						url: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000",
						type: "COVER",
					},
				],
				status: "AVAILABLE",
				category: "wellness",
				filter: "subtype:WEIGHT_ROOM",
			},
			{
				id: "massage-therapy",
				displayName: "Massage & Therapy",
				facilityType: { spaceType: "Wellness & Personal Care" },
				subtype: "Spa Center",
				metadata: {
					description: "Includes a massage room and a reflexology clinic.",
					amenities: ["Massage Beds", "Reflexology", "Aromatherapy"],
				},
				rating: 4.9,
				reviewCount: 130,
				images: [
					{
						url: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=1000",
						type: "COVER",
					},
				],
				status: "AVAILABLE",
				category: "wellness",
				filter: "subtype:SPA",
			},
			{
				id: "personal-care",
				displayName: "Personal Care",
				facilityType: { spaceType: "Wellness & Personal Care" },
				subtype: "Arcade",
				metadata: {
					description: "An on-site barber shop and beauty salon.",
					amenities: ["Haircuts", "Manicure/Pedicure"],
				},
				rating: 4.7,
				reviewCount: 95,
				images: [
					{
						url: "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1000",
						type: "COVER",
					},
				],
				status: "AVAILABLE",
				category: "wellness",
				filter: "subtype:OTHER",
			},
		],
	},
	{
		id: "dining-events",
		name: "Dining & Events",
		facilities: [
			{
				id: "venues",
				displayName: "Venues",
				facilityType: { spaceType: "Dining & Events" },
				subtype: "Events Complex",
				metadata: {
					description:
						"Major halls include the Quezon Hall (up to 500 pax), Pugad Lawin Hall, and Bagumbayan Hall.",
					amenities: ["Large Hall", "Audio System", "Stage"],
				},
				rating: 4.8,
				reviewCount: 67,
				images: [
					{
						url: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1000",
						type: "COVER",
					},
				],
				status: "AVAILABLE",
				category: "dining",
				filter: "facilityType.spaceType:ROOM",
			},
			{
				id: "dining-options",
				displayName: "Dining Options",
				facilityType: { spaceType: "Dining & Events" },
				subtype: "Clubhouse",
				metadata: {
					description:
						"Includes a main banquet hall, a daily dining room, a coffee shop, and a bar and lounge.",
					amenities: ["Full Service", "Bar", "Coffee Shop"],
				},
				rating: 4.6,
				reviewCount: 220,
				images: [
					{
						url: "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1000",
						type: "COVER",
					},
				],
				status: "AVAILABLE",
				category: "dining",
				filter: "facilityType.spaceType:DINING",
			},
			{
				id: "food-services",
				displayName: "Food Services",
				facilityType: { spaceType: "Dining & Events" },
				subtype: "Kitchen",
				metadata: {
					description:
						'Offers "Family Meals" for pickup, takeout, or delivery, which are open to non-members.',
					amenities: ["Takeout", "Delivery", "Family Platters"],
				},
				rating: 4.5,
				reviewCount: 150,
				images: [
					{
						url: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1000",
						type: "COVER",
					},
				],
				status: "AVAILABLE",
				category: "dining",
				filter: "facilityType.spaceType:DINING",
			},
		],
	},
];
