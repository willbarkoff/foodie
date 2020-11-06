import * as React from "react";
import * as Mapbox from "../../apis/mapbox";
import "@creativebulma/bulma-tooltip/dist/bulma-tooltip.min.css";
import { Eatery, getPaymentMethodShort, isOpen } from "../../apis/eateries";
import UpcomingMeals from "./UpcomingMeals";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

interface EateriesListProps {
	eateries: Eatery[];
}

const EateriesList: React.FC<EateriesListProps> = ({ eateries }) => {
	return <div>
		{eateries.map((eatery, i) => <div key={i} className="box">
			<div className="columns">
				<div className="column is-four-fifths">
					<h1 className="title"><FontAwesomeIcon icon={faCircle} className={`${isOpen(eatery) ? "has-text-success" : "has-text-danger"}`} /> {eatery.name}</h1>
					<h1 className="subtitle">{eatery.aboutshort}</h1>
					<h3>{eatery.onlineOrderURL}</h3>
					<div className="tags">
						{eatery.payMethods.map((payMethod, i) => <span
							key={i}
							className={`tag has-tooltip-multiline is-${getPaymentMethodShort(payMethod.descrshort).color}`}
							data-tooltip={payMethod.descr}>
							{getPaymentMethodShort(payMethod.descrshort).name}
						</span>)}
					</div>
					<UpcomingMeals operatingHours={eatery.operatingHours} />
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
		</div>)}
	</div>;
};

export default EateriesList;