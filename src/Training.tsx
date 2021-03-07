import React from 'react';
import styled from 'styled-components';
import { CenteredContainer } from './common-styles';
import { useDictionary } from './hooks/useDictionary';
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

const EmojiContainer = styled.div`
	font-size: 72px;
`;

const TestWordContainer = styled.div`
	font-size: 42px;
	padding-bottom: 24px;
`;

const Variant = styled(CenteredContainer)`
	height: 240px;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
`;

const VariantWord = styled.p`
	padding: 10px;
	cursor: pointer;
	font-size: 24px;
	padding: 10px;
	border: 1px solid;
`;

const VariantsContainer = styled(CenteredContainer)`
	display: flex;
	justify-content: space-between;
	width: 50vw;
`;

const Result: React.FC<{ result: TestResult }> = ({ result }) => {
	switch (result) {
		case TestResult.ONGOING:
			return <EmojiContainer>🤔</EmojiContainer>;

		case TestResult.SUCCESS:
			return <EmojiContainer>🎉</EmojiContainer>;

		case TestResult.FAILURE:
			return <EmojiContainer>😭</EmojiContainer>;

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
	const { words, loading } = useDictionary('A1');

	const [counter, setCounter] = React.useState(0);
	const [result, setResult] = React.useState(TestResult.ONGOING);
	const [word, setWord] = React.useState<Word>();
	const [translation, setTranslation] = React.useState('');
	const [variants, setVariants] = React.useState<Word[]>([]);

	const [currentVariant, setVariant] = React.useState('');

	React.useEffect(() => {
		const interval = setInterval(() => setCounter((counter) => counter + 1), 1000);
		return () => clearInterval(interval);
	}, []);

	React.useEffect(() => {
		setWord(getRandomElement<Word>(words));
	}, [words.length]);

	React.useEffect(() => {
		if (word) {
			setTranslation(getRandomElement(word.ruTranslations));
			const variants = pseudoShuffle(getVariants(word, words));
			setVariants(variants);
			setVariant(variants[1].esInitial);
			setResult(TestResult.ONGOING);
		}
	}, [word]);

	if (loading || !words.length || !word) {
		return 'Loading...';
	}

	return (
		<TrainingContainer>
			<p>{counter}</p>
			<TestWordContainer>{translation}</TestWordContainer>

			<VariantsContainer>
				{variants.map((variant) => (
					<Variant>
						<VariantWord key={variant.id} onClick={() => setResult(getTestResult(variant, word))}>
							{variant.esInitial}
						</VariantWord>
						<EmojiContainer>{variant.esInitial === currentVariant ? '👆' : ''}</EmojiContainer>
					</Variant>
				))}
			</VariantsContainer>

			<Result result={result} />

			<button onClick={() => setWord(getRandomElement(words))}>next</button>
		</TrainingContainer>
	);
}
