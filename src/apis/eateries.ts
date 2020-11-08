export interface EateriesResponse {
	status: string;
	data: EateryData;
	message: string;
	meta: Meta;
}

export interface EateryData {
	eateries: Eatery[];
}

export interface Eatery {
	id: number;
	slug: string;
	name: string;
	nameshort: string;
	about: string;
	aboutshort: string;
	nutrition: null | string;
	cornellDining: boolean;
	opHoursCalc: string;
	opHoursCalcDescr: string;
	opHoursDescr: null | string;
	googleCalendarID: string;
	onlineOrdering: boolean;
	onlineOrderUrl: null | string;
	contactPhone: null | string;
	contactEmail: null | string;
	serviceUnitID: number | null;
	campusArea: CampusArea;
	latitude: number;
	longitude: number;
	location: string;
	coordinates: Coordinates;
	operatingHours: OperatingHour[];
	eateryTypes: EateryType[];
	diningCuisines: DiningCuisine[];
	payMethods: PayMethod[];
	diningItems: DiningItem[];
	announcements: unknown[];
	icon: string;
}

export interface EateryType {
	descr: string;
	descrshort: string;
}

export interface CampusArea {
	descr: string;
	descrshort: string;
}

export interface PayMethod {
	descr: string;
	descrshort: string;
}


export interface Coordinates {
	latitude: number;
	longitude: number;
}

export interface DiningCuisine {
	name: string;
	nameshort: string;
	descr: null | string;
}

export interface DiningItem {
	descr: string;
	category: string;
	item: string;
	healthy: boolean;
	showCategory: boolean;
}

export interface OperatingHour {
	date: string;
	status: string;
	events: Event[];
}

export interface Event {
	descr: Descr;
	startTimestamp: number;
	endTimestamp: number;
	start: string;
	end: string;
	menu: Menu[];
	calSummary: string;
}

export enum Descr {
	Breakfast = "Breakfast",
	Brunch = "Brunch",
	Dinner = "Dinner",
	Lunch = "Lunch",
	Open = "Open",
}

export interface Menu {
	category: Category;
	sortIdx: number;
	items: Item[];
}

export enum Category {
	BakedGoods = "Baked Goods",
	BeverageStation = "Beverage Station",
	Beverages = "Beverages",
	BreakfastStation = "Breakfast Station",
	CerealBagelBar = "Cereal/Bagel Bar",
	ChefInspiredPackagedMealsToGo = "Chef Inspired Packaged Meals To Go",
	DessertStation = "Dessert Station",
	EntreesTakeUsHome = "Entrees - Take Us Home",
	GrillStation = "Grill Station",
	HotTraditionalStationEntrees = "Hot Traditional Station - Entrees",
	HotTraditionalStationSides = "Hot Traditional Station - Sides",
	SaladBarStation = "Salad Bar Station",
	Sides = "Sides",
	SpecialMenuEvent = "Special Menu Event",
	SpecialtySandwiches = "Specialty Sandwiches",
	SpecialtyStation = "Specialty Station",
}

export interface Item {
	item: string;
	healthy: boolean;
	sortIdx: number;
}

export interface Meta {
	copyright: string;
	responseDttm: string;
}

export interface PaymentMethodShort {
	name: string
	color: string
}

export async function getList(): Promise<EateriesResponse> {
	const resp = await fetch("https://now.dining.cornell.edu/api/1.0/dining/eateries.json");
	const data: EateriesResponse = await resp.json();

	return data;
}

export function getPaymentMethodShort(paymentMethod: string): PaymentMethodShort {
	switch (paymentMethod) {
		case "Meal Plan - Debit":
			return {
				name: "BRB",
				color: "danger"
			};
		case "Meal Plan - Swipe":
			return {
				name: "Swipe",
				color: "primary"
			};
		case "Cornell Card":
			return {
				name: "CC",
				color: "warning"
			};
		case "Major Credit Cards":
			return {
				name: "Credit",
				color: "info"
			};
		case "Mobile Payments":
			return {
				name: "Tap",
				color: "info"
			};
		case "Cash":
			return {
				name: "Cash",
				color: "success"
			};
		default:
			return {
				name: paymentMethod,
				color: "dark"
			};
	}
}

export function isOpen(eatery: Eatery): boolean {
	return eatery.operatingHours.filter((hours) => {
		return hours.events.filter(isCurrent).length != 0;
	}).length != 0;
}

export function isCurrent(hour: Event): boolean {
	const now = new Date();
	return hour.startTimestamp * 1000 < now.getTime() && hour.endTimestamp * 1000 > now.getTime();
}