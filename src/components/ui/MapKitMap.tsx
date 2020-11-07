import * as React from "react";

const token = process.env.MAPKIT_TOKEN as string;

mapkit.init({
	authorizationCallback: (done) => {
		done(token);
	}
});

interface MapProps {
	lon: number
	lat: number
	className?: string
	annotations?: mapkit.Annotation[];
	zoomLevel: number
}
class MapKitMap extends React.Component<MapProps> {
	private mapRef: React.RefObject<HTMLDivElement>;
	private map?: mapkit.Map;

	constructor(props: MapProps) {
		super(props);
		this.mapRef = React.createRef();
	}

	componentDidMount(): void {
		const map = new mapkit.Map(this.mapRef.current as Element, {
			center: new mapkit.Coordinate(this.props.lat, this.props.lon),
			annotations: this.props.annotations
		});

		map.region = new mapkit.CoordinateRegion(new mapkit.Coordinate(this.props.lat, this.props.lon),
			new mapkit.CoordinateSpan(this.props.zoomLevel, this.props.zoomLevel));

		this.map = map;
	}

	render(): JSX.Element {
		return <div className={this.props.className} ref={this.mapRef}></div>;
	}
}

export default MapKitMap;