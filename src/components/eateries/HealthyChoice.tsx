import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAppleAlt } from "@fortawesome/free-solid-svg-icons"
import * as React from "react";

import "./Meal.styl"

const HealthyChoice: React.FC<{}> = () => <span className="has-text-success" data-tooltip="Healthy choice!">
	<FontAwesomeIcon icon={faAppleAlt} />
</span>

export default HealthyChoice;