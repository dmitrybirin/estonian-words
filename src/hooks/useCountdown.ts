import * as React from 'react';

export function useCountdown(seconds: number) {
	const [intervalId, setIntervalId] = React.useState(Infinity);
	const [countdown, setCountdown] = React.useState(seconds);
	const [active, setActive] = React.useState(false);

	React.useEffect(() => {
		if (countdown <= 0) {
			clearInterval(intervalId);
			setActive(false);
		}
	}, [countdown, intervalId]);

	React.useEffect(() => {
		setActive(true);
		const interval = setInterval(() => setCountdown((countdown) => countdown - 1), 1000);
		setIntervalId(interval);
		return () => {
			clearInterval(interval);
			setActive(false);
		};
	}, []);

	return { countdown, active };
}
