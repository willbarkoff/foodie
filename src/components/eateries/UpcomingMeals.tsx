import * as React from "react";
import * as Eateries from "../../apis/eateries";

//TODO: Revaulate polyfill usage at some point
import "intl-relative-time-format";
import DayInfo from "./DayInfo";


interface UpcomingMealsProps {
	operatingHours: Eateries.OperatingHour[];
}

// eslint-disable-next-line
// @ts-ignore because we're _too advanced_ for typescript 
const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

const getRelativeDate = (date: string) => {
	const dateItems = date.split("-").map((n) => parseInt(n));
	// months are zero-indexed in JS dates, but NOTHING ELSE is
	const timeBetween = new Date(dateItems[0], dateItems[1] - 1, dateItems[2]).getTime() - new Date().getTime();
	const days = Math.ceil(timeBetween / (86400000));
	return rtf.format(days, "day");
};

const UpcomingMeals: React.FC<UpcomingMealsProps> = ({ operatingHours }) => {
	const [activeDay, setActiveDay] = React.useState(operatingHours.findIndex((hourinfo) => {
		const dateItems = hourinfo.date.split("-").map((n) => parseInt(n));
		const timeBetween = new Date(dateItems[0], dateItems[1] - 1, dateItems[2]).getTime() - new Date().getTime();
		const days = Math.ceil(timeBetween / (86400000));
		return Math.abs(days) < 1;
	}));

	return <div>
		<div className="tabs">
			<ul>
				{operatingHours.map((hourInfo, i) => {
					return <li key={i} className={`${activeDay == i ? "is-active" : ""}`}>
						<a onClick={() => setActiveDay(i)}>{getRelativeDate(hourInfo.date)}</a>
					</li>;
				})}
			</ul>
		</div>
		<DayInfo day={operatingHours[activeDay]} />
	</div>;
};

export default UpcomingMeals;