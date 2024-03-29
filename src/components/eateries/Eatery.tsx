import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import * as Eateries from "../../apis/eateries";
import MapKitMap from "../ui/MapKitMap";
import HealthyChoice from "./HealthyChoice";
import UpcomingMeals from "./UpcomingMeals";

import "./Eatery.styl";

interface EateryProps {
	eatery: Eateries.Eatery
}

interface DiningItemCategory {
	category: string
	items: Eateries.DiningItem[]
}

const Eatery: React.FC<EateryProps> = ({ eatery }) => {
	const diningItems: DiningItemCategory[] = [];

	eatery.diningItems.forEach((item) => {
		let categoryItemIndex = diningItems.findIndex((categoryItem) => categoryItem.category == item.category);
		let isNewCategory = false;

		if (categoryItemIndex == -1) {
			categoryItemIndex = diningItems.length;
			isNewCategory = true;
		}

		let categoryItem: DiningItemCategory;

		if (isNewCategory) {
			categoryItem = { category: item.category, items: [] };
		} else {
			categoryItem = diningItems[categoryItemIndex];
		}

		categoryItem.items.push(item);

		diningItems[categoryItemIndex] = categoryItem;
	});

	return <div className="box eatery">
		<div className="columns">
			<div className="column is-four-fifths">
				<h1 className="title"><FontAwesomeIcon icon={faCircle} className={`${Eateries.isOpen(eatery) ? "has-text-success" : "has-text-danger"}`} /> {eatery.name}</h1>
				<h1 className="subtitle">{eatery.aboutshort}</h1>
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
										return <li key={i}>{item.item} {item.healthy && <HealthyChoice />}</li>;
									})}
								</ul>
							</div>;
						})}
					</div>
				}
			</div>
			<div className="column is-one-fifth">
				<MapKitMap lat={eatery.latitude} lon={eatery.longitude} zoomLevel={0.01} annotations={[new mapkit.MarkerAnnotation(
					new mapkit.Coordinate(eatery.latitude, eatery.longitude),
					{ title: eatery.nameshort }
				)]} className="inline-map" />
				<strong>
					{eatery.location}
				</strong><br />
				{eatery.onlineOrdering && eatery.onlineOrderUrl && <a href={eatery.onlineOrderUrl} className="button is-primary is-fullwidth" target="_blank" rel="noopener noreferrer">Order online</a>}
				<a href={`tel:${eatery.contactPhone}`}>{eatery.contactPhone}</a><br />
				<a href={`mailto:${eatery.contactEmail}`}>{eatery.contactEmail}</a><br />
			</div>
		</div>
	</div>;
};

export default Eatery;