import * as React from "react";
import "@creativebulma/bulma-tooltip/dist/bulma-tooltip.min.css";
import * as Eateries from "../../apis/eateries";
import NoResults from "../ui/NoResults";
import Eatery from "./Eatery";
interface EateriesListProps {
	eateries: Eateries.Eatery[];
}

export function useFilter(): [(e: Eateries.Eatery) => boolean, React.Dispatch<React.SetStateAction<(e: Eateries.Eatery) => boolean>>] {
	// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
	const [currentFilter, setFilter] = React.useState(() => { return (e: Eateries.Eatery) => true; });
	return [currentFilter, setFilter];
}

export function useSort(): [(a: Eateries.Eatery, b: Eateries.Eatery) => number, React.Dispatch<React.SetStateAction<(a: Eateries.Eatery, b: Eateries.Eatery) => 1 | -1 | 0>>] {
	// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
	const [currentSort, setSort] = React.useState(() => {
		return (a: Eateries.Eatery, b: Eateries.Eatery) => (Eateries.isOpen(a) == Eateries.isOpen(b) ? 0 : Eateries.isOpen(a) ? -1 : 1);
	});
	return [currentSort, setSort];
}


const EateriesList: React.FC<EateriesListProps> = ({ eateries }) => {
	const [currentFilter] = useFilter();
	const [currentSort] = useSort();

	const filteredAndSorted = eateries.filter(currentFilter).sort(currentSort);

	return <div>
		{filteredAndSorted.length == 0 && <NoResults />}
		{filteredAndSorted.map((eatery, i) => <Eatery key={i} eatery={eatery} />)}
	</div>;
};

export default EateriesList;