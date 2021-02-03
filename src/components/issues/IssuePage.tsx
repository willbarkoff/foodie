import * as React from "react";
import StaticPage from "../ui/StaticPage";
import IssueMethod from "./IssueMethod";

const IssuePage: React.FC<{}> = () => {
	const [issueType, setIssueType] = React.useState("");

	const back = () => setIssueType("");

	const getContents = () => {
		switch (issueType) {
			case "data":
				return <IssueMethod
					title="Incorrect Data"
					back={back}
					preferred={<p>Shoot me an email at <a href="mailto:wb273+foodie@cornell.edu">wb273+foodie@cornell.edu</a>, and I'll do my best to fix it. Make sure to include the specific eatery and meal where the issue lies.</p>}
				/>;
			case "bug":
			case "feature":
				return <IssueMethod
					title={issueType == "bug" ? "Report a bug" : "Request a feature"}
					back={back}
					preferred={<p>Open an issue on GitHub. You can do that by clicking <a href={`https://github.com/willbarkoff/foodie/issues/new?labels=${issueType == "bug" ? "bug" : "enhancement"}`}>here</a>!</p>}
					alternate={<p>Shoot me an email at <a href="mailto:wb273+foodie@cornell.edu">wb273+foodie@cornell.edu</a>, and I'll do my best to get back to you soon!</p>}
				/>;
			case "other":
				return <IssueMethod
					title="Get in touch"
					back={back}
					preferred={<p>Shoot me an email at <a href="mailto:wb273+foodie@cornell.edu">wb273+foodie@cornell.edu</a>, and I'll do my best to get back to you soon!</p>}
					alternate={<>
						<p>Open an issue on GitHub. You can use the appropriate label, as shown below:</p>
						<ul>
							<li><a href="https://github.com/willbarkoff/foodie/issues/new?labels=question"><span className="tag is-primary is-light">question</span> for general questions about Foodie.</a></li>
							<li><a href="https://github.com/willbarkoff/foodie/issues/new?labels=bug"><span className="tag is-danger">bug</span> for issues with the Foodie software.</a></li>
							<li><a href="https://github.com/willbarkoff/foodie/issues/new?labels=enhancement"><span className="tag is-link is-light">enhancement</span> for feature requests.</a></li>
							<li><a href="https://github.com/willbarkoff/foodie/issues/new?labels=invalid"><span className="tag is-warning">invalid</span> if something just isn't right.</a></li>
						</ul>
						<p>Or, even better, contribute to the code and open a Pull Request!</p>
					</>}
				/>;
			default:
				return <>
					<h1 className="has-text-centered">What seems to be the problem?</h1>
					<div className="tile is-ancestor">
						<div className="tile is-parent is-clickable" onClick={() => setIssueType("data")}>
							<article className="tile is-child box">
								<p className="title">Incorrect Data</p>
								<p className="subtitle">The menu or hours are incorrect for an eatery.</p>
								<p className="tag is-success">data</p>
							</article>
						</div>
						<div className="tile is-parent is-clickable" onClick={() => setIssueType("bug")}>
							<article className="tile is-child box">
								<p className="title">Bug</p>
								<p className="subtitle">There is an issue with the website itself.</p>
								<p className="tag is-danger">bug</p>
							</article>
						</div>
						<div className="tile is-parent is-clickable" onClick={() => setIssueType("feature")}>
							<article className="tile is-child box">
								<p className="title">Feature</p>
								<p className="subtitle">Request a feature be added to Foodie.</p>
								<p className="tag is-link is-light">enhancement</p>
							</article>
						</div>
						<div className="tile is-parent is-clickable" onClick={() => setIssueType("other")}>
							<article className="tile is-child box">
								<p className="title">Something else</p>
								<p className="subtitle">Get in touch about something else</p>
								<p className="tag is-primary is-light">question</p>
							</article>
						</div>
					</div>
				</>;
		}
	};

	return <StaticPage title="Did we break an egg?" subtitle="Report an issue here.">
		{getContents()}
		<hr />
		<p><strong>By reporting an issue, you're helping make Foodie better for everyone, so thanks!</strong> You can also submit your favorite food puns to <a href="mailto:wb273+foodie@cornell.edu">wb273+foodie@cornell.edu</a>, and I'll add them to the rotation.</p>
	</StaticPage>;
};

export default IssuePage;