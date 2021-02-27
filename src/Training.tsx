import React from 'react';
import styled from 'styled-components';
import { Card } from './Card';
import { CenteredContainer } from './common-styles';
import { words } from './data/words';
import { Verb } from './types';
import { getRandomElement, pseudoShuffle } from './utils';

const TrainingContainer = styled(CenteredContainer)`
	flex-direction: column;
`;

const Variant = styled.p`
	padding: 10px;
`;

const getVariants = (answer: Verb, words: Verb[]) => {
	return pseudoShuffle([answer, getRandomElement<Verb>(words), getRandomElement<Verb>(words)]);
};

export function Training() {
	const [counter, setCounter] = React.useState(0);
	React.useEffect(() => {
		const interval = setInterval(() => setCounter((counter) => counter + 1), 1000);
		return () => clearInterval(interval);
	}, []);
	const [word, setWord] = React.useState(getRandomElement<Verb>(words));

	React.useEffect(() => setVariants(getVariants(word, words)), [word]);

	const [variants, setVariants] = React.useState(
		pseudoShuffle([word, getRandomElement<Verb>(words), getRandomElement<Verb>(words)])
	);

	return (
		<TrainingContainer>
			<p>{counter}</p>
			<p>{word.ruTranslation}</p>
			<p>?</p>

			<CenteredContainer>
				{variants.map((variant) => (
					<Variant>{variant.forms.first}</Variant>
				))}
			</CenteredContainer>

			<button onClick={() => setWord(getRandomElement(words))}>next</button>
		</TrainingContainer>
	);
}
