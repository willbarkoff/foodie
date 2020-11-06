import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStoreSlash } from "@fortawesome/free-solid-svg-icons";
import * as React from "react";
import * as Eateries from "../../apis/eateries";
import Meal from "./Meal";

interface DayInfoProps {
	day: Eateries.OperatingHour;
	showNoMenu: boolean;
}

const DayInfo: React.FC<DayInfoProps> = ({ day, showNoMenu }) => {
	if (day.events.length == 0) {
		return <p className="has-text-centered">
			<FontAwesomeIcon icon={faStoreSlash} /> Closed today.
		</p>;
	}

	return <div className="columns">
		{day.events.map((meal, i) => <div className="column" key={i}>
			<Meal showNoMenu={showNoMenu} meal={meal} />
		</div>)}
	</div>;
};

export default DayInfo;