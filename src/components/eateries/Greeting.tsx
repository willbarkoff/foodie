import * as React from 'react';

function getGreeting(): string {
	let time = new Date();
	if (time.getHours() > 12 && time.getHours() < 4) {
		return "Working late?"
	} else if (time.getHours() < 11) {
		return "Good morning!"
	} else if (time.getHours() < 12) {
		return "Hey there!"
	} else if (time.getHours() < 17) {
		return "Good afternoon!"
	} else {
		return "Good evening!"
	}
}

const Greeting: React.FC<{}> = () => <span>
	{getGreeting()}
</span>

export default Greeting;