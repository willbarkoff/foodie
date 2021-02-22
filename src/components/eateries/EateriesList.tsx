import * as React from "react";
import "@creativebulma/bulma-tooltip/dist/bulma-tooltip.min.css";
import * as Eateries from "../../apis/eateries";
import NoResults from "../ui/NoResults";
import Eatery from "./Eatery";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
interface EateriesListProps {
	eateries: Eateries.Eatery[];
}

const createLocationFilter = (loc: string) => {
	return (e: Eateries.Eatery) => e.campusArea.descrshort == loc;
};

const deg2rad = (deg: number) => {
	return deg * (Math.PI / 180);
};

// thanks https://stackoverflow.com/questions/18883601/function-to-calculate-distance-between-two-coordinates
const haversine = (lat1: number, lon1: number, lat2: number, lon2: number) => {
	const R = 6371; // Radius of the earth in km
	const dLat = deg2rad(lat2 - lat1);  // deg2rad below
	const dLon = deg2rad(lon2 - lon1);
	const a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
		Math.sin(dLon / 2) * Math.sin(dLon / 2)
		;
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	const d = R * c; // Distance in km
	return d;
};

const filters: Record<string, (e: Eateries.Eatery) => boolean> = {
	"north": createLocationFilter("North"),
	"west": createLocationFilter("West"),
	"central": createLocationFilter("Central"),
	"open": e => Eateries.isOpen(e),
	"closed": e => !Eateries.isOpen(e),
	"brb": e => e.payMethods.findIndex(pm => pm.descrshort == Eateries.PayMethods.brb) > -1,
	"swipe": e => e.payMethods.findIndex(pm => pm.descrshort == Eateries.PayMethods.swipe) > -1,
	"cornellCard": e => e.payMethods.findIndex(pm => pm.descrshort == Eateries.PayMethods.cornellCard) > -1,
	"creditCard": e => e.payMethods.findIndex(pm => pm.descrshort == Eateries.PayMethods.creditCard) > -1,
	"tap": e => e.payMethods.findIndex(pm => pm.descrshort == Eateries.PayMethods.tap) > -1,
	"cash": e => e.payMethods.findIndex(pm => pm.descrshort == Eateries.PayMethods.cash) > -1
};

const locationFilters = ["north", "west", "central"];
const stateFilters = ["open", "closed"];
const payFilters = ["brb", "swipe", "cornellCard", "creditCard", "tap", "cash"];

const EateriesList: React.FC<EateriesListProps> = ({ eateries }) => {
	const [currentFilterChain, setCurrentFilterChain] = React.useState([] as string[]);
	const [locationFilterValue, setLocationFilterValue] = React.useState("");
	const [stateFilterValue, setStateFilterValue] = React.useState("");
	const [payFilterValue, setPayFilterValue] = React.useState("");
	const [sort, updateSort] = React.useState("openclose");
	const [geolocation, updateGeolocation] = React.useState(null as GeolocationPosition | null);
	const [geoErr, updateGeoErr] = React.useState(null as GeolocationPositionError | null);

	const filtered = eateries.filter(currentFilterChain.map(f => filters[f]).reduce((acc, cv) => {
		return (e: Eateries.Eatery) => {
			if (!acc(e)) {
				return false;
			}
			return cv(e);
		};
	}, () => true));

	if (sort == "closest" && !geolocation && !geoErr) {
		navigator.geolocation.getCurrentPosition((position) => {
			updateGeolocation(position);
			updateGeoErr(null);
		}, (err) => {
			updateGeoErr(err);
		});
	}

	const sorts: Record<string, (a: Eateries.Eatery, b: Eateries.Eatery) => number> = {
		"alphebetical": (a, b) => {
			if (a.name.toLowerCase() < b.name.toLowerCase()) {
				return -1;
			} else if (b.name.toLowerCase() < a.name.toLowerCase()) {
				return 1;
			} else {
				return 0;
			}
		},
		"openclose": (a, b) => (Eateries.isOpen(a) == Eateries.isOpen(b) ? 0 : Eateries.isOpen(a) ? -1 : 1),
		//@ts-expect-error this works and i'm not sure why
		"closest": (a, b) => haversine(a.coordinates.latitude, a.coordinates.longitude, geolocation?.coords.latitude, geolocation?.coords.longitude) - haversine(b.coordinates.latitude, b.coordinates.longitude, geolocation?.coords.latitude, geolocation?.coords.longitude),
	};


	const sorted = filtered.sort(sorts[sort]);

	const updateLocationFilter = (f?: string) => {
		setLocationFilterValue(f || "");

		const filters = currentFilterChain;
		locationFilters.forEach(filter => {
			const index = filters.indexOf(filter);
			if (index > -1) {
				filters.splice(index, 1);
			}
		});

		if (f) {
			filters.push(f);
		}
		setCurrentFilterChain(filters);
	};

	const updateStateFilter = (f?: string) => {
		setStateFilterValue(f || "");

		const filters = currentFilterChain;
		stateFilters.forEach(filter => {
			const index = filters.indexOf(filter);
			if (index > -1) {
				filters.splice(index, 1);
			}
		});

		if (f) {
			filters.push(f);
		}

		setCurrentFilterChain(filters);
	};

	const updatePayFilter = (f?: string) => {
		setPayFilterValue(f || "");

		const filters = currentFilterChain;
		payFilters.forEach(filter => {
			const index = filters.indexOf(filter);
			if (index > -1) {
				filters.splice(index, 1);
			}
		});

		if (f) {
			filters.push(f);
		}

		setCurrentFilterChain(filters);
	};

	return <div>
		<h3 className="filterString is-size-3 block">
			I want to find an eatery on{" "}
			<div className="select is-medium">
				<select onChange={e => updateLocationFilter(e.target.value)} value={locationFilterValue}>
					<option value="">Campus</option>
					<option value="north">North Campus</option>
					<option value="central">Central Campus</option>
					<option value="west">West Campus</option>
				</select>
			</div>
			{" "}that is{" "}
			<div className="select is-medium">
				<select onChange={e => updateStateFilter(e.target.value)} value={stateFilterValue}>
					<option value="">open or closed</option>
					<option value="open">open</option>
					<option value="closed">closed</option>
				</select>
			</div>
			{" "}where I can pay with{" "}
			<div className="select is-medium">
				<select onChange={e => updatePayFilter(e.target.value)} value={payFilterValue}>
					<option value="">a method</option>
					<option value="brb">BRBs</option>
					<option value="swipe">meal swipes</option>
					<option value="cornellCard">Cornell Card</option>
					<option value="creditCard">Credit Card</option>
					<option value="tap">Tap-to-pay</option>
					<option value="cash">Cash</option>
				</select>
			</div>
			.
			List{" "}
			<div className="select is-medium">
				<select onChange={e => updateSort(e.target.value)} value={sort}>
					<option value="openclose">open eateries first</option>
					{"geolocation" in navigator && <option value="closest">closest eateries first</option>}
					<option value="alphebetical">in alphebetical order</option>
				</select>
			</div>.
		</h3>
		{geoErr && <div className="notification is-warning"><FontAwesomeIcon icon={faExclamationTriangle} />{" " + geoErr.message}</div>}
		{sorted.length == 0 && <NoResults />}
		{sorted.map((eatery, i) => <Eatery key={i} eatery={eatery} />)}
	</div>;
};

export default EateriesList;