import * as React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import "bulma/css/bulma.min.css";

import "./App.styl"
import Navbar from "./ui/Navbar";
import LoadingIndicator from "./ui/LoadingIndicator";
import EateriesPage from "./eateries/EateriesPage";

const App: React.FC<{}> = () => <Router>
	<Navbar />
	<Switch>
		<Route exact path="/">
			<EateriesPage />
		</Route>
		<Route path="*">
			<h1>Not found :(</h1>
		</Route>
	</Switch>
</Router >

export default App;