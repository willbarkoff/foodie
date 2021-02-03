import * as React from "react";
import "@creativebulma/bulma-tooltip/dist/bulma-tooltip.min.css";
import * as Eateries from "../../apis/eateries";
import NoResults from "../ui/NoResults";
import Eatery from "./Eatery";
interface EateriesListProps {
	eateries: Eateries.Eatery[];
}

const createLocationFilter = (loc: string) => {
	return (e: Eateries.Eatery) => e.campusArea.descrshort == loc;
};

const filters: Record<string, (e: Eateries.Eatery) => boolean> = {
	"north": createLocationFilter("North"),
	"west": createLocationFilter("West"),
	"central": createLocationFilter("Central"),
	"open": e => Eateries.isOpen(e),
	"closed": e => !Eateries.isOpen(e),
};

const locationFilters = ["north", "west", "central"];
const stateFilters = ["open", "closed"];

const EateriesList: React.FC<EateriesListProps> = ({ eateries }) => {
	const [currentFilterChain, setCurrentFilterChain] = React.useState([] as string[]);
	const [locationFilterValue, setLocationFilterValue] = React.useState("");
	const [stateFilterValue, setStateFilterValue] = React.useState("");

	const filtered = eateries.filter(currentFilterChain.map(f => filters[f]).reduce((acc, cv) => {
		return (e: Eateries.Eatery) => {
			if (!acc(e)) {
				return false;
			}
			return cv(e);
		};
	}, () => true));

	const updateLocationFilter = (f?: string) => {
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
		setLocationFilterValue(f || "");
	};

	const updateStateFilter = (f?: string) => {
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
		setStateFilterValue(f || "");
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
			{/* {" "}where I can pay with{" "}
			<div className="select is-medium">
				<select>
					<option value="">a method</option>
					<option value="">BRBs</option>
					<option value="open">meal swipes</option>
					<option value="closed">Cornell Card</option>
					<option value="closed">Credit Card</option>
					<option value="closed">Tap-to-pay</option>
				</select>
			</div> */}
			.
			{/* List{" "}
			<div className="select is-medium">
				<select>
					<option value="openclose">open eateries first</option>
					<option value="alphebetical">in alphebetical order</option>
				</select>
			</div>. */}
		</h3>
		{filtered.length == 0 && <NoResults />}
		{filtered.map((eatery, i) => <Eatery key={i} eatery={eatery} />)}
	</div>;
};

export default EateriesList;