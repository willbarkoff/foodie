import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFrownOpen } from "@fortawesome/free-regular-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import * as React from "react";
import * as Eateries from "../../apis/eateries";

import "./Meal.styl";
import HealthyChoice from "./HealthyChoice";

interface MealProps {
	meal: Eateries.Event;
	showNoMenu: boolean;
}

const Meal: React.FC<MealProps> = ({ meal, showNoMenu }) => {
	return <>
		<h3 className="title is-6">
			{meal.menu.findIndex((menu) => menu.category.includes("Special Menu Event")) != -1 && <span
				data-tooltip="Special menu event"
			>
				<FontAwesomeIcon icon={faStar} className="has-text-warning" />{" "}
			</span>}
			{meal.calSummary}
			{Eateries.isCurrent(meal) && <span className="has-text-success"> (Now)</span>}
		</h3>
		<h4 className="subtitle is-6">{meal.start} to {meal.end}</h4>
		{meal.menu.length == 0 && showNoMenu && <p><FontAwesomeIcon icon={faFrownOpen} /> No menu available</p>}
		{meal.menu.map((menuCategory, i) => <div key={i}>
			<h4 className="heading menu-category-heading">{menuCategory.category}</h4>
			<ul>
				{menuCategory.items.map((menuItem, i) => {
					return <li key={i}>{menuItem.item} {menuItem.healthy && <HealthyChoice />}</li>;
				})}
			</ul>
		</div>)}
	</>;
};

export default Meal;