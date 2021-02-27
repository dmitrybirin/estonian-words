import React from 'react';
import styled from 'styled-components';
import { CenteredContainer } from './common-styles';
import { words } from './data/words';
import { Word } from './types';
import { getRandomElement, pseudoShuffle } from './utils';

enum TestResult {
	ONGOING,
	SUCCESS,
	FAILURE
}

const TrainingContainer = styled(CenteredContainer)`
	flex-direction: column;
`;

const Variant = styled.p`
	padding: 10px;
	cursor: pointer;
`;

const Result: React.FC<{ result: TestResult }> = ({ result }) => {
	switch (result) {
		case TestResult.ONGOING:
			return <p>🤔</p>;

		case TestResult.SUCCESS:
			return <p>🎉</p>;

		case TestResult.FAILURE:
			return <p>😭</p>;

		default:
			return null;
	}
};

const getVariants = (answer: Word, words: Word[], numberOfVariants = 3) => {
	const variants = [answer];

	// TODO could use some recursive love
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	for (const _ of Array(numberOfVariants - 1)) {
		const poolOfWords = words.filter((word) => !variants.map((variant) => variant.id).includes(word.id));

		variants.push(getRandomElement<Word>(poolOfWords));
	}

	return pseudoShuffle(variants);
};

const getTestResult = (answer: Word, currentWord: Word) => {
	if (answer.id === currentWord.id) {
		return TestResult.SUCCESS;
	} else {
		return TestResult.FAILURE;
	}
};

export function Training() {
	const [counter, setCounter] = React.useState(0);
	const [result, setResult] = React.useState(TestResult.ONGOING);
	React.useEffect(() => {
		const interval = setInterval(() => setCounter((counter) => counter + 1), 1000);
		return () => clearInterval(interval);
	}, []);
	const [word, setWord] = React.useState(getRandomElement<Word>(words));

	React.useEffect(() => {
		setVariants(getVariants(word, words));
		setResult(TestResult.ONGOING);
	}, [word]);

	const [variants, setVariants] = React.useState(
		pseudoShuffle([word, getRandomElement<Word>(words), getRandomElement<Word>(words)])
	);

	return (
		<TrainingContainer>
			<p>{counter}</p>
			<Result result={result} />
			<p>{word.ruTranslation}</p>
			<p>?</p>

			<CenteredContainer>
				{variants.map((variant) => (
					<Variant key={variant.id} onClick={() => setResult(getTestResult(variant, word))}>
						{variant.forms.first}
					</Variant>
				))}
			</CenteredContainer>

			<button onClick={() => setWord(getRandomElement(words))}>next</button>
		</TrainingContainer>
	);
}
