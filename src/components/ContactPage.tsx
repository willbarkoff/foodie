import * as React from "react";
import StaticPage from "./ui/StaticPage";

const ContactPage: React.FC<{}> = () => <StaticPage title="Contact">
	<p>There are a few ways to get in touch with me about Foodie!</p>
	<h2>Via email</h2>
	<p>You can reach out to me at <a href="mailto:wb273+foodie@cornell.edu">wb273+foodie@cornell.edu</a>.</p>
	<h2>Via GitHub</h2>
	<p>You can file a bug report, request a feature, or ask a question on GitHub</p>
	<ul>
		<li><a href="https://github.com/willbarkoff/foodie/issues/new?labels=bug">File a bug report</a></li>
		<li><a href="https://github.com/willbarkoff/foodie/issues/new?labels=enhancement">Request a feature</a></li>
		<li><a href="https://github.com/willbarkoff/foodie/issues/new?labels=question">Ask a question</a></li>
	</ul>
	<p>Or, even better, you can fix the issue yourself and open a Pull Request.</p>
</StaticPage>;

export default ContactPage;