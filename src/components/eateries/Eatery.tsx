import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import * as Eateries from "../../apis/eateries";
import * as Mapbox from "../../apis/mapbox";
import HealthyChoice from "./HealthyChoice";
import UpcomingMeals from "./UpcomingMeals";

interface EateryProps {
	eatery: Eateries.Eatery
}

interface DiningItemCategory {
	category: string
	items: Eateries.DiningItem[]
}

const Eatery: React.FC<EateryProps> = ({ eatery }) => {
	const diningItemsCategories: DiningItemCategory[] = [];


	const diningItems: DiningItemCategory[] = [];

	eatery.diningItems.forEach((item) => {
		let categoryItemIndex = diningItems.findIndex((categoryItem) => categoryItem.category == item.category);
		if (categoryItemIndex == -1) {
			categoryItemIndex = diningItems.length;
		}
		const categoryItem: DiningItemCategory = diningItemsCategories[categoryItemIndex] || { category: item.category, items: [] };

		// item.

		categoryItem.items.push(item);
		diningItems[categoryItemIndex] = categoryItem;
	});


	return <div className="box">
		<div className="columns">
			<div className="column is-four-fifths">
				<h1 className="title"><FontAwesomeIcon icon={faCircle} className={`${Eateries.isOpen(eatery) ? "has-text-success" : "has-text-danger"}`} /> {eatery.name}</h1>
				<h1 className="subtitle">{eatery.aboutshort}</h1>
				<h3>{eatery.onlineOrderURL}</h3>
				<div className="tags">
					{eatery.payMethods.map((payMethod, i) => <span
						key={i}
						className={`tag has-tooltip-multiline is-${Eateries.getPaymentMethodShort(payMethod.descrshort).color}`}
						data-tooltip={payMethod.descr}>
						{Eateries.getPaymentMethodShort(payMethod.descrshort).name}
					</span>)}
				</div>
				<UpcomingMeals showNoMenu={diningItems.length == 0} operatingHours={eatery.operatingHours} />
				{diningItems.length != 0 &&
					<div className="columns is-multiline">
						{diningItems.map((diningItem, i) => {
							return <div className="column is-one-third" key={i}>
								<h4 className="heading menu-category-heading">{diningItem.category}</h4>
								<ul>
									{diningItem.items.map((item, i) => {
										return <li key={i}>{item.descr} {item.healthy && <HealthyChoice />}</li>;
									})}
								</ul>
							</div>;
						})}
					</div>
				}
			</div>
			<div className="column is-one-fifth">
				<div>
					<img alt="" src={Mapbox.getStaticImage(eatery.longitude, eatery.latitude, 512, 512)} />
				</div>
				<strong>
					{eatery.location}
				</strong><br />
				<a href={`tel:${eatery.contactPhone}`}>{eatery.contactPhone}</a><br />
				<a href={`mailto:${eatery.contactEmail}`}>{eatery.contactEmail}</a><br />
			</div>
		</div>
	</div>;
};

export default Eatery;