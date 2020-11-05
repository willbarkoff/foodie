import * as React from "react";
import { Link } from "react-router-dom";


const Navbar: React.FC<{}> = () => {
	const [isActive, setIsActive] = React.useState(false);

	return <nav className="navbar" role="navigation" aria-label="main navigation">
		<div className="navbar-brand">
			<Link to="/" className="navbar-item">
				<strong>Foodie</strong>
			</Link>

			<a role="button" className={`navbar-burger burger ${isActive ? "is-active" : ""}`} aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" onClick={() => setIsActive(!isActive)}>
				<span aria-hidden="true"></span>
				<span aria-hidden="true"></span>
				<span aria-hidden="true"></span>
			</a>
		</div>

		<div className={`navbar-menu ${isActive ? "is-active" : ""}`}>
			<div className="navbar-start">
				<Link to="/" className="navbar-item">
					Eateries
				</Link>

				<Link to="/menus" className="navbar-item">
					Menus
				</Link>

				<Link to="/map" className="navbar-item">
					Map
				</Link>

				<div className="navbar-item has-dropdown is-hoverable">
					<a className="navbar-link">
						More
					</a>

					<div className="navbar-dropdown">
						<Link to="/about" className="navbar-item">
							About
						</Link>
						<Link to="/contact" className="navbar-item">
							Contact
						</Link>
						<hr className="navbar-divider" />
						<Link to="/report" className="navbar-item">
							Report an Issue
						</Link>
					</div>
				</div>
			</div>
		</div>
	</nav>;
};

export default Navbar;