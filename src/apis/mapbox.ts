const accessToken = process.env.MAPBOX_TOKEN;
const style = "nywillb/ckh4brpe40mah19qsx92nmdqw";

export function getStaticImage(lon: number, lat: number, width: number, height: number): string {
	return `https://api.mapbox.com/styles/v1/${style}/static/pin-s+000(${lon},${lat})/${lon},${lat},15,0/${width}x${height}?access_token=${accessToken}`;
}