import * as React from "react";

interface staticPageProps {
	title?: string
	subtitle?: string
	style?: string
	children: React.ReactNode
}

const StaticPage: React.FC<staticPageProps> = (props) => <div>
	<section className={`hero is-${props.style || "info"} is-bold`}>
		<div className="hero-body">
			<div className="container">
				<h1 className="title">{props.title}</h1>
				<h2 className="subtitle">{props.subtitle}</h2>
			</div>
		</div>
	</section>
	<section className="section">
		<div className="container content">
			{props.children}
		</div>
	</section>
</div>;

export default StaticPage;