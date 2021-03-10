import * as React from 'react';

export function useCountdown(seconds: number) {
	const [intervalId, setIntervalId] = React.useState(Infinity);
	const [countdown, setCountdown] = React.useState(seconds);
	const [active, setActive] = React.useState(false);

	const start = React.useCallback(() => {
		setActive(true);
		const interval = setInterval(() => setCountdown((countdown) => countdown - 1), 1000);
		setIntervalId(interval);
	}, []);

	const reset = React.useCallback(() => {
		setCountdown(seconds);
		start();
	}, [seconds]);

	const clear = React.useCallback(() => {
		clearInterval(intervalId);
		setActive(false);
	}, [intervalId]);

	React.useEffect(() => {
		if (countdown <= 0) {
			clear();
		}
	}, [countdown]);

	React.useEffect(() => {
		start();
		return clear;
	}, []);

	return {
		countdown,
		active,
		reset
	};
}
