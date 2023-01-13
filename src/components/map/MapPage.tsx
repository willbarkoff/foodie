import * as React from "react";
import * as Eateries from "../../apis/eateries";
// import MapKitMap from "../ui/MapKitMap";
import LoadingIndicator from "../ui/LoadingIndicator";

import "./MapPage.styl";

const MapPage: React.FC<{}> = () => {
	const [eateriesResponse, setEateriesResponse] = React.useState<Eateries.EateriesResponse | null>(null);
	const [currentFilter, setFilter] = React.useState(() => () => true);

	React.useEffect(() => {
		// unfortunatly, react hooks don't support async/await well, so we need to use promises.
		let mounted = true;
		Eateries.getList().then((eateries) => {
			if (mounted) {
				setEateriesResponse(eateries);
			}
		});
		return () => { mounted = false; };
	}, []);

	return <div>
		<section className="hero is-info is-bold">
			<div className="hero-body">
				<div className="container">
					<h1 className="title">Map</h1>
					<h2 className="subtitle">Find a meal near you</h2>
				</div>
			</div>
		</section>
		<section className="section mapPage">
			{eateriesResponse == null ? <LoadingIndicator /> :
				<div>
					{eateriesResponse.status != "success" ?
						<article className="message is-danger">
							<div className="message-header">
								<p>Uh oh...</p>
							</div>
							<div className="message-body">
								An unexpected error occured while fetching eatery data from Cornell Dining's API. The following was returned from the API:
								<hr />
								<pre>
									<code>
										{JSON.stringify(eateriesResponse, null, "\t")}
									</code>
								</pre>
							</div>
						</article>
						:
						// <MapKitMap lat={42.447222} lon={-76.483056} zoomLevel={0.025} className="map" annotations={
						// 	eateriesResponse.data.eateries.filter(currentFilter).map((eatery) => {
						// 		return new mapkit.MarkerAnnotation(
						// 			new mapkit.Coordinate(eatery.latitude, eatery.longitude),
						// 			{
						// 				title: eatery.nameshort,
						// 				titleVisibility: mapkit.FeatureVisibility.Adaptive,
						// 				color: Eateries.isOpen(eatery) ? "#48c774" : "#ff5b40"
						// 			}
						// 		);
						// 	})
						// } />
						<p>No.</p>
					}
				</div>
			}
		</section>
	</div>;
};

export default MapPage;