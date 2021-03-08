import * as React from 'react';

export function useCountdown(seconds: number) {
	const [intervalId, setIntervalId] = React.useState(Infinity);
	const [counter, setCounter] = React.useState(seconds);
	const [active, setActive] = React.useState(false);

	React.useEffect(() => {
		if (counter <= 0) {
			clearInterval(intervalId);
			setActive(false);
		}
	}, [counter]);

	React.useEffect(() => {
		setActive(true);
		setIntervalId(setInterval(() => setCounter((counter) => counter - 1), 1000));
		return () => {
			clearInterval(intervalId);
			setActive(false);
		};
	}, []);

	return { counter, active };
}
