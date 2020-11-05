import * as React from "react";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./LoadingIndicator.styl";

interface LoadingIndicatorProps {
	minimal?: boolean
	message?: string
}

export const LoadingIndicatorMessages = [
	"Cooking up a storm",
	"Spicing things up",
];

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ minimal, message }: LoadingIndicatorProps) => <div className={`loadingIndicator ${minimal ? "minimal" : ""}`}>
	<div className="loadingIndicatorContent">
		<FontAwesomeIcon icon={faCircleNotch} spin={true} size={minimal ? null : "3x"} />
		{minimal ? " " : <br />}
		<span className={minimal ? "" : "is-size-4"}>{message ? message : LoadingIndicatorMessages[Math.floor(Math.random() * LoadingIndicatorMessages.length)]}</span>
	</div>
</div>;

export default LoadingIndicator;