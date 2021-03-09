import * as React from 'react';
import styled from 'styled-components';
import { CenteredContainer } from '../common-styles';
import { useHistory } from 'react-router-dom';

const GameOptions = styled(CenteredContainer)`
	flex-direction: column;
`;

export function Training() {
	const history = useHistory();

	return (
		<CenteredContainer>
			<GameOptions>
				<p>Training with options</p>
				<button onClick={() => history.push('/training/variants/A1')}>Start with A1 dictionary</button>
				<button onClick={() => history.push('/training/variants/B1')}>Start with B1 dictionary</button>
			</GameOptions>
		</CenteredContainer>
	);
}
