import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";

interface issueMethodProps {
	title: string
	back(): void
	preferred: React.ReactNode
	alternate?: React.ReactNode
}

const IssueMethod: React.FC<issueMethodProps> = (props) => <div>
	<h1 className="has-text-centered">{props.title}</h1>
	<h3 className="has-text-centered">
		<a onClick={props.back}>
			<FontAwesomeIcon icon={faArrowLeft} fixedWidth />{" "}Go back
		</a>
	</h3>
	<h2>Preferred reporting steps</h2>
	{props.preferred}
	{props.alternate && <>
		<h2>Alternate reporting steps</h2>
		{props.alternate}
	</>
	}
</div>;
export default IssueMethod;