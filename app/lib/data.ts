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
		images: [lebronCourt,lebronCourt,lebronCourt,lebronCourt],
		amenities: ["Locker Rooms", "Showers", "Scoreboard", "Bleachers"],
		description:
			"A full-sized indoor basketball court in the heart of BGC, perfect for leagues and pickup games. Features hardwood floors and adjustable hoops.",
		available: true,
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
		images: [tennisCourt, tennisCourt],
		amenities: ["Clay Courts", "Night Lighting", "Equipment Rental", "Pro Shop"],
		description:
			"Enjoy a match in our well-maintained clay tennis courts in Makati. Available day and night.",
		available: true,
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
		images: [futsalCourt, futsalCourt],
		amenities: ["Turf Field", "Goals", "Night Lighting"],
		description:
			"A top-quality futsal pitch in Ayala Alabang, perfect for competitive matches or casual games.",
		available: false,
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
		images: [beachCourt, beachCourt],
		amenities: ["Ocean View", "Sand Court", "Nets Provided", "Public Restrooms"],
		description:
			"Classic beach volleyball right on the iconic La Union beach. Rent a court and enjoy the sun and surf.",
		available: true,
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
		images: [badminton, badminton],
		amenities: ["Multiple Courts", "Equipment Rental", "Locker Rooms", "Vending Machines"],
		description:
			"Spacious indoor hall with multiple badminton courts available for single or group play. All skill levels welcome.",
		available: true,
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
		images: [cebuCityHoops, cebuCityHoops],
		amenities: ["Indoor Court", "Glass Backboards", "Electronic Scoreboard"],
		description:
			"A well-maintained indoor court in Cebu City, perfect for practice sessions or competitive games.",
		available: true,
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
		images: [lawnTennis, lawnTennis],
		amenities: ["Hard Courts", "Lessons Available", "Cafe"],
		description:
			"Well-maintained tennis courts in Davao City, offering a great environment for your game.",
		available: true,
	},
];
