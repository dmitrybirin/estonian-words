import * as React from 'react';
import { Key } from 'ts-key-enum';

export function useKeyPress(targetKey: Key | string) {
	const [keyPressed, setKeyPressed] = React.useState(false);

	function downHandler(event: KeyboardEvent) {
		if (event?.key === targetKey) {
			setKeyPressed(true);
		}
	}

	const upHandler = (event: KeyboardEvent) => {
		if (event?.key === targetKey) {
			setKeyPressed(false);
		}
	};

	React.useEffect(() => {
		window.addEventListener('keydown', downHandler);
		window.addEventListener('keyup', upHandler);
		return () => {
			window.removeEventListener('keydown', downHandler);
			window.removeEventListener('keyup', upHandler);
		};
	}, []);

	return keyPressed;
}
