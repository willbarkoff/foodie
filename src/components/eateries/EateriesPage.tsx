import * as React from "react";
import * as Eateries from "../../apis/eateries";
import LoadingIndicator from "../ui/LoadingIndicator";
import EateriesList from "./EateriesList";
import Greeting from "./Greeting";

const EateriesPage: React.FC<{}> = () => {
	const [eateriesResponse, setEateriesResponse] = React.useState<Eateries.EateriesResponse | null>(null);

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
					<h1 className="title"><Greeting /></h1>
					<h2 className="subtitle">Let's find you some food.</h2>
				</div>
			</div>
		</section>
		<section className="section">
			<div className="container">
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
							<EateriesList eateries={eateriesResponse.data.eateries} />
						}
					</div>
				}
			</div>
		</section>
	</div>;
};

export default EateriesPage;