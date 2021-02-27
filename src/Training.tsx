import React from 'react';
import styled from 'styled-components';
import { CenteredContainer } from './common-styles';
import { words } from './data/words';
import { Word } from './types';
import { getRandomElement, pseudoShuffle } from './utils';

const TrainingContainer = styled(CenteredContainer)`
	flex-direction: column;
`;

const Variant = styled.p`
	padding: 10px;
`;

const getVariants = (answer: Word, words: Word[]) => {
	return pseudoShuffle([answer, getRandomElement<Word>(words), getRandomElement<Word>(words)]);
};

export function Training() {
	const [counter, setCounter] = React.useState(0);
	React.useEffect(() => {
		const interval = setInterval(() => setCounter((counter) => counter + 1), 1000);
		return () => clearInterval(interval);
	}, []);
	const [word, setWord] = React.useState(getRandomElement<Word>(words));

	React.useEffect(() => setVariants(getVariants(word, words)), [word]);

	const [variants, setVariants] = React.useState(
		pseudoShuffle([word, getRandomElement<Word>(words), getRandomElement<Word>(words)])
	);

	return (
		<TrainingContainer>
			<p>{counter}</p>
			<p>{word.ruTranslation}</p>
			<p>?</p>

			<CenteredContainer>
				{variants.map((variant) => (
					<Variant key={variant.id}>{variant.forms.first}</Variant>
				))}
			</CenteredContainer>

			<button onClick={() => setWord(getRandomElement(words))}>next</button>
		</TrainingContainer>
	);
}
