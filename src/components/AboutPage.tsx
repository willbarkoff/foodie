import * as React from "react";
import StaticPage from "./ui/StaticPage";

const AboutPage: React.FC<{}> = () => <StaticPage title="About">
	<h1>Foodie helps you find food on campus.</h1>
	<p>Hi there! I'm <a href="https://willbarkoff.dev">Will Barkoff</a>, and I made Foodie. I know about <a href="https://www.cornellappdev.com/">Cornell AppDev</a>'s fantastic Foodie app,
		and I was wondering why a website equivalent didn't exist. <a href="https://now.dining.cornell.edu">Cornell Dining Now</a> works, but doesn't nearly match the feature set of Eatery.
		I'm hoping that Foodie will. be able to fill that gap.</p>
	<p>Right now, I'm working on feature parity with Eatery. You can track the roadmap of the project on <a href="https://github.com/willbarkoff/foodie/issues">GitHub</a>. You can also suggest
		features or improvements there.</p>
	<hr />
	<p>Data is fetched from Cornell Dining Now, and I unfortunately can make no guarantee of its correctness.</p>
	<hr />
	<h2>Acknowledgments</h2>
	<p>Without the following software, Foodie would not be possible.</p>
	<ul>
		<li><a href="https://now.dining.cornell.edu">Cornell Dining Now</a></li>
		<li><a href="https://www.typescriptlang.org/">TypeScript</a></li>
		<li><a href="https://reactjs.org">React</a></li>
		<li><a href="https://styluslang.org">Stylus</a></li>
		<li><a href="https://bulma.io">Bulma</a></li>
		<li><a href="https://eslint.org/">ESLint</a></li>
		<li><a href="https://fontawesome.com">Font Awesome</a></li>
		<li><a href="https://github.com/impallari/Cabin">Cabin</a></li>
		<li><a href="https://developer.apple.com/documentation/mapkitjs">MapKitJS</a></li>
		<li><a href="https://parceljs.org/">Parcel</a></li>
	</ul>
	<h2>About this deployment</h2>
	<p>This is Foodie. {process.env.GIT_COMMIT ? <span>Commit <code>{process.env.GIT_COMMIT}</code></span> : <span>Commit information is not available.</span>}. </p>
</StaticPage>;

export default AboutPage;