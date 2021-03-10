import * as React from 'react';
import { CenteredContainer } from '../common-styles';

interface GameResultProps {
	points: number;
}

export function GameResult({ points }: GameResultProps) {
	return (
		<CenteredContainer>
			<p>Time's up! Your result is {points < 0 ? 0 : points}!</p>
		</CenteredContainer>
	);
}
