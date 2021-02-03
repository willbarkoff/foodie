import * as React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "bulma/css/bulma.min.css";

import "./App.styl";
import Navbar from "./ui/Navbar";
import EateriesPage from "./eateries/EateriesPage";
import MapPage from "./map/MapPage";
import AboutPage from "./AboutPage";
import ContactPage from "./ContactPage";
import NotFoundPage from "./NotFoundPage";
import IssuePage from "./issues/IssuePage";

const App: React.FC<{}> = () => <Router>
	<Navbar />
	<Switch>
		<Route exact path="/">
			<EateriesPage />
		</Route>
		<Route path="/map">
			<MapPage />
		</Route>
		<Route path="/about">
			<AboutPage />
		</Route>
		<Route path="/contact">
			<ContactPage />
		</Route>
		<Route path="/issue">
			<IssuePage />
		</Route>
		<Route path="*">
			<NotFoundPage />
		</Route>
	</Switch>
</Router >;

export default App;