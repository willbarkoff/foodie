import * as React from "react";
import StaticPage from "./ui/StaticPage";

const NotFoundPage: React.FC<{}> = () => <StaticPage title="Error 404" subtitle="Page not found" style="warning">
	<p>The page you are looking for couldn't be found.</p>
</StaticPage>;

export default NotFoundPage;