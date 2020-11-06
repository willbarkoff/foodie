import * as React from "react";
import { faFrownOpen } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./NoResults.styl";

const NoResults: React.FC<{}> = () => <div className="noResults">
	<div className="noResultsContent">
		<FontAwesomeIcon icon={faFrownOpen} size="3x" />
		<p className="is-size-4">No results found.</p>
	</div>
</div>;

export default NoResults;